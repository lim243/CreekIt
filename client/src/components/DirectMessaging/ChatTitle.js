import React from 'react';

import './ChatTitle.css';

const ChatTitle = ({selectedConversation, onDeleteConversation}) => {
    return (
        <div id="chat-title">
            <span>{selectedConversation.title}</span>
            <button onClick={() => { onDeleteConversation(); } } >Delete</button>
        </div>
    );
}

export default ChatTitle;