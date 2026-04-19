import '../styles/PageFooter.css';
import { Link } from 'react-router-dom';

function PageFooter() {
    return (
        <footer className="app-footer">

            <div className="footer-container">

                <nav className="footer-column">
                    <ul>
                        <li><Link to='/terms-and-conditions'>Terms and Conditions</Link></li>
                        <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                    </ul>
                </nav>

                <nav className="footer-column">
                    <ul>
                        <li><Link to='/'>White Web Chatbot</Link></li>
                        <li><Link to='/secure-metrics'>Security Statistics</Link></li>
                    </ul>
                </nav>

            </div>

        </footer>
    );
}

export default PageFooter;