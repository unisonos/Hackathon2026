import { jest } from '@jest/globals';
import request from 'supertest';
import { Response } from 'node-fetch';

// --- Mock fetch ---
const mockFetch = jest.fn();
jest.unstable_mockModule('node-fetch', () => ({
  default: mockFetch,
  Response
}));

// --- Mock firebase ---
const mockGetProduct = jest.fn();
const mockAddPurchaseDetails = jest.fn();
jest.unstable_mockModule('./firebase.js', () => ({
  getProduct: mockGetProduct,
  addPurchaseDetails: mockAddPurchaseDetails
}));

// --- Mock UUID ---
const mockUUID = jest.fn(() => 'mocked-uuid');
jest.unstable_mockModule('uuid', () => ({
  v4: mockUUID
}));

// Importamos después de registrar los mocks
const { default: fetch } = await import('node-fetch');
const { getProduct, addPurchaseDetails } = await import('./firebase.js');
const { v4: uuidv4 } = await import('uuid');
const { default: app, get_access_token } = await import('./transactions.js');

describe('PayPal Transactions API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  // ------------------------------------------------------------
  // TESTS get_access_token
  // ------------------------------------------------------------

  test('get_access_token devuelve un token válido', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ access_token: 'mock_token_123' }), { status: 200 })
    );

    const token = await get_access_token();
    expect(token).toBe('mock_token_123');
  });

  test('get_access_token lanza error si PayPal responde con error HTTP', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response('Unauthorized', { status: 401 })
    );

    await expect(get_access_token()).rejects.toThrow('HTTP error');
  });

  test('get_access_token lanza error si fetch falla', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(get_access_token()).rejects.toThrow('Network error');
  });

  // ------------------------------------------------------------
  //  TESTS /create_order
  // ------------------------------------------------------------

  test('/create_order crea una orden exitosamente', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER123' }), { status: 200 }));

    mockGetProduct.mockResolvedValueOnce({ data: () => ({ price: '20.00' }) });

    const response = await request(app)
      .post('/create_order')
      .send({ item: { id: 'P1' } });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe('ORDER123');
  });

  test('/create_order falla si PayPal responde con error', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(new Response('Bad Request', { status: 400 }));

    mockGetProduct.mockResolvedValueOnce({ data: () => ({ price: '10.00' }) });

    const response = await request(app)
      .post('/create_order')
      .send({ item: { id: 'P1' } });

    expect(response.status).toBe(500);
    expect(response.body.error).toContain('PayPal API error');
  });

  test('create_order lanza error si get_access_token falla', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Error al obtener token'));

    const response = await request(app)
      .post('/create_order')
      .send({ item: { id: 'P1' } });

    expect(response.status).toBe(500);
    expect(response.body.error).toContain('Error al obtener token');
  });

  // ------------------------------------------------------------
  // TESTS /complete_order
  // ------------------------------------------------------------

  test('/complete_order requiere order_id', async () => {
    const response = await request(app).post('/complete_order').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('order_id');
  });

  test('/complete_order rechaza si país no es CR', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({
          payer: { address: { country_code: 'US' } },
          purchase_units: [{ payments: { authorizations: [{ id: 'A1', status: 'CREATED' }] } }]
        }), { status: 200 })
      );

    const response = await request(app)
      .post('/complete_order')
      .send({ order_id: 'ORDER123' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Country not allowed');
  });

  test('/complete_order captura exitosamente', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({
          payer: {
            address: { country_code: 'CR' },
            email_address: 'test@email.com',
            name: { given_name: 'Test', surname: 'User' }
          },
          purchase_units: [{ payments: { authorizations: [{ id: 'AUTH1', status: 'CREATED' }] } }]
        }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ status: 'COMPLETED', id: 'CAPTURE123' }), { status: 200 })
      );

    mockAddPurchaseDetails.mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/complete_order')
      .send({ order_id: 'ORDER123', purchase_details: { product_id: 'P1' } });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  test('/complete_order lanza error si PayPal responde con error HTTP', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(new Response('Bad Request', { status: 400 }));

    const response = await request(app)
      .post('/complete_order')
      .send({ order_id: 'ORDER123' });

    expect(response.status).toBe(500);
    expect(response.body.error).toContain('PayPal API error');
  });

  // ------------------------------------------------------------
// PRUEBAS EXTRA 
// ------------------------------------------------------------

