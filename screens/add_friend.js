import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import AccountItem from "../components/AccountItem/AccountItem";
import { COLORS, FONTS, SIZES } from "../constants";
import useCancelFriendRequest from "../hooks/friend/useCancelFriendRequest";
import useDebounce from "../hooks/friend/useDebounce";
import useGetListRequestSended from "../hooks/friend/useGetListRequestSended";
import { FriendAPI } from "../services/FriendApi";
import { getUserCurrent } from "../utils/AsyncStorage";
import { useFriendStore } from "../zustand/useFriendStore";

const AddFriend = ({ navigation }) => {
  const currentUser = getUserCurrent();
  const [searchValue, setSearchValue] = useState("");
  const [resultSearch, setResultSearch] = useState(null);
  const debounce = useDebounce({ value: searchValue, delay: 800 });
  const [isLoading, setIsLoading] = useState(false);

  const { listPendingSended, resetFriendStore, listFriend } = useFriendStore();
  const { getListRequestSended } = useGetListRequestSended();
  const { cancelFriendRequest } = useCancelFriendRequest();

  const isSendRequest =
    Array.isArray(listPendingSended) &&
    !!listPendingSended?.find((item) => item?.receiver?.phone === resultSearch?.phone);
  const isFriend =
    Array.isArray(listFriend) && !!listFriend?.find((item) => item?.phone === resultSearch?.phone);
  const isMe = resultSearch?.phone === currentUser?.user?.phone;

  const handleAddFriend = async (item) => {
    try {
      const res = await FriendAPI.sendFriendRequest({ receiverId: item?.id });
      if (res?.data) {
        ToastAndroid.show(
          `Đã gửi lời mời kết bạn đến ${item?.username} thành công`,
          ToastAndroid.SHORT,
        );
        getListRequestSended(currentUser?.user?.id);
      } else {
        ToastAndroid.show(`Gửi lời mời kết bạn đến ${item?.username} thất bại`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error occurred while adding friend:", error);
      ToastAndroid.show(`Đã xảy ra lỗi khi thêm bạn bè`, ToastAndroid.SHORT);
    }
  };

  const handleCancelRequest = async (item) => {
    resetFriendStore();
    cancelFriendRequest(item?.id);
  };

  const handleSearchUser = async () => {
    setIsLoading(true);
    try {
      const res = await FriendAPI.findUserByPhone(debounce);
      if (res?.data?.status === 404) {
        setResultSearch(null);
      } else if (res && res?.data) {
        setResultSearch(res.data);
      } else {
        setResultSearch(null);
      }
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!String(debounce)?.trim()) {
      setResultSearch(null);
      return;
    }
    handleSearchUser();
  }, [debounce]);

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
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
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
          onPress={() => setSearchValue("")}
        >
          <MaterialIcons name="clear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={handleSearchUser}
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

      {isLoading ? (
        <Text>Loading...</Text>
      ) : resultSearch ? (
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
          {isMe && resultSearch ? (
            <AccountItem data={resultSearch} title="(Bạn)" />
          ) : isFriend && resultSearch ? (
            <AccountItem data={resultSearch} title="(Bạn bè)" />
          ) : isSendRequest && resultSearch ? (
            <AccountItem
              title={"Hủy lời mời"}
              data={resultSearch}
              onClick={() => handleCancelRequest(resultSearch)}
            />
          ) : resultSearch ? (
            <AccountItem
              data={resultSearch}
              onClick={() => handleAddFriend(resultSearch)}
              title={"Kết bạn"}
            />
          ) : (
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Nhập số điện thoại để tìm kiếm
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
