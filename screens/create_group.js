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
import ImageGroupPicker from "../components/image_group_picker";
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
export default function CreateGroup({ navigation }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [image, setImage] = useState(null);
  const [textSearch, setSearch] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [showCreateGroupButton, setShowCreateGroupButton] = useState(false);
  useEffect(() => {
    // Kiểm tra số lượng bạn bè được chọn để quyết định hiển thị nút tạo nhóm
    if (selectedFriends.length >= 2) {
      setShowCreateGroupButton(true);
    } else {
      setShowCreateGroupButton(false);
    }
  }, [selectedFriends]);

  //TODO: xu ly chon anh
  const handleImageSelect = (imageUri) => {
    setImage(imageUri); // Cập nhật đường dẫn của hình ảnh được chọn
  };
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Tạo nhóm</Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginHorizontal: SIZES.marginHorizontal,
        }}
      >
        <ImageGroupPicker onImageSelect={handleImageSelect} />
        <TextInput
          style={{
            marginLeft: 10,
            ...FONTS.body3,
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
            padding: 5,
            height: 48,
            width: "80%",
          }}
          placeholder="Đặt tên nhóm"
          value={nameGroup}
          onChangeText={(text) => setNameGroup(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          height: 48,
          borderColor: "gray",
          backgroundColor: COLORS.secondaryWhite,
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
          marginLeft: 10,
          marginTop: 10,
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
      <View>
        <Text
          style={{
            marginHorizontal: SIZES.marginHorizontal,
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Đã chọn: {selectedFriends.length}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#f2f2f2",
            marginHorizontal: SIZES.marginHorizontal,
          }}
        />
      </View>
      {/* hiển thị danh sách bạn bè */}
      <FlatList
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
      {/* Hiển thị nút tạo nhóm nếu có ít nhất 2 bạn bè được chọn */}
      {showCreateGroupButton && (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            height: 48,
            margin: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => {
            // Xử lý tạo nhóm
            console.log("data", {
              name: nameGroup,
              image,
              members: selectedFriends,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Tạo nhóm</Text>
        </TouchableOpacity>
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
