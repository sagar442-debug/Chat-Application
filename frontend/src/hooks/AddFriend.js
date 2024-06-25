import React, { useState } from "react";
import toast from "react-hot-toast";

const useAddFriend = () => {
  const [loading, setLoading] = useState(false);

  const addingFriend = async (friendId) => {
    // Ensure friendId is used here
    setLoading(true);
    try {
      const res = await fetch("/api/users/add-friend", {
        // Ensure correct API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });

      const data = await res.json();
      console.log(data);
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

  return { loading, addingFriend };
};

export default useAddFriend;
