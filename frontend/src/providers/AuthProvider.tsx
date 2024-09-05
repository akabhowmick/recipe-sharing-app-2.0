import { useState, createContext, useContext, ReactNode, useEffect } from "react";
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
  setUserOnRefresh: () => Promise<boolean>;
  logout: () => void;
}

const url = "http://localhost:8000/api/";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Helper function to get token from localStorage
  const getAccessToken = () => localStorage.getItem("accessToken");

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${url}login/`, { email, password });
      const loggedInUser = response.data;
      if (loggedInUser) {
        handleToken({ email, password });
      }
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const handleToken = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${url}token/`, credentials);
      console.log(response);
      const { access, refresh, user } = response.data;
      setUser(user);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (error) {
      console.error("Error handling token", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await axios.post(`${url}token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        return access;
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logout(); // Optionally log out user if token refresh fails
    }
  };

  const setUserOnRefresh: () => Promise<boolean> = async () => {
    const accessToken = getAccessToken();

    if (accessToken) {
      try {
        // Make the request with the existing access token
        const response = await axios.get(`${url}protected/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data.user);
        return true; // User successfully fetched
      } catch (error: unknown) {
        // Handle error as an unknown type
        if (isAxiosError(error) && error.response?.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              // Retry the request with new access token
              const retryResponse = await axios.get(`${url}protected/`, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              setUser(retryResponse.data.user);
              return true; // User successfully fetched with refreshed token
            } catch (retryError: unknown) {
              console.error("Retry failed:", retryError);
            }
          }
        } else {
          console.error("An error occurred:", error);
        }
      }
    }

    return false; // If the process failed at any point
  };

  // Custom type guard for narrowing unknown error to AxiosError
  function isAxiosError(error: unknown): error is import("axios").AxiosError {
    return (error as import("axios").AxiosError).isAxiosError !== undefined;
  }

  useEffect(() => {
    setUserOnRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${url}register/`, { name, email, password });
      const newUser: User = response.data;
      setUser(newUser);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        setUserOnRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
