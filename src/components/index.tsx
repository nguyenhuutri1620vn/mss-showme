import React, { useState } from 'react';
import IconChatBot from './ChatBot/IconChatbot';
import InputMessage from './ChatBot/InputMessage';

const App = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div>
            {isOpen ?
                <InputMessage
                    isOpen={isOpen}
                    setIsOpen={setIsOpen} />
                :
                <IconChatBot
                    setIsOpen={setIsOpen}
                />
            }
        </div>
    );
};

export default App;
