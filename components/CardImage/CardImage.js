import { Video } from "expo-av";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const CardImage = ({ imageUrl }) => {
  // Kiểm tra xem nội dung là link video hay ảnh
  const isVideo = imageUrl.toLowerCase().endsWith(".mp4"); // Chuyển đổi tất cả thành chữ thường trước khi kiểm tra

  return (
    <View style={styles.card}>
      {isVideo ? ( // Nếu là video, hiển thị Video component
        <Video
          source={{ uri: imageUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={styles.media}
        />
      ) : (
        // Nếu là ảnh, hiển thị Image component
        <Image source={{ uri: imageUrl }} style={styles.media} />
      )}
    </View>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
