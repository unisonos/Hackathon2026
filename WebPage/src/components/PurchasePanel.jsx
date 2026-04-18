import { useState, useEffect, useRef } from 'react';
import '../styles/PurchasePanel.css'
import DOMPurify from "dompurify";

function PurchasePanel({ handleShowPurchaseErrorMessage, handleShowPurchaseSuccess, handleShowPurchasePanel, product }) {

  const paypalButtonRef = useRef();
  const [songs, setSongs] = useState([]);
  const defaultFormData = {
    selectedSong: '',
    outsideText: '',
    insideText: '',
    image: null
  }
  const defaultIsComponentVisible = {
    songsDropdown: false,
    boxOutsideTextDropdown: false,
    boxInsideTextDropdown: false,
    imageDropdown: false
  }
  const [formData, setFormData] = useState(defaultFormData);
  const formDataRef = useRef(formData);

  const [isComponentVisible, setIsComponentVisible] = useState(defaultIsComponentVisible);
  const [imageKey, setImageKey] = useState(0);
  
  // const API_DB_URL = import.meta.env.VITE_DB_API_URL;
  // const API_TRANSACTIONS_URL = import.meta.env.VITE_TRANSACTIONS_API_URL;


  useEffect(() => {
    fetch(`db/get/songs`) // had API_DB_URL Before
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(err => {console.log(err)});
  }, []);


  useEffect(() => {
    if(product === null) {
      setFormData(defaultFormData);
      setIsComponentVisible(defaultIsComponentVisible);
      setImageKey(prev => prev + 1);
    }
  }, [product]);


  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);


  useEffect(() => {
    if (!product || !window.paypal) return;

    paypalButtonRef.current.innerHTML = '';

    window.paypal.Buttons({

      createOrder: (data, actions) => {
        return fetch(`paypal/create_order`, { // had ${API_TRANSACTIONS_URL} before
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item: { id: product.id } })
        })
        .then(res => res.json())
        .then(order => {
          if (!order.id) throw new Error('No order ID returned');
          return order.id;
        })
        .catch((error) => {
          console.error('Error creating order:', error);
          handleShowPurchaseErrorMessage();
        });
      },

      onApprove: (data, actions) => {

        const latestFormData = formDataRef.current;

        return fetch(`paypal/complete_order`, { // had ${API_TRANSACTIONS_URL} before
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: data.orderID, purchase_details: latestFormData })
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(() => {
          handleShowPurchasePanel();
          handleShowPurchaseSuccess();
        })
        .catch((error) => {
          console.error('Error completing order:', error);
          handleShowPurchaseErrorMessage();
        });
      }

    }).render(paypalButtonRef.current);

  }, [product]);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }


  const handleComponentVisibility = (field) => {
  
    setIsComponentVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }

  return (
    <>
      <article className='purchase-card'>

        <section>
          <img className='product-image' src={product? product.image_URL : null}/>
          <p>{product? product.description : ''}</p>
        </section>
          
        <form className='purchase-form'>
          <h3 className='detail-section'>1. Melodía</h3>

          <div className='dropdown-section' onClick={() => { handleComponentVisibility('songsDropdown'); }}>
            <p>{formData.selectedSong === ''? 'Ver nuestra selección de canciones' : formData.selectedSong}</p>

            <ul className={`form-dropdown ${isComponentVisible.songsDropdown? "open" : ""}`}>
              {songs.map((song, index) => (
                  <li className='available-song' key={index} onClick={() => { handleInputChange('selectedSong', song.song_name); }}>
                    <span>{song.song_name} </span> 
                  </li>
                ))}
            </ul>
          </div>

          <h3 className='detail-section'>2. Personalizar diseño</h3>
          
          <div className='dropdown-section'>
            <p onClick={() => handleComponentVisibility('boxOutsideTextDropdown')}>Personalizar texto exterior de la caja</p>

            <div className={`form-dropdown ${isComponentVisible.boxOutsideTextDropdown? "open" : ""}`}>
              <input onChange={(e) => handleInputChange('outsideText', DOMPurify.sanitize(e.target.value))} value={formData['outsideText']} className='form-text-input' placeholder='Escribe aquí el texto que desees' type='text' maxLength="50"/>
            </div>
          </div>

          <div className='dropdown-section'>
            <p onClick={() => handleComponentVisibility('boxInsideTextDropdown')}>Personalizar texto interior de la caja</p>

            <div className={`form-dropdown ${isComponentVisible.boxInsideTextDropdown? "open" : ""}`}>
              <input onChange={(e) => handleInputChange('insideText', DOMPurify.sanitize(e.target.value))} value={formData['insideText']} className='form-text-input' placeholder='Escribe aquí el texto que desees' type='text' maxLength="50"/>
            </div>
          </div>

          <div className='dropdown-section'>
            <p onClick={() => handleComponentVisibility('imageDropdown')}>Colocar imagen dentro de la caja</p>

            <div className={`form-dropdown ${isComponentVisible.imageDropdown? "open" : ""}`}>
              <input key={imageKey} onChange={(e) => handleInputChange('image', e.target.files[0])} className='form-image-input' type='file' accept="image/*"/>
            </div>
          </div>

          <div ref={paypalButtonRef}/> 
          
        </form>

        <button onClick={() => handleShowPurchasePanel()} className='exit-button'>Salir</button>

      </article>
    </>
  )
}

export default PurchasePanel;
