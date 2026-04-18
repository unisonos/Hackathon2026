import '../styles/AboutUs.css'


function AboutUs() {
    return (
        <>
            <div className='about-container'>

                <article className='about-story'>
                    <img className='about-image' src='./quienes-somos.jpg'/>
                    <section className='about-content'>
                        <h2 className='about-title'>Componiendo historias
                        DESDE 2016 </h2>
                        <p>Hace unos años, Ismael tuvo una idea: unir su faceta de compositor musical con sus ganas de emprender un proyecto propio y lanzó la idea de “tu nombre en música”, que pronto se convirtió en Miium. </p>
                        <p> Gracias a la familia y a Lorena, que se unió al proyecto al terminar sus estudios de Filosofía y ha ayudado a hacerlo crecer, hemos dado forma a miles de historias y recuerdos desde nuestro taller en Zaragoza. </p>
                    </section>
                </article>


                <article className='about-story' >
                    <img style={{gridColumn: 2}} className='about-image' src='./quienes-somos-2.jpg'/>
                    <section style={{gridColumn: 1, gridRow: 1}} className='about-content'>
                        <h2 className='about-title'>Un lenguaje UNIVERSAL </h2>
                        <p>Hay una frase que nos encanta: "La vida sin música sería un error". Nuestro trabajo es hacer posible algo tan sencillo como que todas las personas expresen sus sentimientos a través de la música, el lenguaje más universal. </p>
                        <p>En Miium unimos los procesos artesanales y el mundo digital para que cada cliente pueda crear una caja de música a su medida, que encierre el significado que desea transmitir. Como decimos en el taller: la música la pones tú. </p>
                    </section>
                </article>


                <article className='about-story'>
                    <img className='about-image' src='./quienes-somos-3.jpg'/>
                    <section className='about-content'>
                        <h2 className='about-title'>El taller
                        MUSICAL</h2>
                        <p>Nuestro taller el lugar en el que los deseos se convierten en cajas de música, donde creamos la canción perfecta para cada sensación. Lorena atiende los encargos y personaliza cada caja e Ismael fabrica los mecanismos a medida y compone las melodías para los encargos más especiales. </p>
                        <p>Desde el taller fabricamos nuestras cajas de música personalizadas, comprobamos su sonido una a una y las enviamos a todo el mundo. Si quieres saber algo más sobre nosotros o nuestro trabajo, nos encantará que nos escribas. </p>
                    </section>
                </article>

            </div>

        </>
    )
}

export default AboutUs
