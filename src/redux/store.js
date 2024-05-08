import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./changeChatConversation";
import authSlice from "./authSlice";
import coachDataSlice from "./coachDataSlice";
const store = configureStore({
  reducer: { chat: chatSlice, auth: authSlice, coach: coachDataSlice },
});
export default store;
