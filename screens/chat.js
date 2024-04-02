import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { MessageAPI } from "../services/api";
import ChatHeader from "../components/UiChat/chatHeader";
import MessageInput from "../components/UiChat/messageInput";
import useSocket from "../services/useSocket";
import { getUserCurrent } from "../utils/AsyncStorage";

const Chat = ({ route, navigation }) => {
  const { recipient } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageId, setMessageId] = useState(null);

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
  //TODO: Xử lý mở modal
  const handleOpenModal = (item) => {
    setModalVisible(true);
    setMessageId(item.id);
  };
  //TODO: xử lý thu hồi tin nhắn
  const handleRecallMessage = async (id) => {
    // try {
    //   await MessageAPI.removeMessage(id);
    //   setMessages((prevMessages) =>
    //     prevMessages.filter((message) => message.id !== id)
    //   );
    //   setModalVisible(false);
    // } catch (error) {
    //   console.log("Error recalling message: ", error);
    // }
    console.log("Thu hồi tin nhắn", id);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ChatHeader recipient={recipient} navigation={navigation} />
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          ref={flatListRef}
          onContentSizeChange={scrollBottom}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleOpenModal(item)}
              style={[
                styles.messageContainer,
                item.recipientId === recipient.id
                  ? styles.otherMessage
                  : styles.myMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
        <MessageInput
          handleSendMessage={handleSendMessage}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, width: "100%" }}
            onPress={() => setModalVisible(false)}
          />
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => handleRecallMessage(messageId)}>
              <Text style={{ color: "red" }}>Thu hồi tin nhắn</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue" }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
});

export default Chat;
