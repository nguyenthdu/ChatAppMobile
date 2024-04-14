import { Pressable, StyleSheet, Text, View, ViewBase } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import ImagePickerComponent from "../components/image_picker";
const data = {
  id: 1,
  avatar: "https://i.imgur.com/7ZI1zj3.jpg",
  name: "Nhóm 1",
  members: [
    {
      id: 1,
      avatar: "https://i.imgur.com/7ZI1zj3.jpg",
      name: "Nguyễn Văn A",
    },
    {
      id: 2,
      avatar: "https://i.imgur.com/7ZI1zj3.jpg",
      name: "Nguyễn Văn B",
    },
    {
      id: 3,
      avatar: "https://i.imgur.com/7ZI1zj3.jpg",
      name: "Nguyễn Văn C",
    },
  ],
};
export default function OptionGroup({ navigation }) {
  const [avatar, setAvatar] = useState();
  const handleImageSelect = (uri) => {
    setAvatar(uri);
  };
  //xử lý rời nhóm
  const handleExitGroup = () => {
    // Handle exit group
    navigation.goBack();
  };
  //xử lý giải tán nhóm
  const handleDissolveGroup = () => {
    // Handle dissolve group
    navigation.goBack();
  };
  return (
    <View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: COLORS.blue,
        }}
      >
        <MaterialIcons name="arrow-back" size={30} color={COLORS.white} />
        <Text style={{ fontSize: SIZES.h4, color: COLORS.white }}>
          Tùy chọn
        </Text>
      </Pressable>
      <ImagePickerComponent onImageSelect={handleImageSelect} />
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray2,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.h3,
          }}
        >
          {data.name}
        </Text>
        <Pressable>
          <MaterialIcons name="edit" size={24} color={COLORS.blue} />
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          padding: 10,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("AddMembersGroup")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <MaterialIcons name="person-add-alt" size={24} color={COLORS.blue} />
          <Text
            style={{
              fontSize: SIZES.h3,
              marginLeft: 10,
            }}
          >
            Thêm thành viên
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate(
              "ListMembersGroup", //truyền data member sang và log ra
              { members: data.members },
              console.log(data.members)
            )
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <MaterialIcons name="people" size={24} color={COLORS.blue} />
          <Text
            style={{
              fontSize: SIZES.h3,
              marginLeft: 10,
            }}
          >
            Xem danh sách thành viên({data.members.length})
          </Text>
        </Pressable>
        <Pressable
          onPress={handleExitGroup}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <MaterialIcons name="exit-to-app" size={24} color={COLORS.red} />
          <Text
            style={{
              fontSize: SIZES.h3,
              marginLeft: 10,
              color: COLORS.red,
            }}
          >
            Rời nhóm
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDissolveGroup}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.red} />
          <Text
            style={{
              fontSize: SIZES.h3,
              marginLeft: 10,
              color: COLORS.red,
            }}
          >
            Giải tán nhóm
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
