import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants";

export default function Logo({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển sang màn hình Home sau 5 giây
      navigation.navigate("Start");
    }, 3000);

    // Xóa hẹn giờ khi component bị unmount để tránh memory leaks
    return () => clearTimeout(timer);
  }, []); // [] ensures that useEffect runs only once after the component mounts

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.blue,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 80,
          fontWeight: "bold",
        }}
      >
        Zala
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
