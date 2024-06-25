import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { FaUsers } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import FindFriends from "./FindFriends";
import FriendList from "./FriendList";

const Sidebar = () => {
  const { sidebarPage, setSidebarPage } = useConversation();
  console.log(sidebarPage);

  return (
    <div className="border-r border-slate-50 p-4 flex flex-col">
      <div>
        <SearchInput />
        <div className="flex items-center justify-center space-x-16  mt-5 text-2xl ">
          <div className="">
            <button onClick={() => setSidebarPage("friends")}>
              <FaUsers />
            </button>
          </div>
          <div>
            <button onClick={() => setSidebarPage("FindFriends")}>
              <FaAddressBook />
            </button>
          </div>
          <div>
            <button>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
      <div className="divider mt-1 px-3"></div>
      {sidebarPage == "friends" && <Conversations />}
      {sidebarPage == "FindFriends" && <FindFriends />}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
