import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { COLORS } from "../../constants";

const ChatHeader = ({ recipient, group, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={[{ marginRight: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.username}>
          {recipient?.username || group?.name}
        </Text>
      </View>
      <View style={styles.callButtons}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="call-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="videocam-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        {group && (
          <TouchableOpacity
            onPress={() => navigation.navigate("OptionGroup")}
            style={styles.iconContainer}
          >
            <MaterialIcons name="view-list" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    backgroundColor: COLORS.blue,
  },
  username: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  callButtons: {
    flexDirection: "row",
  },
  iconContainer: {
    marginLeft: 30,
  },
};

export default ChatHeader;
