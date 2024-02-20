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
  const [textName, setTextName] = React.useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.while,
      }}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          backgroundColor: Colors.blue,
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Start")}>
          <Image
            style={{ height: 40, width: 40, marginLeft: 10 }}
            source={require("../../assets/icon/arrow-left-white.png")}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: Fonts.roboto,
            marginLeft: 10,
          }}
        >
          Tạo tài khoản
        </Text>
      </View>
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: Colors.gray,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "black",
            fontFamily: Fonts.roboto,
            marginLeft: 10,
          }}
        >
          Sử dụng tên thật giúp bạn bè dễ nhận ra bạn
        </Text>
      </View>
      <TextInput
        placeholder="Tên của bạn"
        value={textName}
        underlineColor={Colors.blue}
        activeUnderlineColor={Colors.blue}
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
