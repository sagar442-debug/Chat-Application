import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import FriendList from "./FriendList";
import useFindConversations from "../../hooks/useFindConversations";
import useConversation from "../../zustand/useConversation";

const FindFriends = () => {
  const { searchInput } = useConversation();
  const { loading, conversations } = useFindConversations(searchInput);
  console.log(conversations);
  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">
        {conversations.map((conversation, idx) => (
          <FriendList
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

export default FindFriends;
