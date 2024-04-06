import React from "react";
import { Pressable, StyleSheet } from "react-native";

const PressableCustom = ({
  onPress,
  loading,
  marginTop,
  height,
  width,
  marginHorizontal,
  backgroundColor,
  justifyContent,
  alignItems,
  borderRadius,
  alignSelf,
  children,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: marginTop,
        height: height,
        width: width,
        marginHorizontal: marginHorizontal,
        backgroundColor: backgroundColor,
        justifyContent: justifyContent,
        alignItems: alignItems,
        borderRadius: borderRadius,
        alignSelf: alignSelf,
        opacity: loading ? 0.5 : 1,
      }}
      disabled={loading}
    >
      {children}
    </Pressable>
  );
};

export default PressableCustom;

const styles = StyleSheet.create({});
