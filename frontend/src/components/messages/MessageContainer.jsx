import { useEffect, useRef, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import VideoCall from "../../components/sidebar/VideoCall.jsx";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import useCallingUser from "../../zustand/useCallingUser.js";
import { ImCross } from "react-icons/im";
import ReactWebcam from "react-webcam";
import { io } from "socket.io-client";
import IncomingCall from "./IncomingCall.jsx";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {
    setIsCalling,
    isCalling,
    setCurrentUser,
    currentUser,
    setContinuingCall,
    continuingCall,
  } = useCallingUser();
  useEffect(() => {
    if (currentUser !== selectedConversation) {
      setIsCalling(false);
    }
  }, [selectedConversation]);

  const onCall = () => {
    if (isCalling) {
      setIsCalling(false);
      setCurrentUser(null);
      setContinuingCall(false);
    } else {
      setCurrentUser(selectedConversation);
      setIsCalling(true);
      setContinuingCall(true);
    }
  };

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#2c343d] px-4 py-2 flex justify-between items-center">
            <div>
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-100 font-bold ">
                {selectedConversation.fullName}
              </span>
            </div>
            {!isCalling ? (
              <div className="space-x-5 flex items-center">
                <button onClick={onCall}>
                  <IoCall />
                </button>
                <button onClick={onCall}>
                  <FaVideo />
                </button>
              </div>
            ) : (
              <div className="space-x-5 flex items-center">
                <button onClick={onCall}>
                  <ImCross className="text-gray-400" />
                </button>
              </div>
            )}
          </div>
          {continuingCall && (
            <CallOption className={`${isCalling ? "" : "hidden"}`} />
          )}
          {/* <IncomingCall /> */}

          {isCalling ? "" : <Messages />}
          {isCalling ? "" : <MessageInput />}
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-1 items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

// Call option component

const CallOption = () => {
  const {
    isCalling,
    setIsCalling,
    setCurrentUser,
    setContinuingCall,
    continuingCall,
    currentUser,
  } = useCallingUser();
  const { selectedConversation, setSelectedConversation } = useConversation();

  const socket = useRef(null);
  const localStream = useRef(null);
  const remoteVideoRef = useRef(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const endCall = () => {
    socket.disconnect();

    // Stop local media stream
    const stream = webcamRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      webcamRef.current.srcObject = null;
    }
  };

  const onEndCall = () => {
    setIsCalling(false);
    setContinuingCall(false);
    endCall();
  };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col justify-center items-center bg-[#2c343d]">
        <div className="bg-black w-full h-[300px]">Remote video display</div>
        <div className="flex space-x-3 mt-2">
          <button className="bg-blue-400 hover:bg-blue-500 duration-100 transition-all rounded-full p-2">
            <FaVideo className="text-white" />
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 duration-100 transition-all rounded-full p-2">
            <BsFillMicMuteFill className="text-white" />
          </button>
          <button
            onClick={onEndCall}
            className="bg-red-600 rounded-full p-2 hover:bg-red-700 duration-100 transition-all"
          >
            <MdCallEnd className="text-white" />
          </button>
        </div>
      </div>
      <div className="relative w-36 h-20 bottom-52 -right-80">
        {continuingCall && (
          <ReactWebcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            className="w-[28rem]"
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
