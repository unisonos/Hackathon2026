import '../styles/PageHeader.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import logo from '../assets/store-logo.jpeg'


function PageHeader() {

    const MOBILE_VIEWPORT_MAX_WIDTH = 720;

    const [isNavOpened, setIsNavOpened] = useState(false);

    const handleClick = () => {
        setIsNavOpened(!isNavOpened);
    }

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth > MOBILE_VIEWPORT_MAX_WIDTH) {
                setIsNavOpened(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <header className='app-header'>

            {/* <Link to='/'><img className='header-image' src={logo}/></Link> */}
            

            <button onClick={() => handleClick()} className='open-header-links'><i className="bi bi-list"></i></button>

            <nav className={`header-nav + ${isNavOpened? 'visible' : ''}`}>

                <button onClick={() => handleClick()} className='close-header-links'><i className="bi bi-x-lg"></i></button>

                <ul className='header-link-container' onClick={() => {isNavOpened && handleClick()}}>

                    <li><Link className='header-link' to='/secure-metrics'>Secure Stadistics</Link></li>
                    <li><Link className='header-link' to='/'>White Web Chatbot</Link></li>
                    <li><Link className='header-link' to='/terms-and-conditions'>Terms and Conditions</Link></li>
                    <li><Link className='header-link' to='/privacy-policy'>Privacy Policy</Link></li>

                </ul>
            </nav>
        </header>
    );
} 

export default PageHeader;
