import axios from "../utils/axios-customize";

export const ChatAPI = {
  getListOneUserMessage: (currentUserId, recipientId) => {
    return axios.get(`/messages/${currentUserId}/${recipientId}`);
  },
  removeMessage: (message) => {
    return axios.post("/messages/deleteMessage/", { message });
  },
};

export const chatGroupAPI = {};
