import React from 'react';
import ChatSearch from './components/DirectMessaging/ChatSearch.js';
import ConversationList from './components/DirectMessaging/ConversationList.js';
import NewConversation from './components/DirectMessaging/NewConvo.js';
import ChatTitle from './components/DirectMessaging/ChatTitle.js';
import MessageList from './components/DirectMessaging/MessageList.js';
import ChatForm from './components/DirectMessaging/ChatForm.js';
import {conversations, selectedConversation} from './components/DirectMessaging/Conversations';
import {messages} from './components/DirectMessaging/Messages';


import './DirectMessage.css';
import Sidebar from './components/SideBar.js';

function DirectMessage() {
    return (
        <div>
            <Sidebar />
        <div id="chat-container">
            <ChatSearch />
            <ConversationList conversations={conversations} />
            <NewConversation />
            <ChatTitle selectedConversation = {selectedConversation}/>
            <MessageList messages={messages} />
            <ChatForm /> 
        </div>
        </div>
    );
}

export default DirectMessage;