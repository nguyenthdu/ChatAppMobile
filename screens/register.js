import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import ImagePickerComponent from "../components/image_picker";
import { COLORS, FONTS, SIZES } from "../constants";

export default function Register({ navigation }) {
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isFullNameFocused, setIsFullNameFocused] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [textFullName, setTextFullName] = useState("");
  const [textUserName, setTextUserName] = useState("");
  const [FullNameError, setFullNameError] = useState("");
  const [UserNameError, setUserNameError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const handleFullNameFocus = () => setIsFullNameFocused(true);
  const handleFullNameBlur = () => setIsFullNameFocused(false);

  const handleUserNameFocus = () => setIsUserNameFocused(true);
  const handleUserNameBlur = () => setIsUserNameFocused(false);

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
  const validateFullName = () => {
    if (textFullName.length < 3 || textFullName.length > 32) {
      setFullNameError("Họ và tên phải từ 3 đến 32 ký tự.");
      return false;
    }
    // Kiểm tra ký tự đặc biệt
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(textFullName)) {
      setFullNameError("Họ và tên không được chứa ký tự đặc biệt.");
      return false;
    }
    setFullNameError("");
    return true;
  };

  const validateUserName = () => {
    if (textUserName.length < 8 || textUserName.length > 32) {
      setUserNameError("Tài khoản của bạn phải từ 8 đến 32.");
      return false;
    }
    setUserNameError("");
    return true;
  };

  const handleRegister = () => {
    if (!validateAvatar() || !validateFullName() || !validateUserName()) {
      return;
    }
    console.log("avatar: ", avatar);
    console.log("Họ và tên: ", textFullName);
    console.log("Tài khoản của bạn: ", textUserName);
    navigation.navigate("RegisterPassword", {
      avatar,
      fullname: textFullName,
      username: textUserName,
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
        Nhập họ tên và tài khoản của bạn
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
        value={textFullName}
        onChangeText={(text) => setTextFullName(text)}
        placeholderTextColor={COLORS.gray1}
        selectionColor={COLORS.blue}
        keyboardType="default"
        onFocus={handleFullNameFocus}
        onBlur={handleFullNameBlur}
        style={{
          height: 48,
          marginTop: 10,
          backgroundColor: COLORS.secondaryWhite,
          color: "#111",
          borderColor: isFullNameFocused ? COLORS.blue : COLORS.gray1,
          borderWidth: 1.5,
          borderRadius: SIZES.padding,
          paddingLeft: SIZES.padding,
          ...FONTS.body3,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      />
      {FullNameError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {FullNameError}
        </Text>
      )}

      <Text
        style={{
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 20,
          ...FONTS.body3,
        }}
      >
        Tài khoản của bạn
      </Text>
      <TextInput
        placeholder="Nhập Tài khoản của bạn"
        value={textUserName}
        onChangeText={(text) => setTextUserName(text)}
        placeholderTextColor={COLORS.gray1}
        selectionColor={COLORS.blue}
        keyboardType="UserName-pad"
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
      {UserNameError !== "" && (
        <Text
          style={{
            color: COLORS.red,
            marginHorizontal: SIZES.marginHorizontal,
          }}
        >
          {UserNameError}
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
