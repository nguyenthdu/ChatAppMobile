import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, SIZES } from "../constants";
export default function OptionGroup({ navigation }) {
  const group = useSelector((state) => state.group.group);

  const [avatar, setAvatar] = useState(group?.avatar || "");

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

      {/* <ImagePickerComponent onImageSelect={handleImageSelect} /> */}
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 90,
            }}
            source={{ uri: group?.avatar }}
          />
          <Text
            style={{
              fontSize: SIZES.h3,
            }}
          >
            {group.name}
          </Text>
        </View>
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
              { members: group?.users },
              console.log(group?.users)
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
            Xem danh sách thành viên ({group?.users.length})
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
