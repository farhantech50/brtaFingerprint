import { jwtDecode } from "jwt-decode";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("access-token") || null)
  );
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isCircleAdmin, setIsCircleAdmin] = useState(false);
  const [isOperator, setIsOperator] = useState(false);

  useEffect(() => {
    if (!token) return;
    const extractedData = extractDataFromToken(token);
    if (extractedData && extractedData.userRole) {
      setAuthUser({
        ...authUser,
        profileName: extractedData.profileName,
        userName: extractedData.userName,
        branchId: extractedData.branchId,
        branchName: extractedData.branchName,
      });
      const userRole = extractedData.userRole;
      setIsSuperAdmin(userRole === "SUPER_ADMIN");
      setIsCircleAdmin(userRole === "CIRCLE_ADMIN");
      setIsOperator(userRole === "OPERATOR");
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
      profileName: decodedToken.profileName,
      userName: decodedToken.userName,
      branchId: decodedToken.branchId,
      branchName: decodedToken.branchName,
    }; // Ensure the correct field is used
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    return null;
  }
};
