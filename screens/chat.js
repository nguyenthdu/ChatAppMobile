// File: Chat.js
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { COLORS } from "../constants";
import { MessageAPI } from "../services/api";

import useSocket from "../services/useSocket";
import { getUserCurrent } from "../utils/AsyncStorage";

const Chat = ({ route, navigation }) => {
  const { recipient } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef(null);
  const { sendMessage } = useSocket({ setMessages });

  const scrollBottom = () => {
    flatListRef.current.scrollToEnd({ animated: false });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const me = JSON.parse(await getUserCurrent());
      setCurrentUser(me);
      fetchMessages(me);
    } catch (error) {
      console.log("Error fetching current user: ", error);
    }
  };

  const fetchMessages = async (currentUser) => {
    try {
      const response = await MessageAPI.getListOneUserMessage(
        currentUser.id,
        recipient.id
      );
      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching messages: ", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !currentUser) {
      return;
    }

    const newMessageSendServer = {
      text: newMessage,
      userId: currentUser.id,
      recipientId: recipient.id,
      created_at: new Date(),
      user: currentUser,
    };

    sendMessage(newMessageSendServer);

    setMessages((prevMessages) => [...prevMessages, newMessageSendServer]);

    setNewMessage("");
    scrollBottom();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={[{ marginRight: 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.username}>{recipient.username}</Text>
        </View>
        <View style={styles.callButtons}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="call-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="videocam-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* End Header */}

      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          ref={flatListRef}
          onContentSizeChange={scrollBottom}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.recipientId === recipient.id
                  ? styles.otherMessage
                  : styles.myMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            style={styles.input}
            placeholder="Type your message..."
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    backgroundColor: COLORS.blue,
  },
  username: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  callButtons: {
    flexDirection: "row",
  },
  iconContainer: {
    marginLeft: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
  },
  otherMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
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
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
