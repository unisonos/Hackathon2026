import '../styles/HistoryOfMusicBoxes.css';

function HistoryOfMusicBoxes () {

    return (
        <section className="history-music-boxes">
            <h2 className="history-title">Historia de las Cajas de Música</h2>

            <article className="history-block">
                <h3 className="history-subtitle">El origen de las cajas de música</h3>
                <p>
                Las cajas de música nacieron en Suiza hacia finales del siglo XVIII, aunque sus raíces se
                remontan a los relojeros artesanos del siglo XVI, quienes idearon mecanismos capaces de
                producir notas mediante discos giratorios con dientes metálicos. Estos primeros sistemas,
                integrados en relojes, fueron los precursores de lo que después se llamaría “caja musical”.
                </p>
                <p>
                El nombre se atribuye al relojero ginebrino Antoine Favre, quien en 1796 diseñó un mecanismo
                con un cilindro giratorio y un peine metálico que vibraba al ser pulsado por pequeñas púas.
                Para hacerlo sonar, bastaba con girar una manivela o una llave. Así, cada relieve en el
                cilindro funcionaba como un “dedo” que tocaba una nota, tal y como sucede en un piano.
                </p>
                <p>
                Los historiadores coinciden en que el objetivo era miniaturizar los grandes carillones de
                campanas de bronce que se instalaban en torres y eran accionados desde un teclado.
                </p>
            </article>

            <article className="history-block">
                <h3 className="history-subtitle">La evolución en el siglo XIX</h3>
                <p>
                En la década de 1890, los cilindros comenzaron a ser reemplazados por discos metálicos más
                fáciles de almacenar y cambiar, lo que permitió disfrutar de una mayor variedad de melodías.
                Este avance fue un paso intermedio hacia la invención de fonógrafos y pianos mecánicos.
                </p>
                <p>
                Con el tiempo, aparecieron versiones con cilindros intercambiables y hasta mecanismos capaces
                de tocar música de manera continua durante varias horas. Sin embargo, con la llegada de los
                fonógrafos y más tarde los gramófonos, la popularidad de las cajas de música comenzó a
                disminuir.
                </p>
                <p>
                A pesar de ello, durante el siglo XX su producción en serie las convirtió en objetos de regalo
                muy apreciados y se diversificaron en diseños: desde joyeros y bolas de nieve, hasta figuritas
                musicales y modelos de lujo como los de la casa suiza Reuge.
                </p>
            </article>

            <article className="history-block">
                <h3 className="history-subtitle">Mecanismos musicales y su variedad</h3>
                <p>
                    Existen mecanismos musicales que van desde 13 hasta 160 notas. Todos funcionan con láminas
                    metálicas flexibles que vibran al ser accionadas por púas o salientes en un cilindro o disco.
                    Estos mecanismos pueden encontrarse en distintos formatos, incluyendo cajas musicales
                    tradicionales y también cajas musicales de papel.
                </p>
                <p>
                    Los cilindros o discos pueden girar manualmente mediante una manivela o de forma automática
                    gracias a un sistema de cuerda. En el caso de las cajas musicales de papel, el mecanismo
                    suele ser manual y está integrado en estructuras ligeras, manteniendo el mismo principio
                    musical pero con un diseño más delicado y artesanal.
                </p>
                <p>
                    La duración de la melodía depende del tamaño del cilindro o del tiempo de la cuerda, y
                    generalmente la melodía se repite varias veces durante su funcionamiento.
                </p>
            </article>

            <article className="history-block">
                <h3 className="history-subtitle">El nacimiento del papel perforado</h3>
                <p>
                Hacia inicios del siglo XX surgió un formato revolucionario: las manivelas con tiras de papel
                perforado. Este sistema, inspirado en las pianolas, sustituyó los cilindros por tiras largas
                de papel con perforaciones que representaban cada nota.
                </p>
                <p>
                Al girar la manivela, el papel avanza y cada perforación activa una lámina del peine metálico,
                produciendo la melodía. La gran ventaja es que permite personalizar fácilmente las canciones:
                basta con cambiar la tira para disfrutar de una melodía distinta.
                </p>
                <p>
                Hoy en día, los mecanismos de papel se fabrican en distintos formatos, principalmente de 15,
                20 y 30 notas, lo que ofrece un amplio rango de posibilidades musicales. Este sistema es más
                económico, ligero y versátil que los cilindros metálicos, y convierte cada caja de música en
                un objeto único y personalizable.
                </p>
            </article>
        </section>
    );
}

export default HistoryOfMusicBoxes;
