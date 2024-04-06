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
