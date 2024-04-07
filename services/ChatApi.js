import axios from "../utils/axios-customize";

export const ChatAPI = {
  getListOneUserMessage: (currentUserId, recipientId) => {
    return axios.get(`/messages/${currentUserId}/${recipientId}`);
  },
};

export const chatGroupAPI = {};
