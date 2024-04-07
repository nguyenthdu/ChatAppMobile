import axios from "../utils/axios-customize";

export const UploadAPI = {
  uploadImage: async (image) => {
    try {
      let formData = new FormData();
      formData.append("image", {
        uri: image[0].uri,
        name: image[0].fileName,
        type: image[0].mimeType,
      });

      const response = await axios.post(
        "/messages/uploadImageAndGetUrl",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      console.log("Error uploading image:", error);
      return error;
    }
  },

  uploadDocument: async (document, userId, recipientId) => {
    try {
      let formData = new FormData();
      formData.append("document", {
        uri: document[0].uri,
        name: document[0].name,
        type: document[0].type,
      });
      formData.append("userId", userId);
      formData.append("recipientId", recipientId);
      formData.append("created_at", new Date());

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
