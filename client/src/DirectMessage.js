import React, { useState } from 'react';
import ChatSearch from './components/DirectMessaging/ChatSearch.js';
import ConversationList from './components/DirectMessaging/ConversationList.js';
import NewConversation from './components/DirectMessaging/NewConvo.js';
import ChatTitle from './components/DirectMessaging/ChatTitle.js';
import MessageList from './components/DirectMessaging/MessageList.js';
import ChatForm from './components/DirectMessaging/ChatForm.js';
import {conversationChanged} from './components/DirectMessaging/actionIndex'
import { connect } from 'react-redux';


import './DirectMessage.css';
import Sidebar from './components/SideBar.js';

const DirectMessage= ({conversations, selectedConversation, conversationChanged})=> {
    return (
        <div>
            <Sidebar />
        <div id="chat-container">
            <ChatSearch />
            <ConversationList conversations={conversations} selectedConversationId={selectedConversation.id} onConversationItemSelected={conversationChanged} />
            <NewConversation />
            <ChatTitle selectedConversation = {selectedConversation}/>
            <MessageList messages={selectedConversation.messages} />
            <ChatForm /> 
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        conversations: state.conversationState.conversations,
        selectedConversation: state.conversationState.selectedConversation
    };
};
  
const mapDispatchToProps = dispatch => ({
    conversationChanged: conversationId => dispatch(conversationChanged(conversationId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectMessage);