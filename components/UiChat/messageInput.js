import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants";
import * as ImagePicker from "expo-image-picker";

const MessageInput = ({ setNewMessage, newMessage, handleSendMessage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.imageButton}>📷</Text>
      </TouchableOpacity>
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        style={styles.input}
        placeholder="Tin nhắn"
        onSubmitEditing={handleSendMessage}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Gửi</Text>
      </TouchableOpacity>

      {/* Hiển thị hình ảnh đã chọn */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}
    </View>
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
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  imageButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default MessageInput;
