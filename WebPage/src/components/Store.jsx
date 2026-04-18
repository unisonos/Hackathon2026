import { useEffect, useState, useRef } from 'react'
import '../styles/Store.css'
import ProductCard from './ProductCard'
import PurchasePanel from './PurchasePanel';
import Loader from './Loader';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';


function Store () {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPurchasePanel, setShowPurchasePanel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
    const [showPurchaseErrorMessage, setShowPurchaseErrorMessage] = useState(false); 
    const componentRef = useRef(null);
    const API_DB_URL = import.meta.env.VITE_DB_API_URL;

    const handleSelectedProduct = (data) => {
        setSelectedProduct(data);
    }

    const handleShowPurchasePanel = () => {
        setShowPurchasePanel(prev => !prev);
    }

    const handleShowPurchaseSuccess = () => {
        setShowPurchaseSuccess(true);
        setTimeout(() => {
            setShowPurchaseSuccess(false);
        }, 3000);
    }

    const handleShowPurchaseErrorMessage = () => {
        setShowPurchaseErrorMessage(true);
        setTimeout(() => {
            setShowPurchaseErrorMessage(false);
        }, 3000);
    }

    useEffect(() => {
        setLoading(true);
        fetch(`db/get/boxes`) // had ${API_DB_URL} before
            .then(response => response.json())
            .then(data => {setLoading(false); setProducts(data)})
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(componentRef.current && !componentRef.current.contains(event.target)) {
                setShowPurchasePanel(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside, true);
        }

    }, []);

    return (   
        <div>

            <div className={`purchase-completed-message ${showPurchaseSuccess? 'show' : ''}`}>
                <FaCheckCircle size={30} color="green" />
                <p>Compra Realizada</p>
            </div>

            <div className={`purchase-completed-message ${showPurchaseErrorMessage? 'show' : ''}`}>
                <FaTimesCircle size={30} color="red" />
                <p>Error al realizar pago</p>
            </div>

            <div className={`loader-wrapper ${loading? 'show' : ''}`}>
                <Loader />
            </div>

            <div ref={componentRef} className={`purchase-panel ${showPurchasePanel? 'open' : ''}`}>
                <PurchasePanel handleShowPurchaseErrorMessage={handleShowPurchaseErrorMessage} handleShowPurchaseSuccess={handleShowPurchaseSuccess} handleShowPurchasePanel={handleShowPurchasePanel} product={showPurchasePanel? selectedProduct : null}/>
            </div>

            <div className='content-wrapper'>
                <section className='product-list'>

                    {!loading && products.map(product => (
                        <ProductCard 
                            key={product.id}
                            handleSelectedProduct={handleSelectedProduct}
                            handleShowPurchasePanel={handleShowPurchasePanel}
                            productInfo={product}
                        />
                    ))}

                </section>
            </div>

        </div>            
    )
}

export default Store
