import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NotificationCustom } from "../components/notification/notification";
import { COLORS, FONTS, SIZES } from "../constants";
import { AuthAPI } from "../services/api";

export default function RegisterPassword({ navigation, route }) {
  // Lấy dữ liệu từ màn hình Register
  const { avatar, userName, fullName, email, phone } = route.params;

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isRePasswordFocused, setIsRePasswordFocused] = useState(false);
  const [textPassword, setPassword] = useState("");
  const [textRePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);

  const handleRePasswordFocus = () => setIsRePasswordFocused(true);
  const handleRePasswordBlur = () => setIsRePasswordFocused(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePasswords = () => {
    if (
      textPassword.length < 6 ||
      textPassword.length > 32 ||
      textPassword.match(/[^a-zA-Z0-9]/) ||
      textRePassword.match(/[^a-zA-Z0-9]/)
    ) {
      setPasswordError(
        "Mật khẩu phải từ 6 đến 32 ký tự và không được chứa ký tự đặc biệt"
      );
      return false;
    }
    if (textPassword !== textRePassword) {
      setPasswordError("Mật khẩu không khớp.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      const response = await AuthAPI.register(
        userName,
        textPassword,
        phone,
        email,
        fullName,
        avatar
      );
      NotificationCustom.successRegister();
      // Xử lý dữ liệu trả về từ API nếu cần
      console.log(">>> check", response.data);
      navigation.navigate("Login");
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.response) {
        // Request được gửi đi và máy chủ trả về mã lỗi
        console.log("Error:", error.response.data);
        Alert.alert("Đăng ký không thành công", error.response.data.message);
      } else if (error.request) {
        // Request được gửi đi nhưng không có phản hồi từ máy chủ
        console.error("Error:", error.request);
      } else {
        // Có lỗi xảy ra khi thiết lập request
        console.error("Error:", error.message);
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
          onPress={() => navigation.navigate("Register")}
        />
        <Text
          style={{
            marginLeft: "10%",
            color: COLORS.blue,
            ...FONTS.h2,
            marginHorizontal: SIZES.marginHorizontal,
            textAlign: "center",
          }}
        >
          Đăng ký tài khoản
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Nhập mật khẩu của bạn
      </Text>

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
          secureTextEntry={showPassword}
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
          onPress={handlePasswordVisibility}
          style={{
            flex: 1,
            position: "absolute",
            marginRight: SIZES.padding,
            right: 10,
            top: 12,
          }}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={COLORS.gray1}
          />
        </TouchableOpacity>
      </View>
      {/*TODO: Re-enter the password*/}
      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          ...FONTS.body3,
        }}
      >
        Nhập lại mật khẩu
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
          placeholder="Nhập lại mật khẩu"
          value={textRePassword}
          onChangeText={(text) => setRePassword(text)}
          placeholderTextColor={COLORS.gray1}
          selectionColor={COLORS.blue}
          secureTextEntry={showPassword}
          onFocus={handleRePasswordFocus}
          onBlur={handleRePasswordBlur}
          //không được nhập khoảng trắng

          style={{
            flex: 1,
            height: "100%",
            backgroundColor: COLORS.secondaryWhite,
            color: "#111",
            borderColor: isRePasswordFocused ? COLORS.blue : COLORS.gray1,
            borderWidth: 1.5,
            borderRadius: SIZES.padding,
            paddingLeft: SIZES.padding,
            ...FONTS.body3,
          }}
        />
        {/* Icon to toggle password visibility */}
        <TouchableOpacity
          onPress={handlePasswordVisibility}
          style={{
            flex: 1,
            position: "absolute",
            marginRight: SIZES.padding,
            right: 10,
            top: 12,
          }}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={COLORS.gray1}
          />
        </TouchableOpacity>
      </View>

      {passwordError !== "" && (
        <Text
          style={{ color: "red", marginHorizontal: SIZES.marginHorizontal }}
        >
          {passwordError}
        </Text>
      )}

      {/* TODO: Đăng nhập thành công truy cập vào trang chủ */}
      <Pressable
        onPress={handleRegister}
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
          Đăng ký
        </Text>
      </Pressable>
    </View>
  );
}
