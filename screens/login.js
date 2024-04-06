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
import Loading from "../components/Loading/Loading";
import PressableCustom from "../components/Pressable/PressableCustom";
import { COLORS, FONTS, SIZES } from "../constants";
import { AuthAPI } from "../services/AuthApi";
import { storeCurrentUser, storeTokens } from "../utils/AsyncStorage";
export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);

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
  const [textUserNameError, setUserNameError] = useState("");
  const [textPassword, setPassword] = React.useState("");
  const [textPasswordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkEmptyUserName = () => {
    if (textUserName === "") {
      setUserNameError("Vui lòng nhập tài khoản");
      return false;
    }
    setUserNameError("");
    return true;
  };

  const checkEmptyPassword = () => {
    if (textPassword === "") {
      setPasswordError("Vui lòng nhập mật khẩu");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!checkEmptyUserName() || !checkEmptyPassword()) return;
    // if (loading) return;
    setLoading(true);
    console.log("mấy lần: ");
    try {
      const response = await AuthAPI.login(textUserName, textPassword);
      console.log("Response: ", response.data);
      if (response.data === "Please verify your email first") {
        Alert.alert("Thông báo", response.data);
      }
      // ToastAndroid.show(response.data, ToastAndroid.SHORT);
      // lưu access, refresh token
      const { accessToken, refreshToken } = response.data.tokens;
      await storeTokens(accessToken, refreshToken);
      // lưu user current
      const { user } = response.data;
      await storeCurrentUser(user);
      setLoading(false);
      // console.log("Data: ", response.data);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      // Xử lý lỗi nếu có
      if (error.response) {
        // Request được gửi đi và máy chủ trả về mã lỗi
        console.log("Error:", error.response.data);
        // NotificationCustom.errorLogin();
        Alert.alert("Đăng nhập không thành công", error.response.data.message);
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
      {textUserNameError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {textUserNameError}
        </Text>
      )}
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
      {textPasswordError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {textPasswordError}
        </Text>
      )}

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
      <PressableCustom
        // title={"Đăng nhập"}
        onPress={handleLogin}
        loading={loading}
        marginTop={20}
        height={48}
        width={SIZES.width * 0.9}
        marginHorizontal={SIZES.marginHorizontal}
        backgroundColor={COLORS.blue}
        justifyContent={"center"} //{} có ngoặc (hoặc không) cũng được
        alignItems="center"
        borderRadius={SIZES.padding}
        alignSelf={"center"}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          <Loading loading={loading} title={"Đăng nhập"} />
        </Text>
      </PressableCustom>
    </View>
  );
}

const styles = StyleSheet.create({});
