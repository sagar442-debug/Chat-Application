import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import FriendList from "./FriendList";
import useFindConversations from "../../hooks/useFindConversations";
import useConversation from "../../zustand/useConversation";
import usePendingRequests from "../../hooks/usePendingRequests";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = () => {
  const { searchInput } = useConversation();
  const { loading, conversations } = usePendingRequests();
  console.log(conversations);
  return (
    <>
      <h2 className="px-3 ">Requests:</h2>
      <div className="py-2 flex flex-col overflow-auto">
        {conversations.map((conversation, idx) => (
          <FriendRequestList
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </>
  );
};

export default FriendRequests;
