import '../styles/Loader.css';

function Loader() {

  return (
    <>
      <div className='loader-container'>
          <div className="loader"></div>
          <p>Cargando
          <span className='dots'>
              <span className='dot'>.</span><span className='dot'>.</span><span className='dot'>.</span>
          </span>
          </p>
      </div>
    </>
  );
}

export default Loader;