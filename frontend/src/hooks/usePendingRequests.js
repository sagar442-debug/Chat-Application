import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const usePendingRequests = () => {
  const [loading, setLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/pending-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  return { conversations, setConversations, loading };
};

export default usePendingRequests;
