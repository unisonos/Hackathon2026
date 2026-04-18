import '../styles/PageFooter.css' 
import { Link } from 'react-router-dom'


function PageFooter() {

    return (

        <footer className='app-footer'>
            <nav>
                <ul className='social-media-link-container' id='redes'>
                    <li>
                        <a href="https://wa.me/50671413393?text=" target='_blank'>
                            <i className="bi bi-whatsapp"></i>
                            <span className='social-media-text'>Whatsapp</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/joshua.jimenez.delgado/" target='_blank'>
                            <i className="bi bi-instagram"></i>
                             <span className='social-media-text'>Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:joshua.jimenez.delgado@gmail.com" target='_blank'>
                            <i className="bi bi-envelope"></i>
                            <span className='social-media-text'>Email</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <nav>
                <ul className='footer-link-container'>

                    <li><Link to='/history-of-music-boxes'>Historia de las cajas musicales</Link></li>
                    <li><Link to='/frequently-asked-questions'>Preguntas frecuentes</Link></li>

                </ul>
            </nav>

            <nav>
                <ul className='footer-link-container'>

                    <li><Link to='/who-we-are'>Quiénes somos</Link></li>
                    <li><Link to='/how-to-create'>Cómo crear una melodía</Link></li>

                </ul>
            </nav>

            <nav>    
                <ul className='footer-link-container'>

                <li><Link to='/terms-and-conditions'>Términos y condiciones</Link></li>
                <li><Link to='/policies-and-privacy'>Políticas y privacidad</Link></li>

                </ul>
            </nav>
            
        </footer>
    );
}



export default PageFooter
