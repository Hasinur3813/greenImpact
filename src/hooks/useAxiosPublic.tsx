import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 5000,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
