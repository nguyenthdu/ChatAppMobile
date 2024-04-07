import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UploadAPI } from "../../services/UserApi";
import ImageViewModal from "../ImageViewDetail/ImageViewModal";

const MessageInput = ({
  setNewMessage,
  newMessage,
  handleSendMessage,
  currentUser,
  recipient,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("messages: ", newMessage);
  }, [newMessage]);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets);
      setLoading(true);

      const res = await UploadAPI.uploadImage(result.assets);
      console.log("res: ", res.data);
      if (res?.data?.imageUrl) {
        setNewMessage(res.data.imageUrl);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error uploading image:", res);
      }
    } else {
      setLoading(false);
      console.log("Image selection cancelled or result.assets undefined");
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //TODO:  xử lý chọn file
  const selectDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      setSelectedDocument(result.assets);
      console.log("result: ", result.assets[0]);
      setLoading(true);

      const res = await UploadAPI.uploadDocument(
        result.assets,
        currentUser.id,
        recipient.id
      );
      console.log("res: ", res);
      if (res?.data) {
        setNewMessage(res.data.imageUrl);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error uploading document:", res);
      }
    } else {
      setLoading(false);
      console.log("Document selection cancelled or result.assets undefined");
    }
  };

  return (
    <>
      {/* Hiển thị hình ảnh đã chọn */}
      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={{ uri: selectedImage[0].uri }}
              style={styles.selectedImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteImageButton}
            onPress={() => setSelectedImage(null)}
          >
            <MaterialIcons name="cancel" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleUploadImage}>
          <Text style={styles.imageButton}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectDocument}>
          <Text style={styles.documentButton}>📁</Text>
        </TouchableOpacity>
        <TextInput
          value={newMessage.startsWith("http") ? "" : newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={styles.input}
          placeholder="Tin nhắn"
          onSubmitEditing={() => {
            handleSendMessage();
            setSelectedImage(null);
          }}
        />
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            handleSendMessage();
            setSelectedImage(null);
          }}
          style={styles.sendButton}
        >
          <MaterialIcons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      <ImageViewModal
        visible={isModalVisible}
        imageUri={selectedImage ? selectedImage[0].uri : ""}
        onClose={toggleModal}
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  deleteImageButton: {
    marginLeft: -10,
    marginTop: -10,
  },
});

export default MessageInput;
