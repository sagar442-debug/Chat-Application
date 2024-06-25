import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { FaUsers } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import FindFriends from "./FindFriends";
import { MdPersonAddAlt1 } from "react-icons/md";

import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";

const Sidebar = () => {
  const { sidebarPage, setSidebarPage } = useConversation();

  return (
    <div className="border-r border-slate-50 p-4 flex flex-col">
      <div>
        <SearchInput />
        <div className="flex items-center justify-center space-x-16  mt-5 text-2xl ">
          <div
            className={`hover:text-blue-400 duration-100 ${
              sidebarPage == "friends" ? "text-blue-400" : ""
            }`}
          >
            <button onClick={() => setSidebarPage("friends")}>
              <FaUsers />
            </button>
          </div>
          <div
            className={`hover:text-blue-400 duration-100 ${
              sidebarPage == "FindFriends" ? "text-blue-400" : ""
            }`}
          >
            <button onClick={() => setSidebarPage("FindFriends")}>
              <FaAddressBook />
            </button>
          </div>
          <div
            className={`hover:text-blue-400 duration-100 ${
              sidebarPage == "FriendRequests" ? "text-blue-400" : ""
            }`}
          >
            <button onClick={() => setSidebarPage("FriendRequests")}>
              <MdPersonAddAlt1 />
            </button>
          </div>
        </div>
      </div>
      <div className="divider py-0 my-0 "></div>
      {sidebarPage == "friends" && <Conversations />}
      {sidebarPage == "FindFriends" && <FindFriends />}
      {sidebarPage == "FriendRequests" && <FriendRequests />}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
