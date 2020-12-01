import { all } from 'redux-saga/effects';

import { watchGetConversationsAsync } from './conversationSaga';
import { watchGetMessagesAsync } from './messageSaga';
import { listenServerSaga } from './listenSaga'

export default function* rootSaga() {
    yield all([
        watchGetConversationsAsync(),
        watchGetMessagesAsync(),
        listenServerSaga()
    ]);
}