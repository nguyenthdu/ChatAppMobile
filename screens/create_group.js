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
  const dispatch = useDispatch();

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [image, setImage] = useState(null);
  const [textSearch, setSearch] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [showCreateGroupButton, setShowCreateGroupButton] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     // Call your fetch function here
  //     fetchListFriend();
  //   }, [])
  // );

  useEffect(() => {
    if (!currentUser) return;
    fetchListFriend();
  }, [currentUser]);

  const fetchListFriend = async () => {
    try {
      setLoading(true);
      const res = await FriendAPI.getListFriends(currentUser.id);
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
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const me = JSON.parse(await getUserCurrent());
      setCurrentUser(me);
    } catch (error) {
      console.log("Error fetching current user: ", error);
    }
  };

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

  const handleFriendSelect = (friendId) => {
    // Kiểm tra xem bạn đã được chọn chưa
    const isSelected = selectedFriends.includes(friendId);
    if (isSelected) {
      // Xóa bạn nếu đã được chọn
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      // Thêm bạn vào danh sách đã chọn nếu chưa được chọn
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  // Lọc danh sách bạn bè theo tên
  // const filteredFriends = friends.filter((friend) =>
  //   friend.name.toLowerCase().includes(textSearch.toLowerCase())
  // );

  const handleCreateGroup = async () => {
    const newGroup = {
      name: nameGroup,
      avatar:
        "https://onthi1.s3.ap-southeast-1.amazonaws.com/1713240798265_1000076554.jpg",
      ownerId: currentUser.id,
      member: [...selectedFriends, currentUser.id],
    };

    try {
      const res = await chatGroupAPI.createGroup(newGroup);
      if (res?.data) {
        console.log("Create group successfully: ", res?.data);
        // chuyeern den trang home
        ToastAndroid.show(`Create group ${res?.data?.name} successfully`, 1000);
        navigation.navigate("Home");
      } else {
        console.log("Create group failed");
        // toast.error("Create group failed");
      }
    } catch (error) {
      console.log("error: ", error);
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
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleFriendSelect(item.receiver.id)}>
            <View style={styles.friendContainer}>
              <Image
                source={{ uri: item.receiver.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.name}>{item.receiver.username}</Text>
              <MaterialIcons
                name={
                  selectedFriends.some((id) => id === item.receiver.id)
                    ? "check-circle"
                    : "check-circle-outline"
                }
                size={24}
                color={
                  selectedFriends.some((id) => id === item.receiver.id)
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
