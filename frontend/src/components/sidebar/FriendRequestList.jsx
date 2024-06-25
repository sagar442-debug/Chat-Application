import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { useSocketContext } from "../../context/SocketContext";
import AddFriend from "../../hooks/AddFriend";
import useConversation from "../../zustand/useConversation";
import AcceptFriendRequest from "../../hooks/AcceptFriendRequest";

const FriendRequestList = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { loading, acceptFriendRequest } = AcceptFriendRequest();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const onAdd = async (e) => {
    e.preventDefault();
    await acceptFriendRequest(conversation._id);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <div className="flex items-center text-xl space-x-3 ">
              <button
                onClick={onAdd}
                className="hover:bg-black hover:bg-opacity-30 hover:rounded-full hover:p-1"
              >
                <FaCheck className="text-green-400" />
              </button>
              <button className="hover:bg-black hover:bg-opacity-30 hover:rounded-full hover:p-1">
                <FaRegTimesCircle className="text-red-500" />
              </button>
            </div>{" "}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default FriendRequestList;
