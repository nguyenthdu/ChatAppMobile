import { Video } from "expo-av";
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
  const isVideo = imageUri.toLowerCase().endsWith(".mp4"); // Chuyển đổi phần mở rộng thành chữ thường trước khi kiểm tra

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
        {isVideo ? ( // Kiểm tra xem có phải là video hay không
          <Video
            useNativeControls
            source={{ uri: imageUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.media}
          />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.modalImage} />
        )}
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
  media: {
    width: "100%", // Đảm bảo rằng nội dung điều chỉnh theo chiều ngang của phần tử cha
    height: "auto", // Tự động tính toán chiều cao dựa trên tỷ lệ chiều rộng
    aspectRatio: 16 / 9, // Giữ tỷ lệ khung hình của nội dung, bạn có thể điều chỉnh theo ý muốn
    resizeMode: "contain", // Hiển thị nội dung mà không làm biến dạng
    borderRadius: 10,
    marginBottom: 10,
  },
});
