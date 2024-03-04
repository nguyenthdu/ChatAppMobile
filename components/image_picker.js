import React, { useState, useEffect } from "react";
import { Image, View, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
export default function ImagePickerComponent({ onImageSelect }) {
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  onImageSelect(image);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsImageSelected(true);
    }
  };

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {isImageSelected ? (
        <Pressable
          onPress={pickImage}
          style={{
            height: 120,
            width: 120,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderWidth: 1,
            borderColor: COLORS.blue,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              width: 120,
              height: 120,
              borderRadius: 100,
              borderColor: COLORS.blue,
              borderWidth: 1,
            }}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={pickImage}
          style={{
            height: 120,
            width: 120,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: COLORS.gray,
            borderColor: COLORS.blue,
            borderWidth: 1,
          }}
        >
          <Text
            style={{ color: COLORS.blue, fontSize: 16, textAlign: "center" }}
          >
            Chọn ảnh đại diện
          </Text>
        </Pressable>
      )}
    </View>
  );
}
