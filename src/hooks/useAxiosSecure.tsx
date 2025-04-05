import { useEffect } from "react";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log(
            "unauthorized or forbidden request",
            error.response.status
          );
          // remove token from cookies by api calling
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
