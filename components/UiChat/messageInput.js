import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants";

const MessageInput = ({ setNewMessage, newMessage, handleSendMessage }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        style={styles.input}
        placeholder="Type your message..."
        onSubmitEditing={handleSendMessage}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageInput;
