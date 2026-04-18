import '../styles/TermsAndConditions.css';

function TermsAndConditions () {

    return (
        <section className='terms-and-conditions'>

            <h2 className='terms-and-conditions-title'>Terms & Conditions</h2>

            <div className='terms-and-conditions-text'>

                <div className='term-condition-container'>
                    <h3>1. Purpose of the Application</h3>
                    <p>
                        This application provides an automated chatbot designed to assist users in identifying potential fraud scenarios,
                        including fake profiles, misleading job offers, phishing attempts, and deceptive advertisements.
                        <br/><br/>
                        The system analyzes user-provided information and generates responses based on predefined models and patterns.
                        <br/><br/>
                        This tool is intended strictly for informational and educational purposes and should not be considered a substitute
                        for professional, legal, or financial advice.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>2. No User Accounts</h3>
                    <p>
                        This platform does not require user registration, login, or account creation.
                        <br/><br/>
                        No personal profiles are created, stored, or tracked within the system.
                        <br/><br/>
                        Any information entered into the chatbot is processed temporarily and is not associated with a persistent identity.
                        <br/><br/>
                        Users interact with the system anonymously, and no long-term storage of identifiable user data is intended.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>3. AI Limitations</h3>
                    <p>
                        The application relies on artificial intelligence models to generate responses and detect potential fraud patterns.
                        <br/><br/>
                        <strong>Possible Errors:</strong> The AI may produce inaccurate, incomplete, outdated, or misleading results.
                        <br/><br/>
                        <strong>No Guarantee:</strong> All outputs are probabilistic and based on available patterns, not verified facts.
                        <br/><br/>
                        The system does not have access to real-time databases or official verification sources.
                        <br/><br/>
                        Users acknowledge that the AI may fail to correctly classify certain cases.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>4. User Responsibility</h3>
                    <p>
                        Users are solely responsible for how they interpret and use the information provided by this application.
                        <br/><br/>
                        Decisions made based on chatbot responses are entirely at the user's own risk.
                        <br/><br/>
                        <strong>Recommendation:</strong> Always verify critical information through official, legal, or trusted sources before taking action.
                        <br/><br/>
                        The application should not be used as the sole basis for making financial, legal, or professional decisions.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>5. Data Usage</h3>
                    <p>
                        The system processes user input solely to generate responses and improve fraud detection capabilities.
                        <br/><br/>
                        No intentional collection of personal or sensitive data is performed beyond what the user voluntarily provides.
                        <br/><br/>
                        Information may be processed temporarily to enhance system performance and analytical accuracy.
                        <br/><br/>
                        No data is sold or distributed to unauthorized third parties.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>6. Analytics & Visualization</h3>
                    <p>
                        The application includes a data visualization module that provides insights into fraud-related trends and patterns.
                        <br/><br/>
                        Users may explore aggregated statistics such as fraud categories, frequency, and distribution.
                        <br/><br/>
                        These insights are presented through embedded analytics tools and dashboards.
                        <br/><br/>
                        All displayed data is anonymized and does not represent identifiable individuals.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>7. Service Availability</h3>
                    <p>
                        We reserve the right to modify, update, suspend, or discontinue the application at any time without prior notice.
                        <br/><br/>
                        The system may experience interruptions due to maintenance, updates, or external factors beyond our control.
                        <br/><br/>
                        We do not guarantee continuous or uninterrupted availability of the service.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>8. Limitation of Liability</h3>
                    <p>
                        We are not responsible for any direct, indirect, incidental, or consequential damages arising from the use of this application.
                        <br/><br/>
                        This includes, but is not limited to, financial loss, missed opportunities, incorrect decisions, or reliance on inaccurate information.
                        <br/><br/>
                        Users agree to use the application at their own risk.
                    </p>
                </div>

                <div className='term-condition-container'>
                    <h3>9. Changes to Terms</h3>
                    <p>
                        These Terms and Conditions may be updated or modified at any time.
                        <br/><br/>
                        Any changes will take effect immediately upon publication within the application.
                        <br/><br/>
                        Continued use of the system implies acceptance of the most recent version of these terms.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default TermsAndConditions;