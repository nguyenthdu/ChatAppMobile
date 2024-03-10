import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";
export default function Start({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Text
        style={{
          marginTop: 100,
          color: COLORS.blue,
          alignSelf: "center",
          ...FONTS.h1,
        }}
      >
        ZALA
      </Text>
      <Image
        source={require("../assets/image/start.png")}
        style={{
          height: SIZES.height * 0.3,
          width: SIZES.width * 0.7,
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
          textAlign: "center",
          ...FONTS.h3,
        }}
      >
        Ứng dụng nhắn số 1 Việt Nam
      </Text>
      <Text
        style={{
          alignSelf: "center",
          textAlign: "center",
          marginTop: 10,
          width: SIZES.width * 0.9,
          ...FONTS.body4,
        }}
      >
        Ứng dụng giúp bạn kết nối với những người xung quanh bạn một cách dễ
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={{
          height: SIZES.height * 0.07,
          width: SIZES.width * 0.7,
          marginTop: 30,
          backgroundColor: COLORS.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZES.radius,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}
        >
          Đăng nhập
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={{
          height: SIZES.height * 0.07,
          width: SIZES.width * 0.7,
          marginTop: 30,
          backgroundColor: COLORS.gray2,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZES.radius,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}
        >
          Tạo tài khoản mới
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={{
          height: SIZES.height * 0.07,
          width: SIZES.width * 0.7,
          marginTop: 30,
          backgroundColor: COLORS.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZES.radius,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}
        >
          Truy cập trang chủ
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
