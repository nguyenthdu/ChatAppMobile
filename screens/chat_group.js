import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardFile from "../components/CardFile/CardFile";
import CardImage from "../components/CardImage/CardImage";
import ImageViewModal from "../components/ImageViewDetail/ImageViewModal";
import ChatHeader from "../components/UiChat/chatHeader";
import MessageInput from "../components/UiChat/messageInput";
import { useChatContext } from "../hooks/AppProvider";
import { ChatAPI, chatGroupAPI } from "../services/ChatApi";
import useSocket from "../services/useSocket";

const ChatGroup = ({ route, navigation }) => {
  const { group, currentUser } = route.params;
  const { messages, setMessages } = useChatContext();
  const { sendMessage, sendMessageGroup } = useSocket();

  const [newMessage, setNewMessage] = useState("");
  // const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageDeleted, setMessageDeleted] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = (imageUri) => {
    if (!isModalVisible) {
      setSelectedImage(imageUri);
    }
    setIsModalVisible(!isModalVisible);
  };

  const scrollBottom = () => {
    flatListRef.current.scrollToEnd({ animated: false });
  };

  useEffect(() => {
    // fetchCurrentUser();
    fetchMessages();
  }, []);

  // const fetchCurrentUser = async () => {
  //   try {
  //     const me = JSON.parse(await getUserCurrent());
  //     setCurrentUser(me);
  //     fetchMessages(me);
  //   } catch (error) {
  //     console.log("Error fetching current user: ", error);
  //   }
  // };

  const fetchMessages = async () => {
    try {
      const response = await chatGroupAPI.getMessageGroup(group.id);
      console.log("res message group: ", response.data);
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
      roomId: group.id,
      recipientId: group.id,
      created_at: new Date(),
      user: currentUser,
    };

    // gọi method của socket
    sendMessageGroup(newMessageSendServer);

    setMessages((prevMessages) => [...prevMessages, newMessageSendServer]);

    setNewMessage("");
    scrollBottom();
  };
  //TODO: Xử lý mở modal
  const handleOpenModal = (item) => {
    setModalVisible(true);
    setMessageDeleted(item);
  };
  //TODO: xử lý thu hồi tin nhắn
  const handleRecallMessage = async () => {
    console.log("messageDeleted", messageDeleted);
    try {
      const res = await ChatAPI.removeMessage(messageDeleted);
      console.log("res", res.data);
      if (res.data) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageDeleted.id)
        );
        setModalVisible(false);
      } else {
        console.log("Failed to recall message");
      }
    } catch (error) {
      console.log("Error recalling message: ", error);
    }
  };

  // kiểm tra xem link có phải là ảnh không
  const isImageLink = (text) => {
    return text.match(/\.(jpeg|jpg|gif|png|mp4)$/) != null;
  };

  // check link có phải file không
  const isFileLink = (text) => {
    return text.match(/\.(txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/) != null;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ChatHeader group={group} navigation={navigation} />
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          ref={flatListRef}
          onContentSizeChange={scrollBottom}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (isImageLink(item.text)) {
              return (
                <TouchableOpacity
                  onLongPress={() => handleOpenModal(item)}
                  style={[
                    styles.messageContainer,
                    {
                      alignSelf:
                        item.user.id === currentUser?.id
                          ? "flex-end"
                          : "flex-start",
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => toggleModal(item.text)}>
                    <CardImage imageUrl={item.text} />
                    {/**<Image
                      source={{ uri: item.text }}
                      style={styles.messageImage}
                />*/}
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            } else if (isFileLink(item.text)) {
              return (
                <TouchableOpacity
                  onLongPress={() => handleOpenModal(item)}
                  style={[
                    styles.messageContainer,
                    {
                      alignSelf:
                        item.user.id === currentUser?.id
                          ? "flex-end"
                          : "flex-start",
                    },
                  ]}
                >
                  <CardFile fileName={item.text} />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onLongPress={() => handleOpenModal(item)}
                  style={[
                    styles.messageContainer,
                    item.user.id === currentUser?.id
                      ? styles.otherMessage
                      : styles.myMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />

        <MessageInput
          handleSendMessage={handleSendMessage}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          currentUser={currentUser}
          recipient={group}
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
            <TouchableOpacity onPress={() => handleRecallMessage()}>
              <Text style={{ color: "red" }}>Thu hồi tin nhắn</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                backgroundColor: "#EAEAEA",
                marginVertical: 10,
              }}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue" }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ImageViewModal
        visible={isModalVisible}
        imageUri={selectedImage ? selectedImage : ""}
        onClose={toggleModal}
      />
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
    fontSize: 18,
  },
  messageImage: {
    width: 100,
    height: 200,
    objectFit: "contain",
    borderRadius: 10,
  },
});

export default ChatGroup;
