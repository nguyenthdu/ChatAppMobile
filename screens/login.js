import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { callLogin } from "../services/api";

export default function Login({ navigation }) {
  // Focus state và hàm setter cho TextInput UserName và password
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Hàm xử lý khi TextInput UserName được focus hoặc mất focus
  const handleUserNameFocus = () => setIsUserNameFocused(true);
  const handleUserNameBlur = () => setIsUserNameFocused(false);

  // Hàm xử lý khi TextInput password được focus hoặc mất focus
  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);

  const [textUserName, setUserName] = React.useState("");
  const [textPassword, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await callLogin(textUserName, textPassword);
      // chưa xử lý lưu access token
      console.log(response.data);
      navigation.navigate("Home");
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.response) {
        // Request được gửi đi và máy chủ trả về mã lỗi
        console.log("Error:", error.response.data);
        Alert.alert(
          "Đăng nhập không thành công",
          `Mật khẩu hoặc tài khoản không đúng`
        );
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="arrow-back"
          size={SIZES.padding * 3}
          color="black"
          containerStyle={{ margin: 100 }}
          onPress={() => navigation.navigate("Start")}
        />
        <Text
          style={{
            marginLeft: "20%",
            color: COLORS.blue,
            ...FONTS.h2,
            marginHorizontal: SIZES.marginHorizontal,
            textAlign: "center",
          }}
        >
          Đăng nhập
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Vui lòng nhập tài khoản và mật khẩu để đăng nhập
      </Text>
      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          ...FONTS.body3,
        }}
      >
        Tài khoản
      </Text>
      {/* TODO: input UserName */}
      <TextInput
        placeholder="Nhập tài khoản của bạn"
        value={textUserName}
        onChangeText={(text) => setUserName(text)}
        placeholderTextColor={COLORS.gray1}
        selectionColor={COLORS.blue}
        onFocus={handleUserNameFocus}
        onBlur={handleUserNameBlur}
        style={{
          height: 48,
          marginTop: 10,
          backgroundColor: COLORS.secondaryWhite,
          color: "#111",
          borderColor: isUserNameFocused ? COLORS.blue : COLORS.gray1,
          borderWidth: 1.5,
          borderRadius: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.body3,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      />
      {/* TextInput for password */}
      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          ...FONTS.body3,
        }}
      >
        Mật khẩu
      </Text>
      <View
        style={{
          flexDirection: "row",
          height: 48,
          marginTop: 10,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      >
        <TextInput
          placeholder="Nhập mật khẩu"
          value={textPassword}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={COLORS.gray1}
          selectionColor={COLORS.blue}
          secureTextEntry={!showPassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: COLORS.secondaryWhite,
            color: "#111",
            borderColor: isPasswordFocused ? COLORS.blue : COLORS.gray1,
            borderWidth: 1.5,
            borderRadius: SIZES.padding,
            paddingLeft: SIZES.padding,
            ...FONTS.body3,
          }}
        />
        {/* Icon to toggle password visibility */}
        <TouchableOpacity
          style={{
            flex: 1,
            position: "absolute",
            marginRight: SIZES.padding,
            right: 10,
            top: 12,
          }}
          onPress={handlePasswordVisibility}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={COLORS.gray1}
          />
        </TouchableOpacity>
      </View>

      <Pressable
        style={{
          margin: 10,
        }}
      >
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.blue,
            marginTop: 10,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          Lấy lại mật khẩu?
        </Text>
      </Pressable>
      {/* TODO: Đăng nhập thành công truy cập vào trang chủ */}
      <Pressable
        onPress={handleLogin}
        style={{
          marginTop: 20,
          height: 48,
          width: SIZES.width * 0.9,
          marginHorizontal: SIZES.marginHorizontal,
          backgroundColor: COLORS.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZES.padding,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          Đăng nhập
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
