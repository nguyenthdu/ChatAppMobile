import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import { MessageAPI } from "../services/api";

export default function ListFriendsRequest({ navigation }) {
  const [listFriendRequest, setListFriendRequest] = useState([]);
  useEffect(() => {
    fetchListFriendRequestPending();
  }, []);

  const fetchListFriendRequestPending = async () => {
    const res = await MessageAPI.getListFriendRequestPending();
    setListFriendRequest(res.data);
    // console.log("res request: ", res.data);
  };

  // Xử lý chấp nhận lời mời kết bạn
  const handleAccept = (user) => {
    const acceptFriendRequest = async () => {
      const res = await MessageAPI.acceptFriendRequest(user?.id);
      if (res?.data.message.includes("successfully")) {
        console.log("res", res?.data);
        fetchListFriendRequestPending();
        Alert.alert("Thông báo", `Đã là bạn bè với ${user?.username}`);
      }
    };

    acceptFriendRequest();
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
        data={listFriendRequest}
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
                source={{
                  uri: item?.sender?.avatar,
                }}
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
                {item?.sender?.username}
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
                onPress={() => handleAccept(item?.sender)}
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
