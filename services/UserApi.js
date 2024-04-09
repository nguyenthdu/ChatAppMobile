import axios from "../utils/axios-customize";

export const UploadAPI = {
  uploadFile: async (file, userId, recipientId, typeUpload) => {
    try {
      let formData = new FormData();

      if (typeUpload === "image") {
        file.forEach((image, index) => {
          formData.append(`image${index}`, {
            uri: image.uri,
            name: image.fileName,
            type: image.mimeType,
          });
        });
      } else {
        file.forEach((document, index) => {
          formData.append(`document${index}`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType,
          });
        });
      }

      formData.append("userId", userId);
      formData.append("recipientId", recipientId);
      formData.append("created_at", new Date().toString());

      const response = await axios.post("/messages/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.log("Error uploading image api:", error);
      return error;
    }
  },
};

export const UserAPI = {};
