import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export default function ListMembersGroup({ navigation, route }) {
  const friends = route.params.members;
  const [textSearch, setSearch] = useState("");
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
          Danh sách thành viên({friends.length})
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
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
          // onPress={() => handleFriendSelect(item.id)}
          >
            <View style={styles.friendContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.username}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: 100,
                }}
              >
                {item.selected ? (
                  <Pressable>
                    <MaterialIcons
                      name="person-add-disabled"
                      size={24}
                      color={COLORS.gray}
                    />
                  </Pressable>
                ) : (
                  <Pressable>
                    <MaterialIcons
                      name="person-add-alt"
                      size={24}
                      color={COLORS.blue}
                    />
                  </Pressable>
                )}
                <Pressable
                  onPress={() =>
                    handleRemoveFriend(item.id, console.log(item.id))
                  }
                  style={{ marginLeft: 20 }}
                >
                  <MaterialIcons
                    name="person-remove"
                    size={24}
                    color={COLORS.red}
                  />
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      />
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
