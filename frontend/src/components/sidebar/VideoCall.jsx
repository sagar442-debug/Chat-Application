import React, { useState } from "react";
import useWebRTC from "../../hooks/useWebRTC";
import { IoVideocam, IoCall } from "react-icons/io5";

const VideoCall = ({ peerId }) => {
  const { localStreamRef, remoteStreamRef } = useWebRTC(peerId);
  const [inCall, setInCall] = useState(false);

  const handleStartCall = async () => {
    setInCall(true);
    // Initialize call process here
  };

  const handleEndCall = () => {
    setInCall(false);
    // Clean up call resources here
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <video
          id="localVideo"
          ref={localStreamRef}
          autoPlay
          muted
          className="h-16 w-16 border border-gray-300 rounded-md"
        ></video>
        <video
          id="remoteVideo"
          ref={remoteStreamRef}
          autoPlay
          className="h-32 w-32 border border-gray-300 rounded-md"
        ></video>
      </div>
      <div className="flex space-x-4">
        {!inCall ? (
          <button
            onClick={handleStartCall}
            className="btn btn-primary flex items-center space-x-2"
          >
            <IoVideocam />
            <span>Start Call</span>
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            className="btn btn-danger flex items-center space-x-2"
          >
            <IoCall />
            <span>End Call</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
