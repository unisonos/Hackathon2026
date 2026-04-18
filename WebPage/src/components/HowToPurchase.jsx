import '../styles/HowToPurchase.css';

function HowToPurchase() {
    return (
        <>
        <div className='purchase-guide-wrapper'>
            <h1 className='purchase-guide-heading'>Cómo comprar</h1>

            <div className='instructions-wrapper'>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>1. <span>Selecciona tu caja de música</span></h2>
                    <p className='instruction-text'>
                        Navega tranquilamente por nuestra tienda en línea y explora la gran variedad de 
                        diseños, estilos y materiales disponibles. Podrás encontrar cajas de música con 
                        temáticas clásicas, modernas, minimalistas o románticas, lo que te permitirá elegir 
                        la que mejor se adapte a tu personalidad, a la ocasión especial o a la persona a 
                        la que deseas sorprender con este regalo tan único.
                    </p>
                </div>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>2. <span>Personaliza tu melodía</span></h2>
                    <p className='instruction-text'>
                        Una vez que hayas elegido tu caja, selecciona la melodía que prefieras de nuestra 
                        lista de canciones cuidadosamente seleccionadas. Si ninguna coincide con lo que 
                        tienes en mente, también puedes enviarnos un correo con la melodía personalizada 
                        que desees. Así tendrás la oportunidad de crear un regalo completamente único y 
                        cargado de significado, hecho a tu medida.
                    </p>
                </div>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>3. <span>Añade una dedicatoria</span></h2>
                    <p className='instruction-text'>
                        Haz tu caja de música aún más especial agregando una dedicatoria personalizada. 
                        Puedes escribir un mensaje emotivo, una frase significativa o incluso unas pocas 
                        palabras que reflejen tus sentimientos. Además, tienes la opción de incluir una 
                        imagen de tu preferencia, lo que convertirá el regalo en un detalle mucho más 
                        íntimo y memorable para la persona que lo reciba.
                    </p>
                </div>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>4. <span>Revisa tu pedido</span></h2>
                    <p className='instruction-text'>
                        Antes de proceder con el pago, dedica un momento a revisar minuciosamente tu pedido. 
                        Comprueba que seleccionaste correctamente el modelo de la caja, la melodía elegida, 
                        la dedicatoria y la imagen añadida. Este paso es fundamental para garantizar que 
                        el resultado final coincida exactamente con tus expectativas y evitar cualquier 
                        contratiempo en el proceso de producción y envío.
                    </p>
                </div>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>5. <span>Realiza el pago</span></h2>
                    <p className='instruction-text'>
                        Completa tu compra utilizando nuestro sistema de pago seguro y confiable. 
                        Ofrecemos diferentes métodos de pago para tu comodidad, como tarjeta de crédito, 
                        débito o transferencias. Una vez finalizada la transacción, recibirás un correo 
                        electrónico de confirmación con todos los detalles de tu pedido, brindándote 
                        tranquilidad y respaldo en cada paso del proceso.
                    </p>
                </div>

                <div className='instruction-block'>
                    <h2 className='instruction-heading'>6. <span>Recibe tu caja de música</span></h2>
                    <p className='instruction-text'>
                        Tras confirmar tu compra, nuestro equipo comenzará a preparar tu caja de música 
                        con sumo cuidado y dedicación. Posteriormente, será enviada a la dirección que 
                        indicaste, embalada de forma segura para garantizar su protección durante el 
                        transporte. En pocos días la tendrás contigo, lista para disfrutar o para ser 
                        entregada como un regalo cargado de emoción y significado.
                    </p>
                </div>

            </div>
        </div>
        </>
    );
}

export default HowToPurchase;
