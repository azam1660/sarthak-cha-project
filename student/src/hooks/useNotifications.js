import { useEffect, useState } from "react";
import { getNotifications } from "../utils/api";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await getNotifications();
      setNotifications(data.notifications);
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return notifications;
};

export default useNotifications;
