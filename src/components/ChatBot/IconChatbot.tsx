import React, { FC, PropsWithChildren, useState } from 'react';
import { Affix, Button } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';

export interface IIconProps {
  setIsOpen: (value: boolean) => void;
}

const IconChatbot: FC<PropsWithChildren<IIconProps>> = ({ setIsOpen }: any) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const openChatbot = () => {
    setIsOpen(true);
    var valueToSend = "true";
    window.parent.postMessage(valueToSend, "*");
  }

  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container} className='affix-chatbot-icon'>
          <Button className='btn-icon-chatbot' onClick={openChatbot}>
            <MessageTwoTone style={{ fontSize: 50, paddingTop: 3 }} twoToneColor="#1890FF" color='#FFF' />
          </Button>
        </Affix>
      </div>
    </div>
  );
}

export default IconChatbot;