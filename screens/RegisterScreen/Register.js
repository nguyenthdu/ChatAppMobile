import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
export default function Register({ navigation }) {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: Colors.while,
      }}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          backgroundColor: Colors.blue,
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Start")}>
          <Image
            style={{ height: 40, width: 40, marginLeft: 10 }}
            source={require("../../assets/icon/arrow-left-white.png")}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: Fonts.roboto,
            marginLeft: 10,
          }}
        >
          Tạo tài khoản
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
