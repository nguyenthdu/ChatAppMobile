import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

const Loading = ({ loading, title }) => {
  return (
    (loading && <ActivityIndicator size="large" color="#0000ff" />) || (
      <Text>{title}</Text>
    )
  );
};

export default Loading;

const styles = StyleSheet.create({});
