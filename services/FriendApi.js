import axios from "../utils/axios-customize";

export const FriendAPI = {
  findUserByPhone: (phone) => {
    return axios.get(`/user/search-user/${phone}`);
  },

  sendFriendRequest: (senderId, receiverId) => {
    return axios.post(`/user/send-friend-request`, { receiverId });
  },

  acceptFriendRequest: (senderId, receiverId) => {
    return axios.post(`/user/accept-friend-request`, { senderId });
  },

  getListFriendRequestPending: () => {
    return axios.get(`/user/get-list-friend-request-pending`);
  },

  getListFriends: () => {
    return axios.get(`/user/get-friends`);
  },

  getListUserMessage: () => {
    return axios.get("/user/users-sidebar");
  },
};
