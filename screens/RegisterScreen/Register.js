// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import React from "react";
// import Colors from "../../themes/Colors";
// import Fonts from "../../themes/Fonts";
// import { TextInput } from "react-native-paper";
// export default function Register({ navigation }) {
//   const [textName, setTextName] = React.useState("");
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Colors.while,
//       }}
//     >
//       <View
//         style={{
//           height: 60,
//           width: "100%",
//           backgroundColor: Colors.blue,
//           flexDirection: "row",
//           alignItems: "center",
//           alignContent: "center",
//         }}
//       >
//         <Pressable onPress={() => navigation.navigate("Start")}>
//           <Image
//             style={{ height: 40, width: 40, marginLeft: 10 }}
//             source={require("../../assets/icon/arrow-left-white.png")}
//           />
//         </Pressable>
//         <Text
//           style={{
//             fontSize: 25,
//             color: "white",
//             fontFamily: Fonts.roboto,
//             marginLeft: 10,
//           }}
//         >
//           Tạo tài khoản
//         </Text>
//       </View>
//       <View
//         style={{
//           height: 40,
//           width: "100%",
//           backgroundColor: Colors.gray,
//           justifyContent: "center",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 13,
//             color: "black",
//             fontFamily: Fonts.roboto,
//             marginLeft: 10,
//           }}
//         >
//           Sử dụng tên thật giúp bạn bè dễ nhận ra bạn
//         </Text>
//       </View>
//       <TextInput
//         mode="outlined"
//         label="Tên của bạn"
//         onChangeText={(textName) => setTextName(textName)}
//         outlineStyle={{ borderColor: Colors.blue }}
//         activeOutlineColor={Colors.blue}
//         value={textName}
//         style={{
//           height: 60,
//           marginVertical: 10,
//           marginHorizontal: 30,
//           backgroundColor: "white",
//           fontSize: 20,
//           fontFamily: Fonts.roboto,
//           color: Colors.black,
//         }}
//       />
//       <Pressable
//         onPress={() => {
//           navigation.navigate("Register_1"), console.log(textName);
//         }}
//         style={{
//           marginTop: 50,
//           marginHorizontal: 30,
//           height: 60,
//           width: "",
//           backgroundColor: Colors.blue,
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: 30,
//           alignSelf: "center",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 20,
//             color: "white",
//             fontFamily: Fonts.roboto,
//           }}
//         >
//           Tiếp tục
//         </Text>
//       </Pressable>
//       <View
//         style={{
//           flexDirection: "row",
//           alignSelf: "center",
//           textAlign: "center",
//           position: "absolute",
//           bottom: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 16,
//             color: "black",
//             fontFamily: Fonts.roboto,
//           }}
//         >
//           Bạn đã có tài khoản?
//         </Text>
//         <Pressable
//           onPress={() => {
//             navigation.navigate("Login");
//           }}
//         >
//           <Text
//             style={{
//               marginLeft: 5,
//               fontSize: 16,
//               color: Colors.blue,
//               fontWeight: "bold",
//               fontFamily: Fonts.roboto,
//             }}
//           >
//             Đăng nhập ngay
//           </Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundColor: Colors.while,
// });
