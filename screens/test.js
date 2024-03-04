// import React, { useState, useEffect } from "react";
// import { Image, View, Pressable, Text } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { COLORS } from "../constants";

// export default function ImageComponent() {
//   const [image, setImage] = useState(null);
//   const [isImageSelected, setIsImageSelected] = useState(false);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setIsImageSelected(true);
//     }
//   };

//   return (
//     <View>
//       {isImageSelected ? (
//         <Pressable
//           onPress={pickImage}
//           style={{
//             height: 150,
//             width: 150,
//             borderRadius: 100,
//             justifyContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             marginTop: 20,
//           }}
//         >
//           <Image
//             source={{ uri: image }}
//             style={{
//               resizeMode: "cover",
//               width: 150,
//               height: 150,
//               borderRadius: 100,
//             }}
//           />
//         </Pressable>
//       ) : (
//         <Pressable
//           onPress={pickImage}
//           style={{
//             height: 150,
//             width: 150,
//             borderRadius: 50,
//             justifyContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             marginTop: 20,
//           }}
//         >
//           <Text style={{ color: COLORS.blue }}>Chọn ảnh</Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }
