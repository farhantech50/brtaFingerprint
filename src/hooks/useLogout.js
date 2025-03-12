import { useAuthContext } from "../contexts/authContext";
import axios from "axios";

const useLogout = () => {
  const { setAuthUser, setIsLoggedIn } = useAuthContext(); // To update authenticated user state and isLoggedIn

  const logout = async () => {
    try {
      // Optionally, send a logout request to your backend API (if required)
      // const res = await axios.post('http://localhost:3000/api/auth/logout', {});

      setIsLoggedIn(false);

      // Clear local storage data
      localStorage.removeItem("user-details");
      localStorage.removeItem("access-token");

      // Reset the user state
      setAuthUser(null); // Clear the user data
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { logout };
};

export default useLogout;
