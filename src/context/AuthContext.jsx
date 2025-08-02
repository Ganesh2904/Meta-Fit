import { createContext, useContext, useEffect, useState } from "react";
import { account, databases, DATABASE_ID, COLLECTION_ID } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch {
      setUser(null);
    }
  };

  const signup = async (email, password) => {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password); // Auto-login after signup
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
    <AuthContext.Provider
      value={{ user, signup, login, logout, getUser, databases, DATABASE_ID, COLLECTION_ID }}
    >
      {children}
    </AuthContext.Provider>
  );
};
