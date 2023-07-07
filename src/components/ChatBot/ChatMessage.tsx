import React from 'react';

const ChatMessage = ({ sender, content }: { sender: string, content: string }) => {
    return (
        <div className={`chat-message ${sender}`}>
            <span className="sender">{sender}: </span>
            <span className="content">{content}</span>
        </div>
    );
};

export default ChatMessage;