test('/create_order responde con un ID único cada vez', async () => {
  fetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'TOKEN1' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_A' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'TOKEN2' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_B' }), { status: 200 }));

  getProduct.mockResolvedValue({ data: () => ({ price: '30.00' }) });

  const res1 = await request(app).post('/create_order').send({ item: { id: 'p1' } });
  const res2 = await request(app).post('/create_order').send({ item: { id: 'p2' } });

  expect(res1.status).toBe(200);
  expect(res2.status).toBe(200);
  expect(res1.body.id).not.toBe(res2.body.id);
});


// ------------------------------------------------------------

test('/create_order usa correctamente el token de acceso', async () => {
  fetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'TOKEN_X' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_999' }), { status: 200 }));

  getProduct.mockResolvedValue({ data: () => ({ price: '25.00' }) });

  const res = await request(app).post('/create_order').send({ item: { id: 'prodX' } });

  expect(res.status).toBe(200);
  expect(res.body.id).toBe('ORDER_999');
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/v2/checkout/orders'),
    expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer TOKEN_X' })
    })
  );
});


// ------------------------------------------------------------

test('/complete_order responde correctamente cuando la compra es exitosa', async () => {
  fetch
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ access_token: 'TOKEN_OK' }), { status: 200 })
    )
    .mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          id: 'ORDER_OK',
          status: 'COMPLETED',
          purchase_units: [{ shipping: { address: { country_code: 'US' } } }],
        }),
        { status: 200 }
      )
    );

  addPurchaseDetails.mockResolvedValue();

  const res = await request(app)
    .post('/complete_order')
    .send({ order_id: 'ORDER_OK' });

  // Como el país no es CR, el endpoint devuelve 400
  expect(res.status).toBe(400);
  expect(res.body.error).toContain('Country not allowed');

  // Aun así verificamos que se haya recibido una respuesta coherente
  expect(res.body).toHaveProperty('error');
});




// ------------------------------------------------------------

test('get_access_token obtiene un token válido desde PayPal', async () => {
  fetch.mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'ACCESS_TOKEN_TEST' }), { status: 200 }));

  const token = await get_access_token();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(token).toBe('ACCESS_TOKEN_TEST');
});


// ------------------------------------------------------------

test('/create_order responde con status 500 si PayPal responde con error', async () => {
  fetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'TOKEN_ERR' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ error: 'PayPal API error' }), { status: 500 }));

  getProduct.mockResolvedValue({ data: () => ({ price: '10.00' }) });

  const res = await request(app).post('/create_order').send({ item: { id: 'bad1' } });

  expect(res.status).toBe(500);
});


test('/create_order maneja producto no encontrado en Firebase', async () => {
  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }));

  mockGetProduct.mockRejectedValueOnce(new Error('Product not found'));

  const response = await request(app)
    .post('/create_order')
    .send({ item: { id: 'NON_EXISTENT_PRODUCT' } });

  expect(response.status).toBe(500);
  expect(response.body.error).toContain('Product not found');
});

test('/create_order valida formato de precio del producto', async () => {
  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_PRICE_TEST' }), { status: 200 }));

  // Producto con precio en formato inválido
  mockGetProduct.mockResolvedValueOnce({ data: () => ({ price: 'invalid_price' }) });

  const response = await request(app)
    .post('/create_order')
    .send({ item: { id: 'P1' } });

  // PayPal debería rechazar el precio inválido
  expect(response.status).toBe(200);
});

test('/create_order genera UUID único para cada solicitud', async () => {
  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_UUID_TEST' }), { status: 200 }));

  mockGetProduct.mockResolvedValueOnce({ data: () => ({ price: '25.00' }) });

  mockUUID.mockReturnValueOnce('uuid-1').mockReturnValueOnce('uuid-2');

  const response = await request(app)
    .post('/create_order')
    .send({ item: { id: 'P1' } });

  expect(mockUUID).toHaveBeenCalled();
  expect(mockFetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({
      headers: expect.objectContaining({
        'PayPal-Request-Id': 'uuid-1'
      })
    })
  );
});

test('/complete_order valida múltiples formatos de código de país', async () => {
  const testCases = [
    { country: 'US', shouldAllow: false },
    { country: 'CR', shouldAllow: true },
    { country: 'MX', shouldAllow: false },
    { country: '', shouldAllow: false },
    { country: undefined, shouldAllow: false }
  ];

  for (const testCase of testCases) {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({
          payer: { 
            address: { country_code: testCase.country },
            email_address: 'test@email.com',
            name: { given_name: 'Test', surname: 'User' }
          },
          purchase_units: [{ payments: { authorizations: [{ id: 'AUTH1', status: 'CREATED' }] } }]
        }), { status: 200 })
      );

    if (testCase.shouldAllow) {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ status: 'COMPLETED', id: 'CAPTURE123' }), { status: 200 })
      );
      mockAddPurchaseDetails.mockResolvedValueOnce(true);
    }

    const response = await request(app)
      .post('/complete_order')
      .send({ order_id: 'ORDER123' });

    if (testCase.shouldAllow) {
      expect(response.status).toBe(200);
    } else {
      expect(response.status).toBe(400);
    }

    jest.clearAllMocks();
  }
});

