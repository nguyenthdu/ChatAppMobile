import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS, SIZES, COLORS } from "../contrains";

export default function Login({ navigation }) {
  // Focus state và hàm setter cho TextInput phone và password
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Hàm xử lý khi TextInput phone được focus hoặc mất focus
  const handlePhoneFocus = () => setIsPhoneFocused(true);
  const handlePhoneBlur = () => setIsPhoneFocused(false);

  // Hàm xử lý khi TextInput password được focus hoặc mất focus
  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);

  const [textPhone, setTextPhone] = React.useState("");
  const [textPassword, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.while }}>
      <View
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
        }}
      >
        <MaterialIcons
          name="arrow-back"
          size={SIZES.padding * 3}
          color="black"
          containerStyle={{ margin: 100 }}
          onPress={() => navigation.navigate("Start")}
        />
      </View>
      <Text
        style={{
          color: COLORS.blue,
          ...FONTS.h2,
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Đăng nhập
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Vui lòng nhập số điện thoại và mật khẩu để đăng nhập vào tài khoản của
        bạn
      </Text>

      {/* TODO: input phone */}
      <TextInput
        placeholder="Nhập số điện thoại"
        value={textPhone}
        onChangeText={(text) => setTextPhone(text)}
        placeholderTextColor={COLORS.gray1}
        selectionColor={COLORS.blue}
        keyboardType="phone-pad"
        onFocus={handlePhoneFocus}
        onBlur={handlePhoneBlur}
        style={{
          height: 48,
          marginTop: 30,
          backgroundColor: COLORS.secondaryWhite,
          color: "#111",
          borderColor: isPhoneFocused ? COLORS.blue : COLORS.gray1,
          borderWidth: 1.5,
          borderRadius: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.body3,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      />
      {/* TextInput for password */}
      <View
        style={{
          flexDirection: "row",
          height: 48,
          marginTop: 20,
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
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={COLORS.gray1}
            style={{
              marginRight: SIZES.padding,
              position: "absolute",
              right: 10,
              top: 12,
            }}
          />
        </Pressable>
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
        onPress={() => {
          navigation.navigate("Home"),
            console.log("phone: ", textPhone, "password: ", textPassword);
        }}
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
            color: COLORS.while,
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
