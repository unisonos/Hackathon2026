import '../styles/PageFooter.css';
import { Link } from 'react-router-dom';

function PageFooter() {
    return (
        <footer className="app-footer">

            <div className="footer-container">

                <nav className="footer-column">
                    <ul>
                        <li><Link to='/history-of-music-boxes'>Historia de las cajas musicales</Link></li>
                        <li><Link to='/frequently-asked-questions'>Preguntas frecuentes</Link></li>
                    </ul>
                </nav>

                <nav className="footer-column">
                    <ul>
                        <li><Link to='/who-we-are'>Quiénes somos</Link></li>
                        <li><Link to='/how-to-create'>Cómo crear una melodía</Link></li>
                    </ul>
                </nav>

                <nav className="footer-column">
                    <ul>
                        <li><Link to='/terms-and-conditions'>Términos y condiciones</Link></li>
                        <li><Link to='/policies-and-privacy'>Políticas y privacidad</Link></li>
                    </ul>
                </nav>

            </div>

        </footer>
    );
}

export default PageFooter;