import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useChatContext } from "../../hooks/AppProvider";
import { UploadAPI } from "../../services/UserApi";
import CardFile from "../CardFile/CardFile";
import CardImage from "../CardImage/CardImage";
import ImageViewModal from "../ImageViewDetail/ImageViewModal";

const MessageInput = ({
  setNewMessage,
  newMessage,
  handleSendMessage,
  currentUser,
  recipient,
}) => {
  const { messages, setMessages } = useChatContext();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataImageDetail, setDataImageDetail] = useState(null);

  const handleSelectedImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets);
    } else {
      console.log("Image selection cancelled or result.assets undefined");
    }
  };

  //TODO:  xử lý chọn file
  const handleSelectDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      console.log("Image selected: ", result.assets);

      setSelectedDocument(result.assets);
    } else {
      console.log("Document selection cancelled or result.assets undefined");
    }
  };

  const handleUploadFile = async (type) => {
    setLoading(true);
    let res = null;

    try {
      if (type === "image") {
        res = await UploadAPI.uploadFile(
          selectedImage,
          currentUser.id,
          recipient.id,
          type
        );
      } else {
        console.log("Document selected: ", selectedDocument);
        res = await UploadAPI.uploadFile(
          selectedDocument,
          currentUser.id,
          recipient.id,
          type
        );
      }

      if (res?.data) {
        const newMessageSendServer = res.data.map((url) => ({
          text: url,
          userId: currentUser.id,
          recipientId: recipient.id,
          created_at: new Date(),
          user: currentUser,
        }));

        setMessages((prevMessages) => [
          ...prevMessages,
          ...newMessageSendServer,
        ]);
        setSelectedImage(null);
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (selectedImage) {
      handleUploadFile("image");
    } else if (selectedDocument) {
      handleUploadFile("document");
    } else {
      handleSendMessage();
    }
  };

  const toggleModal = (url) => {
    setDataImageDetail(url);
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = (type, uri) => {
    if (type === "image") {
      const updatedImages = [...selectedImage];
      updatedImages.splice(uri, 1);
      setSelectedImage(updatedImages);
    } else if (type === "document") {
      const updatedDocuments = [...selectedDocument];
      updatedDocuments.splice(uri, 1);
      setSelectedDocument(updatedDocuments);
    }
  };

  return (
    <>
      {/* Hiển thị hình ảnh đã chọn */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView
            horizontal
            contentContainerStyle={styles.selectedImageContainer}
            style={{ width: "100%" }} // Đảm bảo chiều rộng cố định cho ScrollView
          >
            {selectedImage &&
              selectedImage.map((image, index) => (
                <TouchableOpacity
                  onPress={() => toggleModal(image.uri)}
                  key={index}
                  style={{
                    marginRight: 5,
                    width: 100,
                    height: 100,
                    marginRight: 20,
                  }} // Thiết lập kích thước cố định cho hình ảnh
                >
                  <CardImage imageUrl={image.uri} />
                  <TouchableOpacity
                    style={styles.deleteImageButton}
                    onPress={() => handleDelete("image", image.uri)} // Thêm hàm xử lý xóa hình ảnh khi được nhấn
                  >
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

            {selectedDocument &&
              selectedDocument.map((document, index) => (
                <TouchableOpacity key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      height: 50,
                      marginBottom: 15,
                      marginRight: 20,
                    }}
                  >
                    <CardFile fileName={document.name} />
                    <TouchableOpacity
                      style={styles.deleteDocumentButton}
                      onPress={() => handleDelete("document", document.uri)} // Thêm hàm xử lý xóa document khi được nhấn
                    >
                      <MaterialIcons name="cancel" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>

          {/* {selectedDocument && (
            <View style={styles.selectedImageContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <CardFile fileName={selectedDocument[0].name} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteImageButton}
                onPress={() => setSelectedDocument(null)}
              >
                <MaterialIcons name="cancel" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )} */}
        </>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSelectedImage}>
          <Text style={styles.imageButton}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectDocument}>
          <Text style={styles.documentButton}>📁</Text>
        </TouchableOpacity>
        <TextInput
          value={newMessage.startsWith("http") ? "" : newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={styles.input}
          placeholder="Tin nhắn"
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          disabled={loading}
          onPress={() => handleSend()}
          style={styles.sendButton}
        >
          <MaterialIcons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      <ImageViewModal
        visible={isModalVisible}
        imageUri={dataImageDetail ? dataImageDetail : ""}
        onClose={() => toggleModal(null)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  selectedImage: {
    height: 100,
    width: 100,
    padding: 10,
    borderRadius: 10,
  },
  documentButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
  modalImage: {
    height: "80%",
    width: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  selectedImageContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    margin: 10,
    marginBottom: 10,
  },
  deleteImageButton: {
    marginLeft: 80,
    marginTop: -85,
  },
  deleteDocumentButton: {
    marginLeft: -15,
    marginTop: -20,
  },
});

export default MessageInput;
