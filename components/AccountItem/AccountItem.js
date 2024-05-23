import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants";

const AccountItem = ({ data, title = "", onClick, children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: data?.avatar }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 90,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...FONTS.body3 }}>{data?.username}</Text>
        </View>
      </View>
      {onClick ? (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{title}</Text>
      )}
      {children}
    </View>
  );
};

export default AccountItem;
