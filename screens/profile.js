import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

export default function Profile({ navigation }) {
  // Replace these with actual data
  const user = {
    image:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg", // URL of the user's image
    fullName: "John Doe", // User's full name
    age: 30, // User's age
    phone: "123-456-7890", // User's phone number
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <Text style={styles.text}>{user.fullName}</Text>
      <Text style={styles.text}>{user.age}</Text>
      <Text style={styles.text}>{user.phone}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Start")}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    marginTop: 50,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "black",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0573ff",
    padding: 10,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 150,
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "white",
  },
});
