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
                    src="https://app.powerbi.com/view?r=XXXXX" // Link aqui
                    frameBorder="0"
                    allowFullScreen={true}
                ></iframe>
            </div>

        </section>
    );
}

export default Stadistics;