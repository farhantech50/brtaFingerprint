import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const api = useApi();
  const { setAuthUser, setToken } = useAuthContext();
  const navigate = useNavigate(); // To handle navigation

  const login = async (userName, password) => {
    try {
      const res = await api.post(`/auth/login`, {
        userName,
        password,
      });

      const data = res.data.data;

      if (data.error) {
        throw new Error(data.error);
      }

      // Check if the status code is 201 (Created)
      if (res.data.statusCode === 201) {
        // Set the user data
        setAuthUser(data);
        //localStorage.setItem("access-token", JSON.stringify(data.accessToken));
        //setToken(data.accessToken); // Directly set the token

        // Navigate to login-data with fromLogin state as true
        navigate("/login-data", { state: { fromLogin: true } });

        return {
          success: true,
          message: data,
        };
      }

      // For non-201 status, just set user data
      localStorage.setItem("access-token", JSON.stringify(data.accessToken));
      setAuthUser(data);
      setToken(data.accessToken);

      return {
        success: true,
        message: data,
      };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          return {
            success: false,
            message: "Invalid Username or Password",
          };
        }
      } else {
        console.log("Network or other error", error);
      }
    }
  };

  return { login };
};
export default useLogin;
