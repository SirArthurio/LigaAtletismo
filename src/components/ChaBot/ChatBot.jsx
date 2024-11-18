import React, { useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const showChatBot = () => {
        setIsOpen(!isOpen);
        console.log("ya sali");
    };

    const generateBotResponse = (userMessage) => {
        const messageLower = userMessage.toLowerCase();

        if (messageLower.includes('hola')) {
            return '¡Hola! ¿En qué puedo ayudarte?';
        } else if (messageLower.includes('precio')) {
            return 'El precio de nuestro servicio depende del tipo de plan que elijas.';
        } else if (messageLower.includes('ayuda')) {
            return 'Claro, ¿en qué necesitas ayuda?';
        } else {
            return 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla?';
        }
    };

    const handleUserMessage = (message) => {
        const newMessages = [...messages, { sender: 'user', content: message }];
        setMessages(newMessages);

        const botResponse = generateBotResponse(message);
        setMessages([...newMessages, { sender: 'bot', content: botResponse }]);
    };

    const Button = () => (
        <button onClick={showChatBot}
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
                type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
            <svg xmlns=" http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="text-white block border-gray-200 align-middle">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200">
                </path>
            </svg>
        </button>
    );

    const Chat = () => {
        if (isOpen){
            return (
                <div
                className="fixed bottom-[calc(4rem+1.5rem)] right-5 max-w-sm mx-auto rounded-lg border border-gray-300 p-4 bg-gray-100">
                <div className="h-64 overflow-y-auto flex flex-col mb-4">
                    {messages.map((msg, index) => (
                        <Message key={index} sender={msg.sender} content={msg.content}/>
                    ))}
                </div>
                <ChatInput onSendMessage={handleUserMessage}/>
            </div>
            );
        }
        return (<div> </div>)
    };

    return (
        <div>
            <Button/>
            <Chat/>
        </div>
    );
};


export default Chatbot;