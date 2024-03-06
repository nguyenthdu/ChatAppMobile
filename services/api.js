// import axios from "axios";
import axios from "../utils/axios-customize";

export const callRegister = (
  username,
  password,
  phone,
  fullName,
  age,
  avatar,
  is_admin
) => {
  return axios.post(`/auth/signUp`, {
    username,
    password,
    phone,
    fullName,
    age,
    avatar,
    is_admin,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/auth/signIn", {
    username,
    password,
  });
};
