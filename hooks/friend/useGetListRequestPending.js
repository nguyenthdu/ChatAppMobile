import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { FriendAPI } from "../../services/FriendApi";
import { getUserCurrent } from "../../utils/AsyncStorage";
import { useFriendStore } from "../../zustand/useFriendStore";

const useGetListRequestPending = () => {
  const currentUser = getUserCurrent();
  const { receiverId, setListPendingRequest, resetFriendStore } = useFriendStore();

  const getListRequestPending = async (userId) => {
    try {
      const res = await FriendAPI.getListFriendRequestPending(userId);
      if (res && res.data) {
        setListPendingRequest(res.data);
      } else {
        ToastAndroid.show("Fail to getListRequestPending", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error: ", error);
      ToastAndroid.show("Lỗi hệ thống. Hãy thử tải lại trang!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (currentUser?.user?.id === receiverId) {
      getListRequestPending(receiverId);
      resetFriendStore();
    }
  }, [receiverId]);

  return { getListRequestPending };
};

export default useGetListRequestPending;
