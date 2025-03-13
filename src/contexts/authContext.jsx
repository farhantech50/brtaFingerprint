import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [loginLandData, setLoginLandData] = useState({});
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("access-token") || null)
  );
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isCircleAdmin, setIsCircleAdmin] = useState(false);
  const [isOperator, setIsOperator] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => (authUser ? true : false));

  useEffect(() => {
    if (token) {
      // If token exists, decode it and extract user data
      const extractedData = extractDataFromToken(token);
      if (extractedData && extractedData.userRole) {
        setAuthUser({
          firstName: extractedData.firstName,
          userName: extractedData.userName,
          branchId: extractedData.branchId,
          branchName: extractedData.branchName,
        });
        const userRole = extractedData.userRole;
        setIsSuperAdmin(userRole === "SUPER_ADMIN");
        setIsCircleAdmin(userRole === "CIRCLE_ADMIN");
        setIsOperator(userRole === "OPERATOR");
        setIsLoggedIn(true); // Set user as logged in
      } else {
        setIsLoggedIn(false); // Invalid token
      }
    } else {
      setIsLoggedIn(false); // No token, user is not logged in
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isSuperAdmin,
        isCircleAdmin,
        isOperator,
        setToken,
        setIsLoggedIn,
        isLoggedIn,
        loginLandData,
        setLoginLandData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Function to decode JWT token
const extractDataFromToken = (token) => {
  try {
    if (!token) {
      throw new Error("Empty Token");
    }
    // Decode the token using jwt-decode
    const decodedToken = jwtDecode(token);

    return {
      userRole: decodedToken.sub,
      firstName: decodedToken.firstName,
      userName: decodedToken.userName,
      branchId: decodedToken.branchId,
      branchName: decodedToken.branchName,
    };
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    return null;
  }
};
