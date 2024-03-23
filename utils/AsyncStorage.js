import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeCurrentUser = async (currentUser) => {
  try {
    await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log("User data stored successfully.");
  } catch (error) {
    console.log("Error storing user data:", error);
  }
};

export const getUserCurrent = async () => {
  try {
    return await AsyncStorage.getItem("currentUser");
  } catch (error) {
    console.log("Error getting tokens:", error);
    return null;
  }
};

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
