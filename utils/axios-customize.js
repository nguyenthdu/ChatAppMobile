import axios from "axios";

// 192.168.1.187 là IPv4 address của máy, thay đổi để test

const instance = axios.create({
  baseURL: "http://192.168.1.3:3000",
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
