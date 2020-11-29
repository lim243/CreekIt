import React, { useEffect } from 'react';
import ChatSearch from './components/DirectMessaging/ChatSearch.js';
import ConversationList from './components/DirectMessaging/ConversationList.js';
import NewConversation from './components/DirectMessaging/NewConvo.js';
import ChatTitle from './components/DirectMessaging/ChatTitle.js';
import MessageList from './components/DirectMessaging/Container/MessageList.js';
import ChatForm from './components/DirectMessaging/ChatForm.js';
import {conversationChanged, newMessageAdded, conversationDeleted, conversationsRequested} from './components/DirectMessaging/actionIndex'
import { connect } from 'react-redux';
import NoConversations from './components/DirectMessaging/NoConversations';


import './DirectMessage.css';
import Sidebar from './components/SideBar.js';

import { io } from 'socket.io-client';

const socket = io("http://localhost:8080/");

const DirectMessage= ({
    conversations,
    selectedConversation,
    conversationChanged,
    onMessageSubmitted,
    onDeleteConversation,
    loadConversations, 
})=> {

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    let conversationContent = (
        <>
           <NoConversations></NoConversations>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.id} />
            </>
        );
    }
    return (
        <div>
            <Sidebar />
        <div id="chat-container">
            <ChatSearch />
            <ConversationList conversations={conversations} selectedConversation={selectedConversation} onConversationItemSelected={conversationChanged} />
            <NewConversation />
            <ChatTitle selectedConversation={selectedConversation} onDeleteConversation={onDeleteConversation}/>
            {conversationContent}
            <ChatForm selectedConversation={selectedConversation}
                onMessageSubmitted={onMessageSubmitted}/> 
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
    conversationChanged: conversationId => dispatch(conversationChanged(conversationId)),
    // onMessageSubmitted: messageText => { dispatch(newMessageAdded(messageText)); },
    // TODO: Andrew's version
    // TODO: Get convo id?
    // How did you connect state from dispatch to the reducer in newconvo
    onMessageSubmitted: messageText => { 
        dispatch(newMessageAdded(messageText)); 
    },
    onDeleteConversation: () => { dispatch(conversationDeleted()); },
    loadConversations: () => { dispatch(conversationsRequested())},
    onDeleteConversation: () => { dispatch(conversationDeleted()); }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectMessage);