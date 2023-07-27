import React, { FC, PropsWithChildren, useEffect } from 'react';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import numeral from 'numeral';

export interface IChatMessage {
    isOpen: boolean
    isLoadingRespons: boolean
    submitMessage: any[]
}

const formatNumber = '0,0.00'
const ChatMessage: FC<PropsWithChildren<IChatMessage>> = ({ isOpen, isLoadingRespons, submitMessage }: any) => {

    useEffect(() => {
        let objDiv = document.querySelector('.ant-modal-body');
        if (objDiv !== null) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [isOpen, submitMessage]);

    return (
        <Content key="chatbot-messenge-chatbot-content" id="chatbot-messenge-chatbot-content">
            <Row key="default-message" className='message-chatbot message-bot'>
                <Col span={2} className='avatar-bot'>
                    <Avatar icon={<RobotOutlined />} size={40} />
                </Col>
                <Col span={21} className='messenge-content'>
                    <p>
                        Hi there. Feel free to ask me any question.
                    </p>
                </Col>
            </Row>
            {
                submitMessage?.map((message: any, index: number) => {
                    return (
                        message?.sender === 'user' ?
                            <>
                                <Row key={index} className={`message-chatbot message-user`}>
                                    <Col span={22} className='messenge-content' style={{ paddingRight: '5px' }}>
                                        <p >
                                            {message?.text}
                                        </p>
                                    </Col>
                                    <Col span={2} className='avatar-chatbot-user'>
                                        <Avatar icon={<UserOutlined />} size={40} />
                                    </Col>
                                </Row>
                            </>
                            :
                            <Row key={index} className={`message-chatbot message-bot`}>
                                <Col span={2} className='avatar-bot'>
                                    <Avatar icon={<RobotOutlined />} size={40} />
                                </Col>
                                <Col span={21} className='messenge-content'>
                                    <p>
                                        {message?.text}
                                        {message?.type === 'json' &&
                                            <table className='table-chat-bot'>
                                                <tr>
                                                    <th className='table-chat-bot'>ID</th>
                                                    <th className='table-chat-bot'>Vendor Name</th>
                                                    <th className='table-chat-bot'>Spend</th>
                                                </tr>
                                                {message?.content.filter((n: any) => n.id !== 0).map((item: any, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className='table-chat-bot'>{item?.id !== -1 && item.id}</td>
                                                            <td className='table-chat-bot'>{item?.vendor_name}</td>
                                                            <td className='table-chat-bot'>{numeral(item?.total_spend).format(formatNumber)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </table>
                                        }
                                    </p>
                                </Col>
                            </Row>
                    )
                })
            }
            {isLoadingRespons &&
                <Row className={`message-chatbot message-bot`}>
                    <Col span={2} className='avatar-bot' >
                        <Avatar icon={<RobotOutlined />} size={40} />
                    </Col>
                    <Col span={21} style={{ background: '#E4E6EB', padding: '10px', borderRadius: 50, maxWidth: 50 }}>
                        <div className="chatbot-typing" >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Col>
                </Row>}
        </Content>
    );
};

export default ChatMessage;
