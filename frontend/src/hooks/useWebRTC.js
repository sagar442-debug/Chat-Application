import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../context/SocketContext";

const useWebRTC = (peerId) => {
  const { socket } = useSocketContext();
  const [remoteStream, setRemoteStream] = useState(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      // Get local media stream
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Display local video stream
      const localVideoElement = document.getElementById("localVideo");
      if (localVideoElement) {
        localVideoElement.srcObject = localStreamRef.current;
      }

      // Initialize peer connection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Using a public STUN server
      });

      // Add local stream tracks to peer connection
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, localStreamRef.current);
      });

      // Handle incoming remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            receiverId: peerId,
          });
        }
      };

      // Listen for signaling messages from server
      socket.on("call-offer", async ({ offer, callerId }) => {
        if (callerId === peerId) {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          socket.emit("call-answer", { answer, callerId });
        }
      });

      socket.on("call-answer", async ({ answer, receiverId }) => {
        if (receiverId === peerId) {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        }
      });

      socket.on("ice-candidate", ({ candidate, senderId }) => {
        if (senderId === peerId) {
          peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        }
      });

      // Clean up on component unmount
      return () => {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.close();
        }
        socket.off("call-offer");
        socket.off("call-answer");
        socket.off("ice-candidate");
      };
    };

    setupWebRTC();
  }, [socket, peerId]);

  // Update remote video element when the remote stream is received
  useEffect(() => {
    if (remoteStream) {
      const remoteVideoElement = document.getElementById("remoteVideo");
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = remoteStream;
      }
    }
  }, [remoteStream]);

  return { localStreamRef, remoteStreamRef, peerConnectionRef };
};

export default useWebRTC;
