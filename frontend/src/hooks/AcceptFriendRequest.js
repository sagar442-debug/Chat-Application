import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AcceptFriendRequest = () => {
  const [loading, setLoading] = useState();

  const acceptFriendRequest = async (requestId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/accept-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, acceptFriendRequest };
};

export default AcceptFriendRequest;
