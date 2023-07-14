import React, { useRef, useState } from 'react';
import IconChatBot from './ChatBot/IconChatbot';
import InputMessage from './ChatBot/InputMessage';
import '../styles/index.scss';

const App = () => {
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [submitMessage, setSubmitMessage] = useState<any>([]);

    return (
        <>
            {isOpen ?
                <InputMessage
                    isOpen={isOpen}
                    inputRef={inputRef}
                    submitMessage={submitMessage}
                    setIsOpen={setIsOpen}
                    setSubmitMessage={setSubmitMessage}
                />
                :
                <IconChatBot
                    setIsOpen={setIsOpen} />
            }
        </>
    );
};

export default App;
