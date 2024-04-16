import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChatContext } from "../hooks/AppProvider";
import { getTokens } from "../utils/AsyncStorage";
import { baseMessage, baseUrl } from "../utils/containUrl";

const useSocket = (props) => {
  const { messages, setMessages } = useChatContext();
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
        console.log("New message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on("group-message", (newMessage) => {
        console.log("New group newMessage:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      newSocket.on("create-group", (group) => {
        console.log("New group created:", group);
      });

      setSocket(newSocket); // Lưu trữ socket trong state

      // off
      return () => {
        newSocket.off(baseMessage);
        newSocket.off("group-message");
        newSocket.off("create-group");
        newSocket.disconnect();
      };
    }
  }, [token, messages]);

  // Hàm gửi yêu cầu tạo nhóm
  const createGroup = (group) => {
    if (socket) {
      socket.emit("create-group", group);
    }
  };

  const sendMessage = (newMessage) => {
    if (socket) {
      socket.emit(baseMessage, newMessage);
    }
  };

  const sendMessageGroup = (newMessage) => {
    if (socket) {
      socket.emit("group-message", newMessage);
    }
  };

  return { sendMessage, createGroup, sendMessageGroup };
};

export default useSocket;
