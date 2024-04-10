import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { FriendAPI } from "../services/FriendApi";
import { getUserCurrent } from "../utils/AsyncStorage";

const AddFriend = ({ navigation }) => {
  const [textSearch, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userCurrent, setCurrentUser] = useState();
  const [sendRequest, setSendRequest] = useState(false);
  // sau 1s sẽ gọi API tìm kiếm user theo số điện thoại
  const [searched, setSearched] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const me = JSON.parse(await getUserCurrent());
      setCurrentUser(me);
    } catch (error) {
      console.log("Error fetching current user: ", error);
    }
  };

  // sau 600ms thì tự tìm
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (!textSearch) {
      setSearched(false);
      return;
    }
    searchTimeoutRef.current = setTimeout(async () => {
      const res = await FriendAPI.findUserByPhone(textSearch);
      console.log("res: ", res.data);
      setSearchResult(res.data);
      setSearched(true);
    }, 600);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [textSearch]);

  // tìm ngay lập tức
  const handleSearch = async () => {
    setSearched(false);
    const res = await FriendAPI.findUserByPhone(textSearch);
    setSearchResult(res.data);
    setSearched(true);
  };

  //xử lý gửi lời mời kết bạn
  const handleAddFriend = async (receiverId) => {
    const res = await FriendAPI.sendFriendRequest(userCurrent.id, receiverId);
    console.log("res: ", res.data);
    if (res.data.message.includes("successfully"))
      // thay đổi thành nút đã gửi
      setSendRequest(true);
    ToastAndroid.show("Gửi kết bạn thành công", ToastAndroid.SHORT);
    // Alert.alert("Thông báo", "Gửi kết bạn thành công.", [
    //   { text: "OK", onPress: () => navigation.goBack() },
    // ]);
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
          Thêm bạn
        </Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          height: 48,
          marginTop: 10,
          marginHorizontal: SIZES.marginHorizontal,
          borderColor: "gray",
          backgroundColor: COLORS.secondaryWhite,
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <MaterialIcons name="search" size={24} color="blue" />

        <TextInput
          value={textSearch}
          onChangeText={(text) => setSearch(text)}
          style={{
            marginLeft: 10,
            height: "100%",
            width: "80%",
            ...FONTS.body3,
          }}
          placeholder="Nhập vào số điện thoại..."
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setSearch("")}
        >
          <MaterialIcons name="clear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={handleSearch}
        style={{
          justifyContent: "center",
          marginTop: 10,
          alignItems: "center",
          borderRadius: 10,
          padding: 10,
          height: 48,
          marginHorizontal: SIZES.marginHorizontal,
          backgroundColor: COLORS.blue,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.body3,
          }}
        >
          Tìm kiếm
        </Text>
      </Pressable>

      {/* Hiển thị kết quả tìm kiếm */}
      {searched ? (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: SIZES.marginHorizontal,
            marginTop: 20,
            height: 200,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {searchResult ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: searchResult.avatar }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 90,
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ ...FONTS.body3 }}>
                    {searchResult.username}
                  </Text>
                </View>
              </View>
              <Pressable
                style={{
                  backgroundColor: sendRequest ? COLORS.gray : COLORS.blue,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sendRequest ? (
                  <Text onPress={() => setSendRequest(false)}>Hủy lời mời</Text>
                ) : (
                  <MaterialIcons
                    name="person-add"
                    size={24}
                    color="white"
                    onPress={() => handleAddFriend(searchResult.id)}
                  />
                )}
              </Pressable>
            </View>
          ) : (
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Không tìm thấy kết quả
            </Text>
          )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: SIZES.marginHorizontal,
            marginTop: 20,
            height: 200,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></View>
      )}

      {/* <Pressable
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.marginHorizontal,
          marginTop: 10,
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: 12,
          padding: 10,
        }}
      >
        <Text style={{ ...FONTS.body3 }}>Gợi ý</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </Pressable> */}
    </View>
  );
};

export default AddFriend;
