import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const axios = useAxiosSecure();
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/admin/get-all-users");

      return data.data.users;
    },
  });

  return { users, isLoading, error, refetch };
};

export default useUsers;
