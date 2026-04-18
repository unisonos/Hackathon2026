import '../styles/ProductCard.css'

function ProductCard({handleSelectedProduct, handleShowPurchasePanel, productInfo}) {

  return (
    <>
      <article className='product-card'>

        <img className='card-image' src={productInfo.image_URL}/>
        <h3>{productInfo.box_name} </h3> 
        <p className='price'>${productInfo.price} </p>

        <button onClick={() => {handleSelectedProduct(productInfo); handleShowPurchasePanel()} } className='btn-purchase'>{productInfo.personalizable? 'Personalizar' : 'Comprar'}</button>

      </article>
    </>
  )
}

export default ProductCard
