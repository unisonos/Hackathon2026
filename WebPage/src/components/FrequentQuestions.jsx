import '../styles/FrequentQuestions.css'

function FrequentQuestions () {
    return (
        <section className="frequent-questions">
            <h2 className="questions-section-title">Preguntas Frecuentes</h2>

            <div className='questions-container'>
                <article className="question-block">
                    <h3 className="question-subtitle">¿Cómo solicitar una melodía personalizada?</h3>
                    <p>
                    Para solicitar una caja musical con una melodía personalizada, puede contactarnos directamente enviándonos un mensaje por WhatsApp, correo electrónico o Instagram. Indíquenos el título de la canción que desea y cualquier detalle adicional que considere importante. 
                    <br/>
                    Una vez recibido su mensaje, revisaremos la solicitud y le confirmaremos si podemos crear la melodía tal como la pidió. Si la solicitud es aprobada, le explicaremos paso a paso cómo realizar el pago y asegurar su pedido. 
                    <br/>
                    Este proceso nos permite garantizar que cada caja personalizada sea posible, cuidando la calidad y fidelidad del mecanismo de papel.
                    </p>
                </article>

                <article className="question-block">
                    <h3 className="question-subtitle">¿Qué tan resistente es el papel de este mecanismo?</h3>
                    <p>
                    El papel que utilizamos está cuidadosamente seleccionado para resistir el movimiento constante del mecanismo musical y ofrecer una larga duración. Está diseñado para no deformarse ni romperse con el uso normal, incluso después de varias reproducciones.
                    <br/>
                    Recomendamos manipular la caja con cuidado, evitando la exposición a humedad, calor extremo o fuerza excesiva sobre el mecanismo. Con estos cuidados simples, su caja musical puede durar muchos años y seguir funcionando perfectamente.
                    </p>
                </article>

                <article className="question-block">
                    <h3 className="question-subtitle">¿Cómo rastrear el pedido?</h3>
                    <p>
                    Cada pedido enviado incluye un número de seguimiento único que le permitirá conocer el estado de su paquete en tiempo real. Una vez que el pedido haya sido despachado, recibirá un correo electrónico con el número de seguimiento y un enlace para consultar la ubicación y el progreso del envío.
                    <br/>
                    Si en algún momento nota que hay retrasos o necesita información adicional, puede contactarnos directamente y le ayudaremos a resolver cualquier duda o problema relacionado con la entrega.
                    </p>
                </article>

                <article className="question-block">
                    <h3 className="question-subtitle">¿Por qué la canción es ligeramente diferente a la original?</h3>
                    <p>
                    Los mecanismos de papel tienen ciertas limitaciones físicas que impiden reproducir todas las notas exactas de una canción con precisión absoluta. Esto significa que algunas melodías pueden sonar ligeramente diferentes, aunque la esencia de la canción se mantiene intacta.
                    <br/>
                    Estas pequeñas variaciones son parte del encanto artesanal de cada caja musical, haciendo que cada pieza sea única. Nos aseguramos de que la calidad del sonido sea óptima y agradable al oído, manteniendo siempre el espíritu de la canción original.
                    </p>
                </article>

                <article className="question-block">
                    <h3 className="question-subtitle">¿Qué debo hacer si hubo un error al realizar el pago?</h3>
                    <p>
                    Si ocurre un error durante el proceso de pago, le recomendamos contactarnos de inmediato mediante nuestro correo de soporte, WhatsApp o Instagram. Incluya su nombre, número de pedido y detalles del error para que podamos identificar su caso rápidamente.
                    <br/>
                    Revisaremos la situación y le proporcionaremos instrucciones claras sobre cómo completar el pago correctamente o solucionar cualquier inconveniente. Nuestro objetivo es asegurarnos de que su pedido se procese sin problemas y llegue a usted lo antes posible.
                    </p>
                </article>

                <article className="question-block">
                    <h3 className="question-subtitle">¿Se puede cancelar el pedido si ya realicé el pago?</h3>
                    <p>
                    La cancelación de pedidos ya pagados depende del estado del envío. Si su pedido aún no ha sido despachado, podemos procesar la cancelación y gestionar el reembolso completo del monto pagado.
                    <br/>
                    Para solicitar la cancelación, contáctenos lo antes posible proporcionando su número de pedido y datos de contacto. Tenga en cuenta que una vez que el pedido haya sido enviado, la cancelación ya no es posible, y en ese caso aplicarán nuestras políticas de devoluciones y reembolsos.
                    </p>
                </article>
            </div>
        </section>
    );
}

export default FrequentQuestions

