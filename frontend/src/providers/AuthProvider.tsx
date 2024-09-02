import { useState, createContext, useContext, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const url = "http://localhost:8000/api/";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${url}login/`, { email, password });
      const loggedInUser: User = response.data;
      setUser(loggedInUser);

      handleToken({ email, password });

      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const handleToken = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", credentials);
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (error) {
      console.error("Error handling token", error);
    }
  };

  //  obtain a new one by sending a POST request
  //   const refreshAccessToken = async () => {
  //     try {
  //         const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
  //             refresh: localStorage.getItem("refreshToken"),
  //         });
  //         localStorage.setItem("accessToken", response.data.access);
  //     } catch (error) {
  //         console.error("Token refresh error:", error);
  //         // Handle refresh token expiration (e.g., log the user out)
  //     }
  // };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${url}register/`, { name, email, password });
      const newUser: User = response.data;
      setUser(newUser);
    } catch (error) {
      console.error("Registration failed", error);
      // Handle registration error (e.g., show a message to the user)
    }
  };

  // Logout function
  const logout = () => {
    // Clear user state
    setUser(null);
    // Optionally, make a request to the backend to invalidate the session if necessary
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
