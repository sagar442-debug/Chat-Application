import React from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";

const IncomingCall = ({ onAcceptCall, onRejectCall }) => {
  return (
    <div className="flex-1 h-full w-full  ">
      <div className=" flex h-full flex-col items-center justify-center">
        <h1 className="text-white font-semibold">Incoming call...</h1>
        <div className="bg-[#2c343d]  p-7 space-x-5 rounded-full">
          <button
            className="bg-blue-400 rounded-full p-2 text-white hover:bg-blue-500 duration-100 transition-all"
            onClick={onAcceptCall}
          >
            <IoCall />
          </button>
          <button
            className="bg-blue-400 rounded-full p-2 text-white hover:bg-blue-500 duration-100 transition-all"
            onClick={onAcceptCall}
          >
            <FaVideo />
          </button>
          <button
            className="bg-red-600 rounded-full p-2 text-white hover:bg-red-700 duration-100 transition-all"
            onClick={onRejectCall}
          >
            <MdCallEnd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
