import { ToastAndroid } from "react-native";
import { FriendAPI } from "../../services/FriendApi";
import { getUserCurrent } from "../../utils/AsyncStorage";
import useGetListRequestPending from "./useGetListRequestPending";

const useAcceptFriendRequest = () => {
  const currentUser = getUserCurrent();
  const { getListRequestPending } = useGetListRequestPending();

  const acceptFriendRequest = async (senderId) => {
    try {
      const res = await FriendAPI.acceptFriendRequest({ senderId });
      if (res.data) {
        ToastAndroid.show("Accept friend successfully", ToastAndroid.SHORT);

        getListRequestPending(currentUser?.user?.id);
      } else {
        ToastAndroid.show("Fail to accept friend", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error: ", error);
      ToastAndroid.show("Lỗi hệ thống. Hãy thử tải lại trang!", ToastAndroid.SHORT);
    }
  };

  return { acceptFriendRequest };
};

export default useAcceptFriendRequest;
