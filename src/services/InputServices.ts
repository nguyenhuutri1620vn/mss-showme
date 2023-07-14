export default function getService({
    valueMessage,
    isLoadingRespons,
    setIsOpen,
    setSubmitMessage,
    setValueMessage,
    setIsLoadingRespons,
}: any) {
    const closeChatbot = () => {
        setTimeout(() => {
            setIsOpen(false);
            var valueToSend = "false";
            window.parent.postMessage(valueToSend, "*");
        }, 100)
    }

    const APISendMessage = () => {
        const userMessage = valueMessage;
        setSubmitMessage((prev: any) => [...prev, { text: userMessage, sender: 'user' }]);
        setValueMessage('');
        setIsLoadingRespons(true);
        setTimeout(() => {
            const botResponse = 'Hi there. Feel free to ask me any question.';
            setSubmitMessage((prev: any) => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsLoadingRespons(false);
        }, 3000);
    }

    const sendMessage = (e: any, type: string) => {
        if (type === 'mouse') {
            e?.preventDefault();
            if (valueMessage.trim() !== '') {
                APISendMessage();
            } else {
                setValueMessage('');
            }
        } else if (type === 'key') {
            if (e?.key === 'Enter' && !isLoadingRespons) {
                if (valueMessage.trim() !== '') {
                    APISendMessage();
                } else {
                    setValueMessage('');
                }
            }
        }
    }

    const handleInput = (e: any) => {
        if (e?.target.value.length <= 500) {
            setValueMessage(e?.target.value);
        }
    }
    return {
        closeChatbot,
        sendMessage,
        handleInput
    }
}