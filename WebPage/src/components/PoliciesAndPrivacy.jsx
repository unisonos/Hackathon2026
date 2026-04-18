import '../styles/PoliciesAndPrivacy.css'

function PoliciesAndPrivacy () {
    return (
        <section className="policies-and-privacy">
            <h2 className="policies-and-privacy-title">Policies & Privacy</h2>

            <div className='policies-and-privacy-container'>

                {/* Privacy Policy */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Privacy Policy</h3>
                    <p>
                        This application is designed to provide fast and accessible assistance in identifying potential fraud scenarios such as fake profiles, misleading job offers, and deceptive advertisements.
                        <br/><br/>
                        <strong>No User Accounts:</strong> This platform does not require user registration. No personal profiles or persistent user accounts are created or stored.
                        <br/><br/>
                        <strong>Data Collection:</strong> We only process the information that users voluntarily input into the chatbot. No unnecessary personal data is collected.
                        <br/><br/>
                        <strong>Usage of Information:</strong> The provided information is used exclusively to generate responses and improve the system’s analytical capabilities.
                        <br/><br/>
                        <strong>Data Sharing:</strong> We do not sell or distribute user data. Any processing performed through third-party services is strictly limited to essential system functionality.
                        <br/><br/>
                        <strong>Security:</strong> Reasonable technical measures are implemented to protect information from unauthorized access or misuse.
                    </p>
                </article>

                {/* AI Disclaimer */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">AI Disclaimer</h3>
                    <p>
                        This system relies on artificial intelligence to analyze and classify potential fraud scenarios.
                        <br/><br/>
                        <strong>Possible Errors:</strong> The AI may produce incorrect, incomplete, or misleading results. Outputs are generated based on patterns and probabilities, not certainty.
                        <br/><br/>
                        <strong>No Guarantees:</strong> The system does not guarantee the accuracy of its responses and should not be considered a definitive source of truth.
                        <br/><br/>
                        <strong>User Responsibility:</strong> Users are fully responsible for how they interpret and use the information provided by the system.
                        <br/><br/>
                        <strong>Recommendation:</strong> Always verify critical information through official or trusted sources before taking action.
                    </p>
                </article>

                {/* Fraud Detection Scope */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Fraud Detection Scope</h3>
                    <p>
                        The application focuses on identifying suspicious patterns related to digital fraud.
                        <br/><br/>
                        <strong>Supported Cases:</strong> Fake social media profiles, fraudulent job offers, phishing attempts, and misleading advertisements.
                        <br/><br/>
                        <strong>Limitations:</strong> The system does not have access to external databases or real-time verification services, and therefore cannot confirm the authenticity of entities with absolute certainty.
                        <br/><br/>
                        <strong>Purpose:</strong> The tool is intended to assist users in making more informed decisions, not to replace professional judgment or official verification processes.
                    </p>
                </article>

                {/* Analytics & Data Visualization */}
                <article className="policies-and-privacy-block">
                    <h3 className="policies-and-privacy-subtitle">Analytics & Data Visualization</h3>
                    <p>
                        The platform includes a data visualization module that allows users to explore aggregated fraud-related insights.
                        <br/><br/>
                        <strong>Data Insights:</strong> Users can analyze trends such as types of fraud, frequency, and distribution of detected cases.
                        <br/><br/>
                        <strong>Embedded Analytics:</strong> Visualization features are powered through embedded tools, enabling interactive dashboards within the application.
                        <br/><br/>
                        <strong>Data Nature:</strong> All displayed data is aggregated and does not represent identifiable individuals.
                    </p>
                </article>

            </div>
        </section>
    );
}

export default PoliciesAndPrivacy