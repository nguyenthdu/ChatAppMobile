import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Video } from "expo-av";
const CardImage = ({ imageUrl }) => {
  // Kiểm tra là link video hay ảnh
  const isVideo = imageUrl.endsWith(".mp4");
  if (isVideo) {
    console.log("link video: ", imageUrl);
    return (
      <View style={styles.card}>
        <Video
          source={{ uri: imageUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={imageUrl.startsWith("http") ? styles.imageLink : styles.image}
      />
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
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  // hiện kích thước thật của ảnh
  imageLink: {
    width: "100%",
    height: "auto",
    aspectRatio: 1, // Giữ tỷ lệ khung hình của ảnh
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
});