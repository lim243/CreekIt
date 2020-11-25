import { put, takeEvery } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const conversations = [
    { 
        id: '1',
        title: 'Daryl Duckmanton',
        createdAt: 'Apr 16',
        latestMessageText: 'This is a message',
        messages: [{
            messageText: 'Ok then',
            createdAt: 'Apr 16',
            isMyMessage: true
        },
        {
            messageText: `
                Yeah I think it's best we do that. Otherwise things won't work well at all. 
                I'm adding more text here to test the sizing of the speech bubble and the 
                wrapping of it too.
            `,
            createdAt: 'Apr 16',
            isMyMessage: false
        },
        {
            messageText: 'Maybe we can use Jim\'s studio.',
            createdAt: 'Apr 15',
            isMyMessage: true
        },
        {
            messageText: `
                All I know is where I live it's too hard
                to record because of all the street noise.
            `,
            createdAt: 'Apr 15',
            isMyMessage: false
        },
        {
            messageText: `
                Well we need to work out sometime soon where
                we really want to record our video course.
            `,
            createdAt: 'Apr 15',
            isMyMessage: true
        },
        {
            messageText: `
                I'm just in the process of finishing off the
                last pieces of material for the course.
            `,
            createdAt: 'Apr 15',
            isMyMessage: false
        },
        {
            messageText: 'How\'s it going?',
            createdAt: 'Apr 13',
            isMyMessage: true
        },
        {
            messageText: ' Hey mate what\'s up?',
            createdAt: 'Apr 13',
            isMyMessage: false
        },
        {
            messageText: 'Hey Daryl?',
            createdAt: 'Apr 13',
            isMyMessage: true
        }]
    },
    {
        id: '2', 
        title: 'Kim O\'Neil',
        createdAt: 'Oct 20',
        latestMessageText: 'Ok fair enough. Well good talking to you.',
        messages: []
    },
    {
        id: '3', 
        title: 'John Anderson',
        createdAt: '1 week ago',
        latestMessageText: 'Yes I love how Python does that',
        messages: []
    },
    { 
        id: '4',
        title: 'Ben Smith',
        createdAt: '2:49 PM',
        latestMessageText: 'Yeah Miami Heat are done',
        messages: []
    },
    { 
        id: '5',
        title: 'Douglas Johannasen',
        createdAt: '6:14 PM',
        latestMessageText: 'No it does not',
        messages: []
    },
    { 
        id: '6',
        title: 'Jacob Manly',
        createdAt: '3 secs ago',
        latestMessageText: 'Just be very careful doing that',
        messages: []
    },
    { 
        id: '7',
        title: 'Stacey Wilson',
        createdAt: '30 mins ago',
        latestMessageText: 'Awesome!!! Congratulations!!!!',
        messages: []
    },
    { 
        id: '8',
        title: 'Stan George',
        createdAt: '1 week ago',
        latestMessageText: 'Good job',
        messages: []
    },
    { 
        id: '9',
        title: 'Sarah Momes',
        createdAt: '1 year ago',
        latestMessageText: 'Thank you. I appreciate that.',
        messages: []
    
    }
];

export const conversationsSaga = function*() {
    yield delay(1000);
    yield put({
        type: 'CONVERSATIONS_LOADED',
        payload: {
            conversations,
            selectedConversation: conversations[0]
        }
    });
}

export function* watchGetConversationsAsync() {
    console.log('Conversations requested');
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}