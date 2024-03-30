import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";

export default function Contact() {
  const [textSearch, setSearch] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("Friends");
  const [isPressFriendChat, setIsPressFriendChat] = React.useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = React.useState(false);
  const handleFriendChatPress = () => {
    setIsPressFriendChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressFriendChat(false);
    setIsPressGroupChat(true);
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
                <MaterialIcons name="person-add" size={35} color="blue" />
                <Text style={{ ...FONTS.body4, marginLeft: 10 }}>
                  Thêm bạn bè
                </Text>
              </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({});
