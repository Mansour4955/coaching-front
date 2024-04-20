import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theCurrentChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (state, { payload }) => {
      state.theCurrentChat = payload;
    },
  },
});

export const { changeChat } = chatSlice.actions;

export default chatSlice.reducer;
