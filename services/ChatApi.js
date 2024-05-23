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

  getAllGroupByUserId: (userId) => {
    return axios.get(`/room/rooms/user/${userId}`);
  },
  createGroup: (data) => {
    return axios.post("/room/create-group", data);
  },
  deleteGroup: (id) => {
    return axios.delete(`/room/${id}`);
  },
  addUserToGroup: ({ roomId, userIds }) => {
    return axios.put(`/room/add-members/${roomId}`, userIds);
  },
  deleteUserFromGroup: ({ roomId, userIds }) => {
    return axios.delete(`/room/delete-members/${roomId}`, { data: userIds });
  },
  addAdminToGroup: ({ roomId, userIds }) => {
    return axios.put(`/room/add-admins/${roomId}`, userIds);
  },
  deleteAdminFromGroup: ({ roomId, userIds }) => {
    return axios.delete(`/room/delete-admins/${roomId}`, { data: userIds });
  },
  // getGroupByUserId: (userId) => {
  //   return axios.get(`rooms/user/${userId}`);
  // },
  // addUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
  //   return axios.put(`/room/add-members/${roomId}`, userIds)
  // },
  // deleteUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
  //   return axios.delete(`/room/delete-members/${roomId}`, { data: userIds })
  // },
};
