import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu access token và refresh token vào AsyncStorage
export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    console.log("Tokens saved successfully");
  } catch (error) {
    console.log("Error saving tokens:", error);
  }
};

// Lấy access token và refresh token từ AsyncStorage
export const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error getting tokens:", error);
    return { accessToken: null, refreshToken: null };
  }
};

// Xóa access token và refresh token khỏi AsyncStorage
export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    console.log("Tokens cleared successfully");
  } catch (error) {
    console.log("Error clearing tokens:", error);
  }
};
