import '../styles/PoliciesAndPrivacy.css'

function PoliciesAndPrivacy () {
    return (
        <section className="policies-and-privacy">
            <h2 className="policies-and-privacy-title">Políticas y Privacidad</h2>

            <div className='policies-and-privacy-container'>
                {/* Política de Privacidad */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Política de Privacidad</h3>
                    <p>
                        En este sitio web recopilamos únicamente los datos personales necesarios para procesar pedidos y brindar soporte a nuestros clientes.
                        <br/><br/>
                        <strong>Datos que recopilamos:</strong> Nombre, correo electrónico, dirección de envío y datos necesarios para el procesamiento del pago.
                        <br/><br/>
                        <strong>Uso de la información:</strong> Los datos se utilizan exclusivamente para procesar pedidos, gestionar envíos y brindar atención al cliente.
                        <br/><br/>
                        <strong>Compartición de datos:</strong> La información solo se comparte con terceros estrictamente necesarios para el funcionamiento del servicio, como pasarelas de pago o empresas de mensajería.
                        <br/><br/>
                        <strong>Seguridad:</strong> Aplicamos medidas razonables para proteger la información personal y evitar accesos no autorizados.
                        <br/><br/>
                        <strong>Cookies:</strong> Este sitio web no utiliza cookies ni tecnologías de rastreo.
                        <br/><br/>
                        <strong>Derechos del usuario:</strong> El usuario puede solicitar el acceso, modificación o eliminación de sus datos personales contactándonos a través de los medios indicados.
                        <br/><br/>
                        <strong>Responsable:</strong> Joshua Jiménez Delgado – Correo de contacto: joshua.jimenez.delgado@gmail.com
                    </p>
                </article>

                {/* Política de Devoluciones */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Política de Devoluciones</h3>
                    <p>
                        Aceptamos devoluciones dentro de un plazo de 7 días a partir de la fecha de recepción del producto.
                        <br/><br/>
                        <strong>Condiciones para la devolución:</strong> El producto debe estar sin uso y en su estado original, conservando su empaque original.
                        <br/><br/>
                        <strong>Productos no elegibles:</strong> No se aceptan devoluciones de productos personalizados o hechos a medida, salvo en caso de defecto de fábrica.
                        <br/><br/>
                        <strong>Costos de devolución:</strong> Los costos de envío por devolución serán asumidos por el cliente.
                        En caso de error en el envío o defecto del producto, dichos costos serán asumidos por la tienda.
                        <br/><br/>
                        <strong>Proceso:</strong> Para iniciar una devolución, el cliente debe contactarnos previamente indicando su número de pedido. Le guiaremos paso a paso para completar la devolución de manera correcta.
                    </p>
                </article>

                {/* Política de Envíos */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Política de Envíos</h3>
                    <p>
                        Realizamos envíos dentro de Costa Rica.
                        <br/><br/>
                        <strong>Tiempos de entrega:</strong> Los pedidos se procesan en un plazo de 14 días hábiles. El tiempo de entrega depende de la ubicación del destinatario y la empresa de mensajería.
                        <br/><br/>
                        <strong>Costos de envío:</strong> El costo del envío se calcula durante el proceso de compra y se muestra antes de finalizar el pedido.
                        <br/><br/>
                        <strong>Empresa de mensajería:</strong> Los envíos se realizan mediante empresas de mensajería externas.
                        <br/><br/>
                        <strong>Responsabilidad:</strong> No nos hacemos responsables por retrasos atribuibles a la empresa de transporte o causas de fuerza mayor.
                    </p>
                </article>
            </div>

        </section>
    );
}

export default PoliciesAndPrivacy
