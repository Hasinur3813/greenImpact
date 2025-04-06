import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      toast.error("Please log in first!");
      navigate("/");
    }
  }, [user, navigate, loading]);

  if (loading) {
    return <Loader />;
  } else {
    return children;
  }
};

export default PrivateRoute;
