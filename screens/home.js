import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Home({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        onPress={() => navigation.navigate("Start")}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            color: "white",
          }}
        >
          Quay lại trang bắt đầu
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
