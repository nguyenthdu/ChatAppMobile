import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import Colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import { TextInput } from "react-native-paper";
export default function Register({ navigation }) {
  const [textPhone, setTextPhone] = React.useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.while,
      }}
    >
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Image
          style={{ height: 30, width: 30, marginLeft: 10 }}
          source={require("../../assets/icon/left-arrow_black.png")}
        />
      </Pressable>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "black",
          fontFamily: Fonts.roboto,
          marginTop: 50,
          alignSelf: "center",
        }}
      >
        Nhập số điện thoại
      </Text>
      <TextInput
        mode="outlined"
        label="Số điện thoại"
        value={textPhone}
        onChangeText={(textPhone) => setTextPhone(textPhone)}
        outlineStyle={{ borderColor: Colors.blue }}
        activeOutlineColor={Colors.blue}
        right={<TextInput.Icon icon="close" onPress={() => setTextPhone("")} />}
        style={{
          height: 60,
          margin: 10,
          backgroundColor: "white",
          fontSize: 20,
          fontFamily: Fonts.roboto,
          color: Colors.black,
        }}
      />
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={{
          marginTop: 20,
          height: 60,
          width: 200,
          backgroundColor: Colors.blue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: Fonts.roboto,
          }}
        >
          Tiếp tục
        </Text>
      </Pressable>
      <Text
        style={{
          marginTop: 500,
          width: "80%",
          fontSize: 16,
          color: "black",
          fontFamily: Fonts.roboto,
          alignSelf: "center",
          textAlign: "center",
          position: "relative",
          bottom: 20,
        }}
      >
        Tiếp tục đồng nghĩa với việc bạn đồng ý với Điều khoản dịch vụ của Zala
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
