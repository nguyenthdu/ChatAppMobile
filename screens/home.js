import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants";
import { doSetGroup } from "../redux/group/groupSlice";
import { chatGroupAPI } from "../services/ChatApi";
import { FriendAPI } from "../services/FriendApi";
import { getUserCurrent } from "../utils/AsyncStorage";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const [isPressAllChat, setIsPressAllChat] = React.useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAllChatPress = () => {
    setIsPressAllChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressAllChat(false);
    setIsPressGroupChat(true);
  };

  const [textSearch, setSearch] = React.useState("");

  useFocusEffect(
    useCallback(() => {
      // Call your fetch function here
      fetchListFriend();
    }, []),
  );

  const fetchListFriend = async () => {
    try {
      setLoading(true);
      const me = await getUserCurrent();
      const res = await FriendAPI.getListFriends(me.id);
      setCurrentUser(me);
      if (res?.data) {
        const data = res.data.map(({ id, receiver, sender, status }) => {
          if (me.id === sender.id) {
            // Nếu me.id trùng với sender.id, giữ nguyên res.data
            return { id, receiver, sender, status };
          } else if (me.id === receiver.id) {
            // Nếu me.id trùng với receiver.id, hoán đổi vị trí sender và receiver
            return { id, receiver: sender, sender: receiver, status };
          } else {
            return { id, receiver, sender, status };
          }
        });
        const mainData = data.map((friend) => friend.receiver);
        setData(mainData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching list friend: ", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchGroup();
    }
  }, [currentUser]);

  const fetchGroup = async () => {
    const resGetAllGroup = await chatGroupAPI.getAllGroupByUserId(currentUser.id);
    if (resGetAllGroup?.data) {
      const groupData = resGetAllGroup.data.map((group) => ({
        ...group,
        type: "group",
      }));
      setData((prevData) => [...prevData, ...groupData]);
    } else {
      console.log("Get all group failed");
    }
  };

  const handleChatPress = (item) => {
    if (item.type === "group") {
      dispatch(doSetGroup(item));
      navigation.navigate("ChatGroup", { group: item, currentUser });
    } else {
      navigation.navigate("Chat", { recipient: item });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
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
        {/* TODO: type chat */}
        <View
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
          <TouchableOpacity
            style={{
              backgroundColor: isPressAllChat ? COLORS.blue : COLORS.white,
              padding: 5,
              borderRadius: 10,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleAllChatPress}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: isPressAllChat ? COLORS.white : COLORS.black,
              }}
            >
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: isPressGroupChat ? COLORS.blue : COLORS.white,
              padding: 5,
              width: "48%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
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

        {/* List chat */}
        <FlatList
          data={data}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChatPress(item)}
              style={{
                marginTop: 15,
                marginHorizontal: SIZES.marginHorizontal,
                borderRadius: 10,
                height: 60,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                  source={
                    item.avatar ? { uri: item.avatar } : require("../assets/image/avatar.png")
                  }
                />
                <View
                  style={{
                    marginLeft: 10,
                    height: 40,
                    flex: 1,
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.black,
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                  >
                    {item?.username || item?.name}
                  </Text>
                </View>
              </View>
              {/* Dấu gạch ngang */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#f2f2f2",
                  marginTop: 10,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
