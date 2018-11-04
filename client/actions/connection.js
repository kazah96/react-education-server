import {emitAction} from './actions';

export const webSocketConnectBegin = "WEBSOCKET_CONNECT_BEGIN";
export const webSocketConnected = "WEBSOCKET_CONNECTED";
export const webSocketError = "WEBSOCKET_ERROR";

let socket = undefined;

export function connect(data) {
  return dispatch => {
    if(socket) return;

    socket = new WebSocket("ws://localhost:3000");
    dispatch({ type: webSocketConnectBegin });

    console.log(socket);
    socket.onopen = () => {
      dispatch({
        type: webSocketConnected,
        socket
      });
    };

    socket.onerror = (error) => {
      dispatch({
        type: webSocketError,
        error
      })
    };


    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      console.log("recieved messatge");
      console.log(msg);
      emitAction(dispatch, message); 
    }
  }
}

export function sendMessage(type, obj) {
  return dispatch => {
    if (!socket) return;

    const message = JSON.stringify({ type, payload: obj });
    socket.send(message);
  }

}