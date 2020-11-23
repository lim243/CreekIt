import React from 'react';

import './ChatTitle.css';

const ChatTitle = (props) => {
    return (
        <div id="chat-title">
            <span>{props.selectedConversation.title}</span>
            <button>Delete</button>
        </div>
    );
}

export default ChatTitle;