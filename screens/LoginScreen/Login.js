import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import Colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
export default function Login({ navigation }) {
  const [textPhone, setTextPhone] = React.useState("");
  const [textPassword, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.while }}>
      <View
        style={{
          height: 50,
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
          Đăng nhập
        </Text>
      </View>
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: Colors.gray,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "black",
            fontFamily: Fonts.roboto,
            marginLeft: 10,
          }}
        >
          Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
        </Text>
      </View>
      {/* TODO: input phone */}
      <TextInput
        mode="outlined"
        label="Số điện thoại"
        value={textPhone}
        onChangeText={(textPhone) => setTextPhone(textPhone)}
        outlineStyle={{ borderColor: Colors.blue }}
        activeOutlineColor={Colors.blue}
        right={<TextInput.Icon icon="close" onPress={() => setTextPhone("")} />}
        style={{
          height: 60,
          margin: 10,
          backgroundColor: "white",
          fontSize: 20,
          fontFamily: Fonts.roboto,
          color: Colors.black,
        }}
      />
      <TextInput
        mode="outlined"
        label="Mật khẩu"
        value={textPassword}
        onChangeText={(textPassword) => setPassword(textPassword)}
        outlineStyle={{ borderColor: Colors.blue }}
        activeOutlineColor={Colors.blue}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon="eye"
            name={showPassword ? "eye-off" : "eye"}
            onPress={handlePasswordVisibility}
          />
        }
        style={{
          height: 60,
          margin: 10,
          backgroundColor: "white",
          fontSize: 20,
          fontFamily: Fonts.roboto,
          color: Colors.black,
        }}
      />
      <Pressable
        style={{
          margin: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: Colors.blue,
            fontFamily: Fonts.roboto,
          }}
        >
          Lấy lại mật khẩu?
        </Text>
      </Pressable>
      {/* TODO: Đăng nhập thành công truy cập vào trang chủ */}
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={{
          marginTop: 20,
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
            fontSize: 20,
            color: "white",
            fontFamily: Fonts.roboto,
          }}
        >
          Đăng nhập
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
