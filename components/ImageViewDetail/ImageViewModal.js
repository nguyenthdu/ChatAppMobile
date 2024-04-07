import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ImageViewModal = ({ visible, imageUri, onClose }) => {
  console.log("imageUri", imageUri);
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
        <Image source={{ uri: imageUri }} style={styles.modalImage} />
      </View>
    </Modal>
  );
};

export default ImageViewModal;

const styles = StyleSheet.create({
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
});
