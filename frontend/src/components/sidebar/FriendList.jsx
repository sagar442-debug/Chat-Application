import { useSocketContext } from "../../context/SocketContext";
import AddFriend from "../../hooks/AddFriend";
import useConversation from "../../zustand/useConversation";
import { IoPersonAddSharp } from "react-icons/io5";

const FriendList = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { loading, addingFriend } = AddFriend(conversation._id);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const onAdd = async (e) => {
    e.preventDefault();
    await addingFriend(conversation._id);
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

            {loading ? (
              <span className="loading spinner"></span>
            ) : (
              <button onClick={onAdd}>
                <IoPersonAddSharp />
              </button>
            )}

            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default FriendList;
