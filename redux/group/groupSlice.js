import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   isLoading: true,
  group: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    doSetGroup: (state, action) => {
      //   state.isLoading = false;
      state.group = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { doSetGroup } = groupSlice.actions;

export default groupSlice.reducer;
