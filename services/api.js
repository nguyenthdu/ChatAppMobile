// import axios from "axios";
import axios from "../utils/axios-customize";

// author
export const AuthAPI = {
  register: (username, password, phone, fullName, age, avatar, is_admin) => {
    return axios.post(`/auth/signUp`, {
      username,
      password,
      phone,
      fullName,
      age,
      avatar,
      is_admin,
    });
  },

  login: (username, password) => {
    return axios.post("/auth/signIn", {
      username,
      password,
    });
  },
};

// get thong tin người dùng
export const UserAPI = {};

// Các API để gửi tin nhắn, nhận tin nhắn và lấy lịch sử tin nhắn trong các cuộc trò chuyện.
export const MessageAPI = {
  getListUserMessage: () => {
    return axios.get("/user/users-sidebar");
  },
};

// Các API để tạo phòng chat, tham gia phòng chat, rời khỏi phòng chat, lấy danh sách các phòng chat có sẵn
export const RoomAPI = {};
