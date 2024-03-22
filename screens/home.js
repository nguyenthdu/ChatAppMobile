import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";
//lấy dữ liệu từ file data_test.js
import data from "../constants/data_test";

export default function Home({ navigation }) {
  const [isPressAllChat, setIsPressAllChat] = React.useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = React.useState(false);
  const handleAllChatPress = () => {
    setIsPressAllChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressAllChat(false);
    setIsPressGroupChat(true);
  };

  const [textSearch, setSearch] = React.useState("");

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
          data={data.filter((item) =>
            item.room_name.toLowerCase().includes(textSearch.toLowerCase())
          )}
          keyExtractor={(item) => item.room_id.toString()}
          renderItem={({ item }) => {
            const latestMessage = item.user_reservations.reduce((acc, cur) => {
              const lastMsg = cur.message[cur.message.length - 1];
              if (
                !acc ||
                new Date(lastMsg.created_at) > new Date(acc.created_at)
              ) {
                return lastMsg;
              }
              return acc;
            }, null);

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chat", { conversation: item })
                }
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
                    source={{ uri: item.avatar_room }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      height: 40,
                      flex: 1,
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
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
                        {item.room_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: COLORS.gray1,
                          fontFamily: "Roboto",
                        }}
                      >
                        {latestMessage
                          ? `${new Date(
                              latestMessage.created_at
                            ).getHours()}:${new Date(
                              latestMessage.created_at
                            ).getMinutes()}`
                          : ""}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: COLORS.gray1,
                        fontFamily: "Roboto",
                      }}
                    >
                      {latestMessage ? latestMessage.message : ""}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
