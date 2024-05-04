import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./changeChatConversation";
import authSlice from "./authSlice";
const store = configureStore({
  reducer: { chat: chatSlice, auth: authSlice },
});
export default store;
