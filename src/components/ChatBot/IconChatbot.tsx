import React, { FC, PropsWithChildren, useState } from 'react';
import { Affix, Button } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';

import '../../index.css'
// import localStorage from '../../utils/localStorage';

export interface IIconProps {
  setIsOpen: (value: boolean) => void;
}

const IconChatbot: FC<PropsWithChildren<IIconProps>> = ({ setIsOpen }: any) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);


  const openChatbot = () => {
    setIsOpen(true);
  }

  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
          <Button className='btn-icon-chatbot' onClick={openChatbot}>
            <MessageTwoTone style={{ fontSize: 50, paddingTop: 3 }} twoToneColor="#1890FF" color='#FFF' />
          </Button>
        </Affix>
      </div>
    </div>
  );
}

export default IconChatbot;