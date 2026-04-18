import '../styles/Melodies.css'
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AudioPlayer from './AudioPlayer';


function Melodies () {

    const [activeStates, setActiveStates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState('');
    const API_DB_URL = import.meta.env.VITE_DB_API_URL;


    const handleClick = (index) => {
        setActiveStates(prev => {
            const updated = [...prev];
            updated[index] = !updated[index]; 
            return updated;
        })
    }
    

    const haveToShow = (index, actualClassName) => {
        return (!activeStates[index])? actualClassName : actualClassName + '-show';
    }


    const fetchSongs = (search = '') => {
        setLoading(true);
        fetch(`db/get/songs?text=${search}`) // had ${API_DB_URL} before
            .then(response => response.json())
            .then(data => {
                setLoading(false); 
                setSongs(data);
                setActiveStates(new Array(data.length).fill(false));
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        fetchSongs();
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        fetchSongs(query);
    }

    return (
        <>
            <section className='melodies'>
                <form className='seeker-container' onSubmit={handleSearch}>

                    <input className='seeker-input' type='text' placeholder='Buscar...' value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button className='seeker-button' type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

                </form>

                <div className='loader-wrapper' style={{marginTop: "20px", display: loading? 'block' : 'none'}}>
                    <Loader />
                </div>

                <ul className='available-songs'>

                    {!loading && songs.map((song, index) => (
                        <li key={index} className='song-item'>

                            <span className='song-name' onClick={() => handleClick(index)}>{song.song_name} </span> 

                            <div className={haveToShow(index, 'audio-player-container')}>
                                <AudioPlayer src={song.example_URL} />
                            </div>

                        </li>
                    ))}

                </ul>   
            </section>
        </>
    )
}

export default Melodies
