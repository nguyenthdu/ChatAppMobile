import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";

const friends = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 3,
    name: "Bình Bình",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 4,
    name: "Bảo",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 5,
    name: "Anh Tú",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 6,
    name: "Trúc anh",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
  {
    id: 7,
    name: "Đào Bình Minh",
    avatar:
      "https://gamek.mediacdn.vn/133514250583805952/2020/7/17/-1594971929675695379908.jpg",
  },
];

export default function ListFriendsRequest({ navigation }) {
  // Xử lý chấp nhận lời mời kết bạn
  const handleAccept = (friendId) => {
    console.log("Chấp nhận lời mời kết bạn của:", friendId);
  };
  // Xử lý từ chối lời mời kết bạn
  const handleReject = (friendId) => {
    console.log("Từ chối lời mời kết bạn của:", friendId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#f2f2f2",
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            color: "black",
          }}
        >
          Danh sách yêu cầu kết bạn
        </Text>
      </Pressable>

      {/* Danh sách lời mời kết bạn */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              marginHorizontal: SIZES.marginHorizontal,
              borderBottomWidth: 1,
              borderBottomColor: "#f2f2f2",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "60%",
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  color: "black",
                  //dài quá thì xuống dòng
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginLeft: 10,
              }}
            >
              <Pressable
                onPress={() => handleAccept(item.id)}
                style={{
                  flex: 1,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  backgroundColor: COLORS.blue,
                }}
              >
                <MaterialIcons name="done" size={20} color="white" />
              </Pressable>
              <Pressable
                onPress={() => handleReject(item.id)}
                style={{
                  flex: 1,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  backgroundColor: "red",
                  marginLeft: 10,
                }}
              >
                <MaterialIcons name="close" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
