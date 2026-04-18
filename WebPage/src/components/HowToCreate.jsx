import '../styles/HowToCreate.css';

function HowToCreate() {
    return (
        <div className="how-to-create-container">
            <h2 className="how-to-create-title">¿CÓMO CREAR TU PROPIA MELODÍA?</h2>
            <hr className="divider" />
            <h3 className="step-title">1. Materiales necesarios</h3>
            <hr className="divider-steps" />
            <div className="materials">
                <div className='image-container'>
                    <div className="image-flex">
                        <img className="step-image" src="./tiras-papel.png" alt="Material 1" />
                        <img className="step-image" src="./perforadora.png" alt="Material 2" />
                    </div>
                    <img className="step-image" src="./manivela-ejemplo.webp" alt="Material 3" />          
                </div>
                <div className="step">
                    <p className="step-description">Las tiras de papel para cajas de música deben tener un grosor adecuado, normalmente entre 0.3 mm y 0.5 mm, para que la manivela pueda leerlas sin atascarse ni dañarse; además, requieren una perforadora especial que haga orificios de 2 mm a 3 mm de diámetro con el espaciado correcto. El ancho de las tiras varía según el modelo: en cajas pequeñas de 15 notas se usan tiras de unos 4 cm, mientras que en cajas de 20 a 30 notas suelen necesitarse tiras de 5 a 7 cm de ancho.</p>
                </div>
            </div>
            <div className="steps-container">
                
                <div className="step">

                    <h3 className="step-title">2. Notas disponibles</h3>
                    <p className="step-description">Las notas varían según la manivela musical que se utilice, ya que cada modelo cuenta con un rango distinto de sonidos posibles. En la imagen anterior se muestran las notas disponibles para una manivela de treinta, que corresponde al número más alto dentro de este tipo de mecanismos. Este tipo de manivela ofrece una mayor variedad melódica y permite crear composiciones más completas y detalladas en comparación con manivelas de menor cantidad de notas.</p>
                </div>
                <div className="step">
                    
                    <h3 className="step-title">3. Cómo comenzar a escribir una melodía</h3>
                    <p className="step-description">En una caja de música de tiras perforadas, la duración de cada nota no depende del tamaño del agujero, sino de la distancia entre ellos en el papel, ya que la manivela avanza a velocidad constante; por eso, se suele tomar la negra como referencia y asignarle una medida base (por ejemplo, 4 mm), de modo que una corchea tendría la mitad de esa distancia (2 mm), una negra mantendría los 4 mm, una blanca ocuparía el doble (8 mm) y una redonda el cuádruple (16 mm); de esta forma, basta con definir la medida de la negra y calcular el resto multiplicando o dividiendo según el valor musical correspondiente.</p>
                </div>
                <div className="step">
                    
                    <h3 className="step-title">4. Que NO hacer</h3>
                    <p className="step-description">Al perforar las tiras de papel para la caja de música, es importante evitar hacer agujeros demasiado cerca unos de otros, ya que la manivela no podrá leer correctamente la nota y el mecanismo podría fallar, lo usual ronda entre 2 a 3mm de distancia para que sea aceptable, menos de 1.5mm podría causar el problema anteriormente mencionado.</p>
                    <p className="step-description">Tampoco es buena idea sacar la tira de papel a la fuerza. Lo recomendable siempre será girar la manivela hasta que toda la tira salga por sí sola.</p>
                </div>
                <div className="step">
                
                    <h3 className="step-title">5. En caso de equivocarse al colocar una nota</h3>
                    <p className="step-description">Es muy común equivocarse al perforar una melodía en las tiras de papel, y resulta frustrante tener que comenzar de nuevo utilizando otra tira; para evitarlo, se puede aplicar una solución práctica: colocar un pequeño trozo de cinta adhesiva por la parte inferior de la tira, justo en la perforación equivocada. De esta forma, el agujero queda cubierto, la manivela no lo detecta al pasar y la nota no se reproducirá, permitiéndote corregir errores sin desperdiciar material ni tener que rehacer toda la melodía.</p>
                </div>
            </div>
        </div>
    );
}

export default HowToCreate; 