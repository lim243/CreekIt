import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';

import './Message.css';

const Message = ({ isMyMessage, message }) => {
    const messageClass = classNames('message-row', {
        'you-message': isMyMessage,
        'other-message': !isMyMessage
    });
    
    // const imageThumbnail = 
    //     isMyMessage ? null : <img src={message.imageUrl} alt={message.imageAlt} />;

    return (
        <div className={messageClass}>
            <div className="message-content">
                {/* {imageThumbnail} */}
                <div className="message-text">
                    {message.messageText}
                </div>
                <div className="message-time">{
                                moment(message.createdAt)
                                    .tz("America/New_York")
                                    .format("h:mm a MMM Do ")
            }</div>
            </div>
        </div>
    );
}

export default Message;