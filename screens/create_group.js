import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import ImageGroupPicker from "../components/image_group_picker";
import { COLORS, FONTS, SIZES } from "../constants";
import { chatGroupAPI } from "../services/ChatApi";
import { FriendAPI } from "../services/FriendApi";
import { getUserCurrent } from "../utils/AsyncStorage";

export default function CreateGroup({ navigation }) {
  const currentUser = getUserCurrent();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState(
    "https://png.pngtree.com/png-vector/20190827/ourmid/pngtree-group-avatar-icon-design-vector-png-image_1702778.jpg",
  );

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
  };
  const handleUserDeselect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId));
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleFriendSelect = (friendId) => {
    const isSelected = selectedUsers.includes(friendId);
    return isSelected ? handleUserDeselect(friendId) : handleUserSelect(friendId);
  };

  const [textSearch, setSearch] = useState("");
  const [showCreateGroupButton, setShowCreateGroupButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     // Call your fetch function here
  //     fetchListFriend();
  //   }, [])
  // );

  const fetchListFriend = async () => {
    try {
      setLoading(true);
      const res = await FriendAPI.getListFriends(currentUser?.user?.id);

      if (res?.data) {
        const data = res.data.map(({ id, receiver, sender, status }) => {
          if (currentUser.id === sender.id) {
            // Nếu currentUser.id trùng với sender.id, giữ nguyên res.data
            return { id, receiver, sender, status };
          } else if (currentUser.id === receiver.id) {
            // Nếu currentUser.id trùng với receiver.id, hoán đổi vị trí sender và receiver
            return { id, receiver: sender, sender: receiver, status };
          } else {
            return { id, receiver, sender, status };
          }
        });
        setFriends(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching list friend: ", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchListFriend();
  }, [currentUser]);

  useEffect(() => {
    if (selectedUsers.length >= 2) {
      setShowCreateGroupButton(true);
    } else {
      setShowCreateGroupButton(false);
    }
  }, [selectedUsers]);

  const handleImageSelect = (imageUri) => {
    setGroupAvatar(imageUri);
  };

  const handleCreateGroup = async () => {
    const newGroup = {
      name: groupName,
      avatar: groupAvatar,
      ownerId: currentUser?.user?.id,
      member: [...selectedUsers, currentUser?.user?.id],
    };

    try {
      const res = await chatGroupAPI.createGroup(newGroup);
      if (res?.data) {
        ToastAndroid.show(`Create group ${res?.data?.name} successfully`, 1000);
        navigation.navigate("Home");
      } else {
        ToastAndroid.show(`Đã xảy ra lỗi khi tạo group`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error occurred while create group:", error);
      ToastAndroid.show(`Đã xảy ra lỗi khi tạo group`, ToastAndroid.SHORT);
    }
  };

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
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
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
          Đã chọn: {selectedUsers.length}
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
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleFriendSelect(item.receiver.id)}>
            <View style={styles.friendContainer}>
              <Image source={{ uri: item.receiver.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.receiver.username}</Text>
              <MaterialIcons
                name={
                  selectedUsers.some((id) => id === item.receiver.id)
                    ? "check-circle"
                    : "check-circle-outline"
                }
                size={24}
                color={selectedUsers.some((id) => id === item.receiver.id) ? COLORS.blue : "gray"}
              />
            </View>
          </Pressable>
        )}
      />
      {/* Hiển thị nút tạo nhóm nếu có ít nhất 2 bạn bè được chọn */}
      {showCreateGroupButton && (
        <TouchableOpacity
          disabled={loading}
          style={{
            backgroundColor: COLORS.blue,
            height: 48,
            margin: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => handleCreateGroup()}
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
