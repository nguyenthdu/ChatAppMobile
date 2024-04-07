import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const getFileIcon = (fileName) => {
  const iconMapping = {
    txt: "description",
    pdf: "picture-as-pdf",
    doc: "description",
    docx: "description",
    xls: "insert-drive-file",
    xlsx: "insert-drive-file",
    ppt: "slideshow",
    pptx: "slideshow",
  };

  const fileExtension = fileName.split(".").pop().toLowerCase();

  const icon = iconMapping[fileExtension] || "description";

  return icon;
};

const CardFile = ({ fileName }) => {
  let displayFileName = fileName; // Tên file mặc định

  // Kiểm tra xem fileName có phải là một URL không
  if (fileName.startsWith("http")) {
    // Nếu là một URL, lấy tên file từ đường dẫn
    try {
      const url = new URL(fileName);
      displayFileName = url.pathname.split("_").pop(); // Lấy phần cuối cùng của đường dẫn (tên file)
    } catch (error) {
      console.error("Invalid URL:", error);
    }
  }

  const fileIcon = getFileIcon(displayFileName);

  return (
    <View style={styles.card}>
      <MaterialIcons name={fileIcon} size={24} color="black" />
      <Text style={styles.fileName}>{displayFileName}</Text>
    </View>
  );
};

export default CardFile;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
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
    maxWidth: 300,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
