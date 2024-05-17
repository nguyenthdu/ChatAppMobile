import axios from "../utils/axios-customize";

export const ChatAPI = {
  getListOneUserMessage: (currentUserId, recipientId) => {
    return axios.get(`/messages/${currentUserId}/${recipientId}`);
  },
  removeMessage: (message) => {
    return axios.post("/messages/deleteMessage/", { message });
  },
};

export const chatGroupAPI = {
  getMessageGroup: (roomId) => {
    return axios.get(`/messages/room/${roomId}`);
  },
  // getGroupByUserId: (userId) => {
  //   return axios.get(`rooms/user/${userId}`);
  // },
  createGroup: (data) => {
    return axios.post("/room/create-group", data);
  },
  getAllGroupByUserId: (userId) => {
    return axios.get(`/room/rooms/user/${userId}`);
  },
  // addUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
  //   return axios.put(`/room/add-members/${roomId}`, userIds)
  // },
  // deleteUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
  //   return axios.delete(`/room/delete-members/${roomId}`, { data: userIds })
  // },
};
