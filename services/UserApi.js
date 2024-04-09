import axios from "../utils/axios-customize";

export const UploadAPI = {
  uploadImage: async (images, userId, recipientId) => {
    try {
      let formData = new FormData();

      images.forEach((image, index) => {
        formData.append(`image${index}`, {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      });
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

  uploadDocument: async (document, userId, recipientId) => {
    try {
      let formData = new FormData();
      formData.append("image", {
        uri: document[0].uri,
        name: document[0].name,
        type: document[0].mimeType,
      });
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
      if (error.response) {
        console.log("Error uploading document:", error.response.data);
      } else {
        console.log("Error uploading document:", error.message);
      }
      return error;
    }
  },
};

export const UserAPI = {};
