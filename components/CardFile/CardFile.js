import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardFile = ({ fileName }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.fileName}>{fileName}</Text>
    </View>
  );
};

export default CardFile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
