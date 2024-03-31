import React, { useState, useEffect } from "react";
import { Image, View, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
export default function ImageGroupPicker({ onImageSelect }) {
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setIsImageSelected(true);
      // Call onImageSelect here
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <View style={{}}>
      {isImageSelected ? (
        <Pressable
          onPress={pickImage}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: COLORS.blue,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              width: 50,
              height: 50,
              borderRadius: 50,
              borderColor: COLORS.blue,
              borderWidth: 1,
            }}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={pickImage}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.gray,
            borderColor: COLORS.blue,
            borderWidth: 1,
          }}
        >
          <Text
            style={{ color: COLORS.blue, fontSize: 16, textAlign: "center" }}
          >
            Chọn ảnh
          </Text>
        </Pressable>
      )}
    </View>
  );
}