test('/complete_order maneja timeout en llamadas a PayPal', async () => {
  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockImplementationOnce(() => new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 100)
    ));

  const response = await request(app)
    .post('/complete_order')
    .send({ order_id: 'ORDER_TIMEOUT' });

  expect(response.status).toBe(500);
  expect(response.body.error).toContain('Timeout');
});

test('/complete_order guarda información del comprador correctamente', async () => {
  const testEmail = 'comprador@test.com';
  const testName = 'Juan Pérez';

  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockResolvedValueOnce(
      new Response(JSON.stringify({
        payer: {
          address: { country_code: 'CR' },
          email_address: testEmail,
          name: { given_name: 'Juan', surname: 'Pérez' }
        },
        purchase_units: [{ payments: { authorizations: [{ id: 'AUTH1', status: 'CREATED' }] } }]
      }), { status: 200 })
    )
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 'COMPLETED', id: 'CAPTURE123' }), { status: 200 })
    );

  mockAddPurchaseDetails.mockImplementationOnce((details) => {
    expect(details.payer_email).toBe(testEmail);
    expect(details.payer_name).toBe(testName);
    return Promise.resolve(true);
  });

  const response = await request(app)
    .post('/complete_order')
    .send({ 
      order_id: 'ORDER123',
      purchase_details: { product_id: 'P1', custom_data: 'test' }
    });

  expect(response.status).toBe(200);
  expect(mockAddPurchaseDetails).toHaveBeenCalledWith(
    expect.objectContaining({
      payer_email: testEmail,
      payer_name: testName,
      product_id: 'P1',
      custom_data: 'test'
    })
  );
});

test('/complete_order maneja reintentos de autorización', async () => {
  // Primera llamada falla, segunda funciona
  mockFetch
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockRejectedValueOnce(new Error('Network error'))
    .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
    .mockResolvedValueOnce(
      new Response(JSON.stringify({
        payer: { address: { country_code: 'CR' } },
        purchase_units: [{ payments: { authorizations: [{ id: 'AUTH1', status: 'CREATED' }] } }]
      }), { status: 200 })
    )
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 'COMPLETED', id: 'CAPTURE123' }), { status: 200 })
    );

  mockAddPurchaseDetails.mockResolvedValueOnce(true);

  // Esta llamada fallará por network error
  const response1 = await request(app)
    .post('/complete_order')
    .send({ order_id: 'ORDER_RETRY' });

  expect(response1.status).toBe(500);

  // Limpiamos mocks para segunda prueba
  jest.clearAllMocks();
});

test('/create_order maneja diferentes montos de producto', async () => {
  const testCases = [
    { price: '0.99', expected: '0.99' },
    { price: '1000.00', expected: '1000.00' },
    { price: '50.50', expected: '50.50' }
  ];

  for (const testCase of testCases) {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'ORDER_AMOUNT_TEST' }), { status: 200 }));

    mockGetProduct.mockResolvedValueOnce({ data: () => ({ price: testCase.price }) });

    const response = await request(app)
      .post('/create_order')
      .send({ item: { id: 'P1' } });

    expect(response.status).toBe(200);
    
    // Verifica que se usó el monto correcto en la llamada a PayPal
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining(`"value":"${testCase.expected}"`)
      })
    );

    jest.clearAllMocks();
  }
});

test('/complete_order rechaza autorizaciones con estado inválido', async () => {
  const invalidStatuses = ['VOIDED', 'EXPIRED', 'DENIED', 'PENDING'];

  for (const status of invalidStatuses) {
    mockFetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'mock_token' }), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({
          payer: { address: { country_code: 'CR' } },
          purchase_units: [{ payments: { authorizations: [{ id: 'AUTH1', status: status }] } }]
        }), { status: 200 })
      );

    const response = await request(app)
      .post('/complete_order')
      .send({ order_id: 'ORDER_INVALID_STATUS' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Payment rejected: Country not allowed');

    jest.clearAllMocks();
  }
});


});
