import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone'

import './ConversationItem.css';

const ConversationItem = (
    { 
        conversation, 
        isActive,
        onConversationItemSelected
    }
) => {
    const className = classNames('conversation', {
        'active': isActive
    });

    return (
        <div className={className} onClick={() => onConversationItemSelected(conversation.id)}>
            {/* <img src={conversation.imageUrl} alt={conversation.imageAlt} /> */}
            <div className="title-text">{conversation.title}</div>
            <div className="created-date">{
                                moment(conversation.createdAt)
                                    .tz("America/New_York")
                                    .format("h:mm a MMM Do ")
            }</div>
            <div className="conversation-message">
                {conversation.latestMessageText}
            </div>
        </div>
    );
}

export default ConversationItem;