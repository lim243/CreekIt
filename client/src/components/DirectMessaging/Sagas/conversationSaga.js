import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let conversations = [
    {
        id: "1",
        title: "Daryl Duckmanton",
        createdAt: "Apr 16",
        latestMessageText: "This is a message",
        messages: [],
    },
    {
        id: "2",
        title: "Kim O'Neil",
        createdAt: "Oct 20",
        latestMessageText: "Ok fair enough. Well good talking to you.",
        messages: [],
    },
    {
        id: "3",
        title: "John Anderson",
        createdAt: "1 week ago",
        latestMessageText: "Yes I love how Python does that",
        messages: [],
    },
    {
        id: "4",
        title: "Ben Smith",
        createdAt: "2:49 PM",
        latestMessageText: "Yeah Miami Heat are done",
        messages: [],
    },
    {
        id: "5",
        title: "Douglas Johannasen",
        createdAt: "6:14 PM",
        latestMessageText: "No it does not",
        messages: [],
    },
    {
        id: "6",
        title: "Jacob Manly",
        createdAt: "3 secs ago",
        latestMessageText: "Just be very careful doing that",
        messages: [],
    },
    {
        id: "7",
        title: "Stacey Wilson",
        createdAt: "30 mins ago",
        latestMessageText: "Awesome!!! Congratulations!!!!",
        messages: [],
    },
    {
        id: "8",
        title: "Stan George",
        createdAt: "1 week ago",
        latestMessageText: "Good job",
        messages: [],
    },
    {
        id: "9",
        title: "Sarah Momes",
        createdAt: "1 year ago",
        latestMessageText: "Thank you. I appreciate that.",
        messages: [],
    },
];

const fetchConversation = (username) => {
    return axios.request({
        method: "get",
        url: `http://localhost:5000/api/v1/messages/${username}`,
    });
};

export const conversationsSaga = function* () {
  // fetch from backend
    const username = localStorage.getItem("username");
    let { data } = yield call(fetchConversation, username);
    console.log("DATA", data);

    yield put({
        type: "CONVERSATIONS_LOADED",
        payload: {
        conversations: data,
        selectedConversation: data[0],
        },
    });
};

export function* watchGetConversationsAsync() {
    console.log("Conversations requested");
    yield takeEvery("CONVERSATIONS_REQUESTED", conversationsSaga);
}
