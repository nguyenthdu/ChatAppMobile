import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { FriendAPI } from "../services/FriendApi";
import { getUserCurrent } from "../utils/AsyncStorage";

export default function Contact({ navigation }) {
  const [textSearch, setSearch] = useState("");
  const [isPressFriendChat, setIsPressFriendChat] = useState(true);
  const [isPressGroupChat, setIsPressGroupChat] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchListFriend();
  }, []);

  const fetchListFriend = async () => {
    try {
      setLoading(true);
      const me = JSON.parse(await getUserCurrent());
      console.log("me: ", me.id);
      const res = await FriendAPI.getListFriends(me.id);
      if (res?.data) {
        const data = res.data.map(({ id, receiver, status }) => ({
          id,
          receiver,
          status,
        }));
        setFriends(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching list friend: ", error);
    }
  };

  // get list friend khi screen mount
  useEffect(() => {
    console.log("Friends", friends);
  }, [friends]);

  //TODO:Xử lý nhấn vào item chuyển sang màn hình chat
  const handleItemPress = (item) => {
    console.log("Press", item.receiver);
    navigation.navigate("Chat", { recipient: item.receiver });
  };

  //Xử lý khi nhấn giữ vào item để hiển thị thông tin chi tiết và chức năng khác
  const handleItemLongPress = (item) => {
    setSelectedFriend(item);
    setModalVisible(true);
  };
  //TODO: chọn muc bạn bè hoặc nhóm
  const handleFriendChatPress = () => {
    setIsPressFriendChat(true);
    setIsPressGroupChat(false);
  };
  const handleGroupChatPress = () => {
    setIsPressFriendChat(false);
    setIsPressGroupChat(true);
  };

  useEffect(() => {
    // Lọc danh sách bạn bè dựa trên từ khóa tìm kiếm
    const filtered = friends.filter((friend) =>
      friend.receiver.username.toLowerCase().includes(textSearch.toLowerCase())
    );

    // Sắp xếp danh sách bạn bè theo tên
    const sortedFriends = filtered.sort((a, b) =>
      a.receiver.username.localeCompare(b.receiver.username)
    );

    // Nhóm bạn bè theo chữ cái đầu tiên của tên
    const groupedFriends = sortedFriends.reduce((acc, friend) => {
      const initial = friend.receiver.username.charAt(0).toUpperCase();
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(friend);
      return acc;
    }, {});

    // Chuyển đổi dữ liệu nhóm bạn bè thành mảng để hiển thị trên SectionList
    const sections = Object.keys(groupedFriends).map((initial) => ({
      title: initial,
      data: groupedFriends[initial],
    }));

    setFilteredFriends(filtered);
    setSections(sections);
  }, [friends, textSearch]);

  //TODO: Xử lý gọi điện
  const handleCallPress = (item) => {
    // Handle call action with the selected friend (item)
    console.log("Call", item);
  };
  //TODO: xử lý gọi video
  // Function to handle video call press
  const handleVideoCallPress = (item) => {
    // Handle video call action with the selected friend (item)
    console.log("Video call", item);
  };
  //TODO: xử lý xem hồ sơ
  const handleProfilePress = () => {
    console.log("View profile", selectedFriend);
  };
  //xử lý hiện modal xác nhận xóa bạn bè
  const showConfirmDeleteModal = () => {
    setConfirmDeleteModalVisible(true);
    setFriendToDelete(selectedFriend);
  };
  const handleDeleteFriend = (friend) => {
    // Xử lý xóa bạn bè
    console.log("Delete friend", friend);
    setConfirmDeleteModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        {/* TODO: Tìm kiếm */}
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
              marginHorizontal: SIZES.marginHorizontal,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              height: 50,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("AddFriend")}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("ListFriendsRequest")}
            >
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
          <View style={{ alignItems: "center", height: 50 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateGroup")}
            >
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

        <View>
          <Text
            style={{
              marginHorizontal: SIZES.marginHorizontal,
              marginTop: 20,
              fontSize: 20,
            }}
          >
            {friends.length} bạn bè
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#f2f2f2",
              marginHorizontal: SIZES.marginHorizontal,
            }}
          />
        </View>

        {/* TODO: Hiển thị danh sách bạn bè */}
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          <SectionList
            style={{ flex: 1 }}
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginHorizontal: SIZES.marginHorizontal,
                  marginTop: 10,
                }}
                onLongPress={() => handleItemLongPress(item)}
                onPress={() => handleItemPress(item)}
              >
                {/* Hiển thị avatar và tên bạn bè */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.receiver.avatar }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body3,
                      marginLeft: 10,
                    }}
                  >
                    {item.receiver.username}
                  </Text>
                </View>
                {/* Nút gọi và gọi video */}
                <TouchableOpacity
                  style={{ marginLeft: "auto", padding: 10 }}
                  onPress={() => handleCallPress(item)}
                >
                  <MaterialIcons name="call" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => handleVideoCallPress(item)}
                >
                  <MaterialIcons name="video-call" size={24} color="blue" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={{
                  ...FONTS.h3,
                  marginHorizontal: SIZES.marginHorizontal,
                  marginTop: 20,
                }}
              >
                {title}
              </Text>
            )}
          />
        )}

        {/* Modal hiển thị thông tin chi tiết của bạn bè */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.modalView}>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: selectedFriend?.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 10,
                    fontSize: 20,
                  }}
                >
                  {selectedFriend?.name}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  width: "80%",
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleProfilePress}
              >
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 18,
                    marginLeft: 20,
                  }}
                >
                  Xem hồ sơ
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 18,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  width: "80%",
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={showConfirmDeleteModal}
              >
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 18,
                    marginLeft: 20,
                    color: "red",
                  }}
                >
                  Xóa bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmDeleteModalVisible}
          onRequestClose={() => {
            setConfirmDeleteModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setConfirmDeleteModalVisible(false)}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                height: "20%",
                width: "70%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  margin: 20,
                }}
              >
                Bạn có muốn xóa "{selectedFriend?.name}" không?
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    width: 100,
                    height: 40,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => handleDeleteFriend(friendToDelete)}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Có
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "blue",
                    borderRadius: 10,
                    marginLeft: 20,
                    height: 40,
                    width: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setConfirmDeleteModalVisible(false)}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Không
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "30%",
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
