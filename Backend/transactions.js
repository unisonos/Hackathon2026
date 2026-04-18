import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { getProduct, addPurchaseDetails } from './firebase.js';
import xss from 'xss';


const port = process.env.PAYPAL_API_PORT || 3001;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = 'AQx2RH4EbeWRrihHDcS7xDT5SuvW82-n9b0W3xeXBwc8tPdOBmfys2AfT4-5keDkq_eNvrdaMDcgwd58';
const client_secret = 'EK29g10OqGawuubChDEVMEeSv9-4fcG-tMldh8rB1M1r0btPGyJP4ZT8rg0uMqvkUK6fWjG9bSGcrMap';
const currency_code = process.env.CURRENCY_CODE || 'USD'; //Parece ser que sandbox no soporta CRC 
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
// const paypal_intent = process.env.PAYPAL_INTENT || 'CAPTURE';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function get_access_token() {
    try {
        const auth = `${client_id}:${client_secret}`;
        const data = 'grant_type=client_credentials';
        
        const response = await fetch(endpoint_url + '/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json.access_token;

    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}


app.post('/paypal/create_order', async (req, res) => {
    try {

        const access_token = await get_access_token();
        const { item } = req.body;
        const product = await getProduct(item.id);
        
        let order_data_json = {
            intent: "AUTHORIZE",
            purchase_units: [{
                amount: {
                    currency_code: currency_code,
                    value: product.data().price
                }/*,
                shipping: {
                    address: {
                        country_code: 'CR'
                    }
                } */
            }]
        };

        const paypalResponse = await fetch(endpoint_url + '/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'PayPal-Request-Id': uuidv4() 
            },
            body: JSON.stringify(order_data_json)
        });

        if (!paypalResponse.ok) {
            throw new Error(`PayPal API error: ${paypalResponse.status}`);
        }

        const orderData = await paypalResponse.json();
        res.json({ id: orderData.id }); 

    } catch (error) {
        console.error('Error in /create_order:', error);
        res.status(500).json({ error: error.message });
    }
});


app.post('/paypal/complete_order', async (req, res) => {
    try {

        if (!req.body.order_id) {
            return res.status(400).json({ error: 'order_id is required' });
        }

        const access_token = await get_access_token();
        
        const authorizeResponse = await fetch(
            `${endpoint_url}/v2/checkout/orders/${req.body.order_id}/authorize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!authorizeResponse.ok) {
            throw new Error(`PayPal API error: ${authorizeResponse.status}`);
        }

        const authorizeResult = await authorizeResponse.json();
        const country = authorizeResult?.payer?.address.country_code || 'N/A';

         if (country !== 'CR') {
            console.log('Payment rejected: Country not allowed -', country);
            return res.status(400).json({ error: 'Payment rejected: Country not allowed' });
        }

        const authorizationId = authorizeResult?.purchase_units[0]?.payments?.authorizations[0]?.id;
        const authorizationStatus = authorizeResult?.purchase_units[0]?.payments?.authorizations[0]?.status;
        
        if(!authorizationId || authorizationStatus !== 'CREATED') {
            throw new Error('Authorization ID not found in PayPal response');
        }

        const captureResponse = await fetch(
            `${endpoint_url}/v2/payments/authorizations/${authorizationId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!captureResponse.ok) {
            throw new Error(`PayPal API error: ${captureResponse.status}`);
        }

        const captureResult = await captureResponse.json();
        if (captureResult.status !== 'COMPLETED') {
            throw new Error('Capture not completed');
        }

        const { purchase_details } = req.body;
        req.body.purchase_details = {...purchase_details, insideText: xss(purchase_details.insideText), outsideText: xss(purchase_details.outsideText)};
        const payerEmail = authorizeResult?.payer?.email_address || 'N/A';
        const payerName = `${authorizeResult?.payer?.name?.given_name || ''} ${authorizeResult?.payer?.name?.surname || ''}`.trim();
        const parsed_purchase_details = {...req.body.purchase_details, payer_email: payerEmail, payer_name: payerName};

        await addPurchaseDetails(parsed_purchase_details);
        res.json({ status: 'success', id: captureResult.id }); 

    } catch (error) {
        console.error('Error in /complete_order:', error);
        res.status(500).json({ error: error.message });
    }
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Paypal server running on port: ${port}.`);
  });
}

export default app;
export { get_access_token };


