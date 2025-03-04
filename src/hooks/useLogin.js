import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";
//import dummyLogin from "../utils/dummyLogin";

const useLogin = () => {
  const api = useApi();
  const { setAuthUser } = useAuthContext();
  const login = async (userName, password) => {
    try {
      const res = await api.post(`/auth/login`, {
        userName,
        password,
      });
      const data = res.data.data;
      //const data = dummyLogin(userName);
      if (data.error) {
        throw new Error(data.error);
      }
      // localStorage
      localStorage.setItem("user-details", JSON.stringify(data));
      localStorage.setItem("access-token", JSON.stringify(data.accessToken));
      setAuthUser(data);
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
