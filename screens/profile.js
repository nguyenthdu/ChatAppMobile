import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { clearTokens, getUserCurrent } from "../utils/AsyncStorage";

export default function Profile({ navigation }) {
  const [userCurrent, setCurrentUser] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const me = JSON.parse(await getUserCurrent());
        setCurrentUser(me);
      } catch (error) {
        console.log("Error fetching current user: ", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    await clearTokens();
    // await AuthAPI.logout();
    navigation.navigate("Start");
  };

  return (
    <View>
      {/* thông tin người dùng */}
      {userCurrent && (
        <View style={styles.userInfoContainer}>
          <Avatar
            rounded
            source={{ uri: userCurrent.avatar }} // Sử dụng URI của ảnh từ userCurrent
            size={100}
          />
          <Text style={styles.userInfoText}>
            {userCurrent.fullName} {"\n"}
            {userCurrent.userName} {"\n"}
            {userCurrent.email} {"\n"}
            {userCurrent.phone}
          </Text>
        </View>
      )}
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "Roboto",
        }}
      >
        Chào mừng bạn đến với ứng dụng nhắn tin Zala
      </Text>
      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: "#0573ff",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => handleLogout()}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            color: "white",
          }}
        >
          Đăng xuất
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
