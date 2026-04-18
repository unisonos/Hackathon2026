import { useState, useRef, useEffect } from 'react';
import '../styles/Store.css';

function Store() {

    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hola 👋 ¿En qué puedo ayudarle?' }
    ]);

    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages(prev => [
            ...prev,
            { from: 'user', text: input },
            { from: 'bot', text: 'Respuesta simulada...' }
        ]);

        setInput('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">

            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.from}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escriba un mensaje..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Enviar</button>
            </div>

        </div>
    );
}

export default Store;