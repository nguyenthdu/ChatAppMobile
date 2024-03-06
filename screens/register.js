import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import ImagePickerComponent from "../components/image_picker";
import { COLORS, FONTS, SIZES } from "../constants";

export default function Register({ navigation }) {
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [textUsername, setTextUsername] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const handleUsernameFocus = () => setIsUsernameFocused(true);
  const handleUsernameBlur = () => setIsUsernameFocused(false);

  const handlePhoneFocus = () => setIsPhoneFocused(true);
  const handlePhoneBlur = () => setIsPhoneFocused(false);

  const handleImageSelect = (imageUri) => {
    setAvatar(imageUri); // Cập nhật đường dẫn của hình ảnh được chọn
  };

  const validateAvatar = () => {
    if (avatar === null) {
      setAvatarError("Vui lòng chọn ảnh đại diện.");
      return false;
    }
    setAvatarError("");
    return true;
  };
  const validateUsername = () => {
    if (textUsername.length < 3 || textUsername.length > 32) {
      setUsernameError("Họ và tên phải từ 3 đến 32 ký tự.");
      return false;
    }
    // Kiểm tra ký tự đặc biệt
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(textUsername)) {
      setUsernameError("Họ và tên không được chứa ký tự đặc biệt.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePhone = () => {
    if (textPhone.length !== 10 || !textPhone.startsWith("0")) {
      setPhoneError("Số điện thoại phải có 10 ký tự và bắt đầu bằng số 0.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleRegister = () => {
    if (!validateAvatar() || !validateUsername() || !validatePhone()) {
      return;
    }
    console.log("avatar: ", avatar);
    console.log("Họ và tên: ", textUsername);
    console.log("Số điện thoại: ", textPhone);
    navigation.navigate("RegisterPassword", {
      avatar,
      username: textUsername,
      phone: textPhone,
    });
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
          onPress={() => navigation.navigate("Start")}
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
        Nhập họ tên và số điện thoại của bạn
      </Text>

      {/*TODO: avatar */}
      <ImagePickerComponent onImageSelect={handleImageSelect} />
      {avatarError !== "" && (
        <Text
          style={{
            textAlign: "center",
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {avatarError}
        </Text>
      )}
      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          ...FONTS.body3,
        }}
      >
        Họ và tên
      </Text>
      <TextInput
        placeholder="Nhập họ và tên"
        value={textUsername}
        onChangeText={(text) => setTextUsername(text)}
        placeholderTextColor={COLORS.gray1}
        selectionColor={COLORS.blue}
        keyboardType="default"
        onFocus={handleUsernameFocus}
        onBlur={handleUsernameBlur}
        style={{
          height: 48,
          marginTop: 10,
          backgroundColor: COLORS.secondaryWhite,
          color: "#111",
          borderColor: isUsernameFocused ? COLORS.blue : COLORS.gray1,
          borderWidth: 1.5,
          borderRadius: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.body3,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      />
      {usernameError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {usernameError}
        </Text>
      )}

      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          ...FONTS.body3,
        }}
      >
        Số điện thoại
      </Text>
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
          marginTop: 10,
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
      {phoneError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {phoneError}
        </Text>
      )}

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
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Tiếp tục</Text>
      </Pressable>
    </View>
  );
}
