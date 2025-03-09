import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";
//import dummyLogin from "../utils/dummyLogin";

const useLogin = () => {
  const api = useApi();
  const { setAuthUser, setToken } = useAuthContext();
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
      localStorage.setItem("access-token", JSON.stringify(data.accessToken));
      setAuthUser(data);
      setToken(JSON.parse(localStorage.getItem("access-token")));
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
