import { Alert } from "react-native";

export const NotificationCustom = {
  errorNotLogin: ({ navigation }) => {
    const handleToLogin = () => {
      navigation.navigate("Login");
    };

    Alert.alert(
      "Lỗi",
      "Không thể lấy danh sách người dùng do chưa đăng nhập.",
      [{ text: "OK", onPress: handleToLogin }]
    );
  },

  errorNetwork: () => {
    Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
  },

  errorLogin: () => {
    Alert.alert(
      "Đăng nhập không thành công",
      "Tài khoản hoặc mật khẩu không đúng."
    );
  },

  errorRegister: (message) => {
    if (message === "User under this username already exists")
      Alert.alert("Đăng ký không thành công", "Tên tài khoản đã tồn tại.");
    else Alert.alert("Đăng ký không thành công", "Số điện thoại đã tồn tại.");
  },

  successRegister: () => {
    Alert.alert("Đăng ký thành công", "Vui lòng đăng nhập để tiếp tục.");
  },
};
