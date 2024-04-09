import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getTokens } from "../utils/AsyncStorage";
import { baseMessage, baseUrl } from "../utils/containUrl";

const useSocket = (props) => {
  // đáng nhẽ phải là messages
  const { setMessages, messages } = props;
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  const getAccessToken = async () => {
    const { accessToken } = await getTokens();
    setToken(accessToken);
  };

  useEffect(() => {
    getAccessToken();
  }, []); // Sử dụng useEffect để lấy accessToken khi chọn vào 1 chat

  useEffect(() => {
    if (token) {
      const newSocket = io(baseUrl, {
        query: {
          token: token,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.on(baseMessage, (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket); // Lưu trữ socket trong state
    }
  }, [token, messages]);

  const sendMessage = (newMessage) => {
    if (socket) {
      socket.emit(baseMessage, newMessage);
    }
  };

  return { sendMessage };
};

export default useSocket;
