import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../redux/group/groupSlice";

export const store = configureStore({
  reducer: {
    group: groupReducer,
  },
});
