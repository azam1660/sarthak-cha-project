import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.push("/auth/login");
  }, []);

  return getToken() ? children : null;
};

export default ProtectedRoute;
