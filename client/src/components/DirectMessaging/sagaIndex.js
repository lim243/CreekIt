import { all } from 'redux-saga/effects';

import { watchGetConversationsAsync } from './conversationSaga';

export default function* rootSaga() {
    yield all([
        watchGetConversationsAsync()
    ]);
}