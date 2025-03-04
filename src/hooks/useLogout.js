import { useAuthContext } from "../contexts/authContext";
import axios from "axios";

const useLogout = () => {
  const { setAuthUser } = useAuthContext(); // To update the authenticated user state

  const logout = async () => {
    try {
      //   // Send a logout request to the backend
      //   const res = await axios.post(`http://localhost:3000/api/auth/logout`, {});

      localStorage.removeItem("user-details");
      localStorage.removeItem("access-token");
      setAuthUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { logout };
};

export default useLogout;
