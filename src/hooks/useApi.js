import axios from "axios";
import useLogout from "./useLogout";

const useApi = () => {
  const { logout } = useLogout();

  const api = axios.create({
    baseURL: "http://192.168.78.70:5001/brtafp",
    withCredentials: true,
  });

  // Request Interceptor: Attach token to each request
  api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("access-token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response Interceptor: Handle 401 and 403 errors
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle Unauthorized Access (405)
      if (error.response?.status === 405) {
        alert("Unauthorized access! You do not have permission.");
        window.history.back();
        return Promise.reject(error);
      }

      // If 401 and refresh token failed -> Logout
      if (
        error.response?.status === 401 &&
        originalRequest.url.includes("/newAccessToken")
      ) {
        logout();
        return Promise.reject(error);
      }

      // If 403, attempt token refresh
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loop

        try {
          const { data } = await api.post("/newAccessToken");
          const newAccessToken = data.accessToken;

          if (newAccessToken) {
            localStorage.setItem(
              "access-token",
              JSON.stringify(newAccessToken)
            );
            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest); // Retry the failed request
          }
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
          logout(); // If refresh fails, log out
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
