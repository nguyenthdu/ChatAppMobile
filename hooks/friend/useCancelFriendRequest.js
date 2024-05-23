import { ToastAndroid } from "react-native";
import { FriendAPI } from "../../services/FriendApi";
import { getUserCurrent } from "../../utils/AsyncStorage";
import useGetListRequestPending from "./useGetListRequestPending";

const useCancelFriendRequest = () => {
  const currentUser = getUserCurrent();
  const { getListRequestPending } = useGetListRequestPending();

  const cancelFriendRequest = async (receiverId) => {
    try {
      const res = await FriendAPI.cancelFriendRequest({ receiverId });
      if (res.data) {
        ToastAndroid.show("Hủy lời mời kết bạn thành công!", ToastAndroid.SHORT);

        getListRequestPending(currentUser?.user?.id);
      } else {
        ToastAndroid.show("Hủy lời mời kết bạn thất bại!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error: ", error);
      ToastAndroid.show("Lỗi hệ thống. Hãy thử tải lại trang!", ToastAndroid.SHORT);
    }
  };

  return { cancelFriendRequest };
};

export default useCancelFriendRequest;
