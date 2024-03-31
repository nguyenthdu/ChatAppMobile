import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";

const data = {
  id: 1,
  avatar: "https://i.pravatar.cc/300",
  name: "Nguyễn Văn A",
  phone: "0123456789",
};

const AddFriend = ({ navigation }) => {
  const [textSearch, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false); // Biến để kiểm tra đã thực hiện tìm kiếm hay chưa

  const handleSearch = () => {
    // Kiểm tra nếu số điện thoại nhập vào trùng với số điện thoại của bạn
    //neu  textSearch khong rong va textSearch === data.phone

    if (textSearch === data.phone) {
      setSearchResult(data);
    } else {
      setSearchResult(null);
    }
    setSearched(true); // Đánh dấu đã thực hiện tìm kiếm
  };
  //xử lý gửi lời mời kết bạn
  const handleAddFriend = () => {
    // Thêm bạn vào danh sách bạn bè
    // code here
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
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ ...FONTS.body3 }}>{searchResult.name}</Text>
                  <Text style={{ ...FONTS.body4 }}>{searchResult.phone}</Text>
                </View>
              </View>
              <Pressable
                style={{
                  backgroundColor: COLORS.blue,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="person-add"
                  size={24}
                  color="white"
                  onPress={handleAddFriend}
                />
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

      <Pressable
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
      </Pressable>
    </View>
  );
};

export default AddFriend;
