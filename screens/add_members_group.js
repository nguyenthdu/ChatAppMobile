import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
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
export default function AddUMembersGroup({ navigation }) {
  const [textSearch, setSearch] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showCreateGroupButton, setShowCreateGroupButton] = useState(false);
  useEffect(() => {
    // Kiểm tra số lượng bạn bè được chọn để quyết định hiển thị nút tạo nhóm
    if (selectedFriends.length >= 1) {
      setShowCreateGroupButton(true);
    } else {
      setShowCreateGroupButton(false);
    }
  }, [selectedFriends]);
  //TODO: xu ly chon ban be
  const handleFriendSelect = (friendId) => {
    // Check if friend is already selected
    const isSelected = selectedFriends.some((friend) => friend.id === friendId);
    if (isSelected) {
      // Remove friend if already selected
      setSelectedFriends(
        selectedFriends.filter((friend) => friend.id !== friendId)
      );
    } else {
      // Add friend to selected list if not already selected
      const friend = friends.find((friend) => friend.id === friendId);
      setSelectedFriends([...selectedFriends, friend]);
    }
  };
  // Lọc danh sách bạn bè theo tên
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(textSearch.toLowerCase())
  );
  //handle add friend into group
  const handleAddFriend = () => {
    // Handle add friend into group
    navigation.goBack();
  };
  return (
    <View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: COLORS.blue,
        }}
      >
        <MaterialIcons name="arrow-back" size={30} color={COLORS.white} />
        <Text style={{ fontSize: SIZES.h4, color: COLORS.white }}>
          Thêm thành viên vào nhóm
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          height: 48,
          borderColor: "gray",
          backgroundColor: COLORS.gray2,
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
          marginLeft: 10,
          marginTop: 20,
          marginHorizontal: SIZES.marginHorizontal,
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
          placeholder="Tìm bạn..."
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
      {/* hiển thị danh sách bạn bè */}
      <FlatList
        style={{ height: SIZES.height - 200 }}
        data={filteredFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleFriendSelect(item.id)}>
            <View style={styles.friendContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <MaterialIcons
                name={
                  selectedFriends.some((friend) => friend.id === item.id)
                    ? "check-circle"
                    : "check-circle-outline"
                }
                size={24}
                color={
                  selectedFriends.some((friend) => friend.id === item.id)
                    ? COLORS.blue
                    : "gray"
                }
              />
            </View>
          </Pressable>
        )}
      />
      {showCreateGroupButton && (
        <Pressable
          style={{
            backgroundColor: COLORS.blue,
            marginHorizontal: SIZES.marginHorizontal,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={handleAddFriend}
        >
          <Text style={{ color: COLORS.white, fontSize: SIZES.h3 }}>
            Thêm vào nhóm
          </Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    marginHorizontal: SIZES.marginHorizontal,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    ...FONTS.body3,
    flex: 1,
  },
});
