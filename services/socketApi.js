import { io } from "socket.io-client";
import { baseMessage, baseUrl } from "../utils/containUrl";

const socket = io(baseUrl);

export const connectToSocket = () => {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
};

export const disconnectFromSocket = () => {
  socket.disconnect();
};

export const receiveMessage = (callback) => {
  socket.on(baseMessage, (message) => {
    callback(message);
  });
};

export const sendMessage = (message) => {
  socket.emit(baseMessage, message);
};

export default socket;
