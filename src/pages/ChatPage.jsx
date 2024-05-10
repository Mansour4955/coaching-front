import ConversationChat from "../components/ConversationChat";
import SidebarChat from "../components/SidebarChat";

const ChatPage = () => {
  return (
    <div className="flex justify-center mb-10  gap-x-10 pt-5 px-4 bg-white_color">
      <div className="w-[80%] max-xl:w-[85%] max-lg:w-[90%] flex flex-col gap-10">
        <div className="flex justify-center p-4 bg-white">
          <div className="w-full p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <div className="flex w-full ">
          <SidebarChat/>
          <ConversationChat/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
