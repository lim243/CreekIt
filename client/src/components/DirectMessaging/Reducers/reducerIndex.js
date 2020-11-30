import { combineReducers } from 'redux';

import conversationState from './Conversations';
import messagesState from './reducerMessage';

export default combineReducers({
  conversationState,
  messagesState
});