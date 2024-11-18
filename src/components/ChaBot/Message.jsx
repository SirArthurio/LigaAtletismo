import React from 'react';

const Message = ({ sender, content }) => {
    const messageStyle =
        sender === 'user'
            ? 'bg-blue-100 self-end'
            : 'bg-red-100 self-start';

    return (
        <div className={`p-3 rounded-lg mb-2 ${messageStyle}`}>
            <p>{content}</p>
        </div>
    );
};

export default Message;