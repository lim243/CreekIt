import { io } from 'socket.io-client';

const socket = io("http://localhost:8080/");

const initialState = {
    conversations: [],
    selectedConversation: {}
};

initialState.selectedConversation = initialState.conversations[0];  //SELECT FIRST

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECTED_CONVERSATION_CHANGED': {
            const newState = { ...state };
            newState.selectedConversation = 
                newState.conversations.find(
                    conversation => conversation.id === action.conversationId
                );

            return newState;
        }
        case 'CONVERSATIONS_LOADED': {
            const newState = { ...state };
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;

            return newState;
        } 
        case 'NEW_MESSAGE_ADDED': {
            const newState = { ...state };
            console.log('newState', newState);
            
            newState.selectedConversation = { ...newState.selectedConversation };
            console.log(newState.selectedConversation);

            newState.selectedConversation.messages.unshift(
                {
                    messageText: action.textMessage,
                    createdAt: Date.now(),
                    sender: localStorage.getItem("username"),
                    isMyMessage: true
                },
            )

            socket.emit('sendMessage', newState.selectedConversation)


            return newState;
        }
        case 'NEW_MESSAGE_DETECTED': {
            console.log('NEW_MESSAGE_DETECTED');
            const newState = { ...state };
            console.log('NEW State detected', newState);
            newState.selectedConversation = { ...newState.selectedConversation };
            console.log(newState.selectedConversation);

            newState.selectedConversation.messages.unshift(
                {
                    messageText: action.textMessage,
                    createdAt: Date.now(),
                    sender: localStorage.getItem("username"),
                    isMyMessage: true
                },
            )
            return newState;
        }
        case 'DELETE_CONVERSATION': {
            const newState = { ...state };
            let selectedConversationIndex = 
                newState.conversations.findIndex(c => c.id === newState.selectedConversation.id);
            newState.conversations.splice(selectedConversationIndex, 1);

            if (newState.conversations.length > 0) {
                if (selectedConversationIndex > 0) {
                    --selectedConversationIndex;
                }
        
                newState.selectedConversation = newState.conversations[selectedConversationIndex];
            } else {
                newState.selectedConversation = null;
            }
            return newState;
        }
        default:
            return state;
    }
  }
  
export default conversationsReducer;