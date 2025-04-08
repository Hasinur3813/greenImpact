import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const RoleBaseRoute = ({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) => {
  const { user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (user?.role === allowedRole) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [loading, user, allowedRole]);

  if (loading || isAuthorized === null) {
    return <Loader />;
  }

  if (!isAuthorized) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default RoleBaseRoute;
