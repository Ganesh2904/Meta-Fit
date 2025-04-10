import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  };

  const signup = async (email, password) => {
    try {
      await account.create("unique()", email, password);
      await login(email, password); // auto login after signup
    } catch (err) {
      throw new Error(err.message || "Signup failed");
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await getUser();
    } catch (err) {
      throw new Error(err.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
