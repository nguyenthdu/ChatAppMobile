import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FONTS } from "../constants";
import { clearTokens, getUserCurrent } from "../utils/AsyncStorage";
import { MaterialIcons } from "@expo/vector-icons";

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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Image
        source={{ uri: userCurrent?.avatar }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 90,
          alignSelf: "center",
          marginTop: 20,
        }}
      />
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <MaterialIcons name="person" size={30} color="blue" />

          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          >
            {userCurrent?.username}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#d3d3d3",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <MaterialIcons name="phone" size={30} color="blue" />

          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          >
            {userCurrent?.phone}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#d3d3d3",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <MaterialIcons name="email" size={30} color="blue" />

          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          >
            {userCurrent?.email}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#d3d3d3",
          }}
        />
      </View>

      <Pressable
        style={{
          backgroundColor: "#0573ff",
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          marginTop: 20,
          alignItems: "center",
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
