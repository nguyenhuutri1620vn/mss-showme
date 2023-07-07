import React, { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';

export interface IInputProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void;
}

const Chatbot: FC<PropsWithChildren<IInputProps>> = ({ isOpen, setIsOpen }: any) => {
    return (
        <>
            <Modal
                key="modal-chatbot"
                title="Insight Assistant"
                visible={isOpen}
            />
        </>
    );
};

export default Chatbot;
