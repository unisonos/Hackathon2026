import { useEffect, useState } from 'react'
import '../styles/Store.css'
import Loader from './Loader';


function Store () {

    const [loading, setLoading] = useState(false);

    return (   
        <div>

            <div className={`loader-wrapper ${loading? 'show' : ''}`}>
                <Loader />
            </div>

            {/**Aqui va el chatbot */}

        </div>            
    )
}

export default Store
