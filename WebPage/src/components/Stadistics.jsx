import '../styles/Stadistics.css'

function Stadistics () {

    return (
        <section className="stadistics-container">

            <h2 className="stadistics-title">
                Fraud Analytics Dashboard
            </h2>

            <div className="stadistics-frame-wrapper">
                <iframe
                    title="Power BI Dashboard"
                    src="https://app.powerbi.com/reportEmbed?reportId=3d21a7fc-740c-457e-8348-5e93336474f1&autoAuth=true&ctid=bfcf1d9d-93ea-43b1-b902-1daa68a64248" 
                    frameBorder="0"
                    allowFullScreen={true}
                ></iframe>
            </div>

        </section>
    );
}

export default Stadistics;