import { all } from 'redux-saga/effects';

import { watchGetConversationsAsync } from './conversationSaga';
import { watchGetMessagesAsync } from './messageSaga';

export default function* rootSaga() {
    yield all([
        watchGetConversationsAsync(),
        watchGetMessagesAsync()
    ]);
}