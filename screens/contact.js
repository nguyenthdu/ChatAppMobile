import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS, FONTS, SIZES } from "../constants";
import { MessageAPI } from "../services/api";

export default function Contact() {
  const [textSearch, setSearch] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("Friends");
  const [isPressFriendChat, setIsPressFriendChat] = React.useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = React.useState(false);
  const [searchResult, setSearchResult] = useState(null);
  // sau 1s sẽ gọi API tìm kiếm user theo số điện thoại
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const handleFriendChatPress = () => {
    setIsPressFriendChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressFriendChat(false);
    setIsPressGroupChat(true);
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (!textSearch) {
      setIsSearching(false);
      return;
    }
    searchTimeoutRef.current = setTimeout(async () => {
      const res = await MessageAPI.findUserByPhone(textSearch);
      setSearchResult(res.data);
      setIsSearching(true);
    }, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [textSearch]);

  useEffect(() => {
    console.log("searchResult: ", searchResult);
  }, [searchResult]);

  const handleClose = () => {
    setIsSearching(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 48,
            marginTop: 10,
            marginHorizontal: SIZES.marginHorizontal,
            borderColor: "gray",
            backgroundColor: COLORS.secondaryWhite,
            alignItems: "center",
            borderRadius: 12,
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
            placeholder="Tìm kiếm..."
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
        {/* result */}
        {isSearching && (
          <View style={{ flex: 1 }}>
            {searchResult === null ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Không tìm thấy kết quả</Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1 / 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      marginHorizontal: SIZES.marginHorizontal,
                      marginTop: 10,
                    }}
                  >
                    Kết quả tìm kiếm
                  </Text>
                  <TouchableOpacity onPress={handleClose}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        marginHorizontal: SIZES.marginHorizontal,
                        color: COLORS.blue,
                      }}
                    >
                      Đóng
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 2 / 3,
                    marginHorizontal: SIZES.marginHorizontal,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        rounded
                        source={{ uri: searchResult?.avatar }} // Sử dụng URI của ảnh từ userCurrent
                        size={50}
                      />
                      <Text style={{ ...FONTS.h3, marginLeft: 10 }}>
                        {searchResult?.username}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="person-add"
                          size={35}
                          color="blue"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
            marginHorizontal: SIZES.marginHorizontal,
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: isPressFriendChat ? COLORS.blue : COLORS.white,
              borderRadius: 10,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleFriendChatPress}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: isPressFriendChat ? COLORS.white : COLORS.black,
              }}
            >
              Bạn bè
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: isPressGroupChat ? COLORS.blue : COLORS.white,
              borderRadius: 10,
              width: "48%",
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleGroupChatPress}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: isPressGroupChat ? COLORS.white : COLORS.black,
              }}
            >
              Nhóm
            </Text>
          </TouchableOpacity>
        </View>
        {isPressFriendChat ? (
          <View
            style={{
              flex: 1,
              marginHorizontal: SIZES.marginHorizontal,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="person-search" size={35} color="blue" />
                <Text style={{ ...FONTS.body4, marginLeft: 10 }}>
                  Lời mời kết bạn
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="group-add" size={35} color="blue" />
                <Text style={{ ...FONTS.body4, marginLeft: 10 }}>Tạo nhóm</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    ...FONTS.h3,
  },
  userInfo: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    ...FONTS.h3,
  },
  phone: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  addButton: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    ...FONTS.h3,
  },
});
