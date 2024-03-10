import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";

export default function Chat({ route }) {
  const { conversation } = route.params; // Lấy dữ liệu của cuộc trò chuyện từ props

  // Khai báo state để lưu tin nhắn
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Kết nối với socket khi màn hình được render
  useEffect(() => {
    const socket = io("http://localhost:4000"); // Thay YOUR_SOCKET_SERVER_URL bằng địa chỉ socket server của bạn

    // Lắng nghe sự kiện nhận tin nhắn từ server
    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    // Return hàm cleanup để ngắt kết nối khi màn hình unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    // Gửi tin nhắn đến server
    // Thông thường, bạn sẽ gửi tin nhắn lên server để nó chuyển đến các người dùng khác trong cuộc trò chuyện
    // Ở đây, chúng ta chỉ cập nhật giao diện người dùng mà không gửi thực sự tin nhắn đi
    setMessages([...messages, { content: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 10 }}>
        {/* Hiển thị cuộc trò chuyện */}
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === "me" ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          )}
        />
        {/* Phần nhập tin nhắn */}
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            style={styles.input}
            placeholder="Type your message..."
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
