import axios from "../utils/axios-customize";

export const FriendAPI = {
  getListFriends: (userCurrentId) => {
    return axios.get(`/user/get-friends?userId=${userCurrentId}`);
  },
  findUserByPhone: (phone) => {
    return axios.get(`/user/search-user/${phone}`);
  },
  sendFriendRequest: (receiverId) => {
    return axios.post(`/user/send-friend-request`, { receiverId });
  },
  acceptFriendRequest: ({ senderId }) => {
    return axios.post(`/user/accept-friend-request`, { senderId });
  },
  deleteFriendRequest: ({ senderId }) => {
    return axios.post("/user/delete-friend-request", { senderId });
  },
  cancelFriendRequest: ({ receiverId }) => {
    return axios.post("/user/cancel-friend-request", { receiverId });
  },
  getListFriendRequestPending: (userCurrentId) => {
    return axios.get(`/user/get-list-friend-request-pending?userId=${userCurrentId}`);
  },
  getListUserMessage: () => {
    return axios.get("/user/users-sidebar");
  },
};
