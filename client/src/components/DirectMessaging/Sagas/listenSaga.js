import { call, put, take } from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {io} from 'socket.io-client'


const socketServerURL = "http://localhost:8080";
let socket;

// wrapping function for socket.on
const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
};

// This is how a channel is created
const createSocketChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      console.log('data in socket', data);
      // emit(data);
    };
    socket.on("message", handler);
    return () => {
      socket.off("message", handler);
    };
  });

// saga that listens to the socket and puts the new data into the reducer
export const listenServerSaga = function* () {
  // connect to the server
  const socket = yield call(connect);

  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  // then put the new data into the reducer
  while (true) {
    const payload = yield take(socketChannel);
    yield put({ type: 'NEW_MESSAGE_DETECTED', payload });
  }
};
// TODO:
