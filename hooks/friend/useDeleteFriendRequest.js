import { ToastAndroid } from "react-native";
import { FriendAPI } from "../../services/FriendApi";
import { getUserCurrent } from "../../utils/AsyncStorage";
import useGetListRequestPending from "./useGetListRequestPending";

const useDeleteFriendRequest = () => {
  const currentUser = getUserCurrent();
  const { getListRequestPending } = useGetListRequestPending();

  const deleteFriendRequest = async (senderId) => {
    try {
      const res = await FriendAPI.deleteFriendRequest({ senderId });
      if (res.data) {
        ToastAndroid.show("Xóa lời mời kết bạn thành công!", ToastAndroid.SHORT);
        getListRequestPending(currentUser?.user?.id);
      } else {
        ToastAndroid.show("Xóa lời mời kết bạn thất bại!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error: ", error);
      ToastAndroid.show("Lỗi hệ thống. Hãy thử tải lại trang!", ToastAndroid.SHORT);
    }
  };

  return { deleteFriendRequest };
};

export default useDeleteFriendRequest;
