import React, { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { User } from "../Types/User";
interface loginData {
  email: string;
  password: string;
}

interface asyncResponse {
  success: boolean;
}
interface registerData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "donor" | "volunteer";
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  register: (userData: registerData) => Promise<asyncResponse>;
  login: (userData: loginData) => Promise<asyncResponse>;
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
          // console.log(res.data.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  const register = async (userData: registerData) => {
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
    } else {
      throw new Error("Something went wrong!");
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
