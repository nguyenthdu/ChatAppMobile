import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { clearTokens } from "../utils/AsyncStorage";

export default function Profile({ navigation }) {
  const handleLogout = async () => {
    await clearTokens();
    // await AuthAPI.logout();
    navigation.navigate("Start");
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "Roboto",
        }}
      >
        Chào mừng bạn đến với ứng dụng nhắn tin Zala
      </Text>
      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: "#0573ff",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => handleLogout()}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            color: "white",
          }}
        >
          Đăng xuất
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
