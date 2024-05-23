import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { FriendAPI } from "../../services/FriendApi";
import { getUserCurrent } from "../../utils/AsyncStorage";
import { useFriendStore } from "../../zustand/useFriendStore";

const useGetListRequestSended = () => {
  const currentUser = getUserCurrent();
  const { senderId, setListPendingSended, resetFriendStore } = useFriendStore();

  const getListRequestSended = async (userId) => {
    try {
      const res = await FriendAPI.getListFriendRequestSended(userId);
      if (res && res.data) {
        setListPendingSended(res.data);
      } else {
        ToastAndroid.show("Fail to getListRequestSended", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error: ", error);
      ToastAndroid.show("Lỗi hệ thống. Hãy thử tải lại trang!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (currentUser?.user?.id === senderId) {
      getListRequestSended(senderId);
      resetFriendStore();
    }
  }, [senderId]);

  return { getListRequestSended };
};

export default useGetListRequestSended;
