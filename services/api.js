// import axios from "axios";
import axios from "../utils/axios-customize";

// author
export const AuthAPI = {
  register: (username, password, phone, email, fullName, avatar) => {
    return axios.post(`/auth/signUp`, {
      username,
      password,
      phone,
      email,
      fullName,
      avatar,
      is_verify: true,
      is_admin: true,
    });
  },

  login: (username, password) => {
    return axios.post("/auth/signIn", {
      username,
      password,
    });
  },

  logout: () => {
    // return axios.post("/auth/signOut");
  },
};

// get thong tin người dùng
export const UserAPI = {};

// Các API để gửi tin nhắn, nhận tin nhắn và lấy lịch sử tin nhắn trong các cuộc trò chuyện.
export const MessageAPI = {
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

  getListOneUserMessage: (currentUserId, recipientId) => {
    return axios.get(`/messages/${currentUserId}/${recipientId}`);
  },
};

// Các API để tạo phòng chat, tham gia phòng chat, rời khỏi phòng chat, lấy danh sách các phòng chat có sẵn
export const RoomAPI = {};
