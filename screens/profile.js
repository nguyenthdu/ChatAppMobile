import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FONTS } from "../constants";
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userCurrent?.avatar }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 90,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...FONTS.body3 }}>{userCurrent?.username}</Text>
          <Text style={{ ...FONTS.body4 }}>{userCurrent?.phone}</Text>
          <Text style={{ ...FONTS.body4 }}>{userCurrent?.email}</Text>
        </View>
      </View>
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

const styles = StyleSheet.create({});
