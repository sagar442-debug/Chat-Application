import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFindConversations = (name) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`api/users/find-friend/${name}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
        console.log(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [name]);

  return { loading, conversations };
};

export default useFindConversations;
