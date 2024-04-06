import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import { clearTokens, getUserCurrent } from "../utils/AsyncStorage";
import { MaterialIcons } from "@expo/vector-icons";
import ImagePickerComponent from "../components/image_picker";

export default function UpdateProfile({ route, navigation }) {
  const [userCurrent, setCurrentUser] = useState();
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleUpdateProfile = async () => {
    if (validateFullName() && validateEmail() && validatePhone()) {
      const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        avatar: avatar,
      };
      try {
        // await AuthAPI.updateProfile(data);
        // await AsyncStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
        alert("Cập nhật thông tin thành công");
      } catch (error) {
        console.log("Error updating profile: ", error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <MaterialIcons name="arrow-back" size={30} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            marginLeft: 10,
          }}
        >
          Cập nhật thông tin
        </Text>
      </Pressable>
      <ImagePickerComponent avatar={avatar} setAvatar={setAvatar} />
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
          <MaterialIcons name="person-2" size={30} color="blue" />

          <TextInput
            //hiển thị dữ liệu user hiện tại và thay đổi dữ liệu mới
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <MaterialIcons name="phone" size={30} color="blue" />

          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          />
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

          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontFamily: "Roboto",
            }}
          />
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
          backgroundColor: "green",
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          marginTop: 20,
          alignItems: "center",
        }}
        //truyền thông tin user hiện tại qua màn hình cập nhật thông tin
        onPress={() => navigation.navigate("UpdateProfile", { userCurrent })}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            color: "white",
          }}
        >
          Cập nhật
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
