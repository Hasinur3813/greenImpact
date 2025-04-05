import React, { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
interface loginData {
  email: string;
  password: string;
}
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  register: (userData: User) => Promise<void>;
  login: (userData: loginData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const axios = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Detect user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get("/auth/user/me");

        if (res.data.success) {
          setUser(res.data.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  const register = async (userData: User) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/register", userData);
      if (data.success) {
        setUser(data.data.user);
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: loginData) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", userData);
      if (data.success) {
        setUser(data.data.user);
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const { data } = await axios.get("/auth/logout");
    if (data.success) {
      setUser(null);
      toast.success("You have successfully logged out!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, register, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
