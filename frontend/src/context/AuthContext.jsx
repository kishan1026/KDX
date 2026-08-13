import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user
  const checkAuth = async () => {
    try {
      const { data } = await api.get("/users/current-user");

      setUser(data.user);
    } catch (error) {
      // 401 simply means user is not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);