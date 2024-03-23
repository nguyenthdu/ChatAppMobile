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

  getListUserMessage: () => {
    return axios.get("/user/users-sidebar");
  },
};
