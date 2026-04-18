import '../styles/AudioPlayer.css';
import { useState, useEffect, useRef } from 'react';
// import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';

function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const updateMetadata = () => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    };
    const audio = audioPlayer.current;
    audio.addEventListener('loadedmetadata', updateMetadata);
    return () => audio.removeEventListener('loadedmetadata', updateMetadata);
  }, []);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleIsPlaying = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

//   const backThirty = () => {
//     progressBar.current.value = Math.max(0, progressBar.current.value - 30);
//     changeRange();
//   };

//   const forwardThirty = () => {
//     progressBar.current.value = Math.min(duration, Number(progressBar.current.value) + 30);
//     changeRange();
//   };

  return (
    <div className='audioPlayer'>
      <audio ref={audioPlayer} src={src} preload='metadata' />
      {/* <button className='forwardBackward' onClick={backThirty}><BsArrowLeftShort /></button> */}
      <button className='playPause' onClick={handleIsPlaying}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className='play' />}
      </button>
      {/* <button className='forwardBackward' onClick={forwardThirty}><BsArrowRightShort /></button> */}
      <div className='currentTime'>{calculateTime(currentTime)}</div>
      <div>
        <input className='progressBar' type='range' defaultValue='0' value={currentTime} ref={progressBar} onChange={changeRange} />
      </div>
      <div className='duration'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
    </div>
  );
}


export default AudioPlayer;