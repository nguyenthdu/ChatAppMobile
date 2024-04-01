import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { COLORS, FONTS, SIZES } from "../constants";

export default function Home({ navigation }) {
  const [isPressAllChat, setIsPressAllChat] = React.useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = React.useState(false);
  const [data, setData] = useState([]);

  const handleAllChatPress = () => {
    setIsPressAllChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressAllChat(false);
    setIsPressGroupChat(true);
  };

  const [textSearch, setSearch] = React.useState("");

  // useEffect(() => {
  //   fetchListUserMessage();
  // }, []);

  // const fetchListUserMessage = async () => {
  //   try {
  //     const res = await MessageAPI.getListUserMessage();
  //     setData(res.data);
  //   } catch (error) {
  //     console.log("Error fetching list user message:", error);
  //     NotificationCustom.errorNotLogin({ navigation });
  //   }
  // };

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
              onPress={() => navigation.navigate("Chat", { recipient: item })}
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
                    item.avatar
                      ? { uri: item.avatar }
                      : require("../assets/image/avatar.png")
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
                    {item.username}
                  </Text>
                  {/* Dấu gạch ngang */}
                  <View
                    style={{
                      height: 1,
                      backgroundColor: COLORS.gray,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
