import { configureStore } from "@reduxjs/toolkit";
import  chatSlice  from "./changeChatConversation";
 const store = configureStore({
  reducer: { chat: chatSlice },
});
export default store;

