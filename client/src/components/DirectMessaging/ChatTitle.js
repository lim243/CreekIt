import React from 'react';
import Avatar from 'react-avatar';

import './ChatTitle.css';

const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <span>{ selectedConversation.title }</span>
                <Avatar
                    src={selectedConversation.profile_picture}
                    name={selectedConversation.title}
                    size='50'
                    round='100px'
                    className='avatar'
                />
                <button onClick={() => { onDeleteConversation(selectedConversation.id); } } >Delete</button>
            </>
        );
    }

    return (
        <div id="chat-title">
            { chatTitleContents }
        </div>
    );
}

export default ChatTitle;