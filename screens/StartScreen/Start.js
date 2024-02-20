import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import Colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
export default function Start({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.while }}>
      <Text
        style={{
          fontSize: 60,
          color: Colors.blue,
          fontWeight: "bold",
          marginTop: 50,
          fontFamily: Fonts.roboto,
          alignSelf: "center",
        }}
      >
        ZALA
      </Text>
      <Image
        source={require("../../assets/image/start.png")}
        style={{
          height: 300,
          width: "100%",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          color: Colors.black,
          fontFamily: Fonts.roboto,
          alignSelf: "center",
          textAlign: "center",
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        Ứng dụng nhắn số 1 Việt Nam
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.black,
          fontFamily: Fonts.roboto,
          alignSelf: "center",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Ứng dụng giúp bạn kết nối với những người xung quanh bạn một cách dễ
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={{
          marginTop: 100,
          height: 60,
          width: 200,
          backgroundColor: Colors.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: Fonts.roboto,
          }}
        >
          ĐĂNG NHẬP
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={{
          marginTop: 40,
          height: 60,
          width: 200,
          backgroundColor: Colors.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: Fonts.roboto,
          }}
        >
          ĐĂNG KÝ
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
