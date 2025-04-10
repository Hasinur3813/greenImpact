import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../contexts/AuthProvider";

const useDonations = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const {
    data: donations,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axios.get(
        `/donation/get-all-donations/${user?._id}`
      );
      return data.data.donations;
    },
  });

  return { donations, isLoading, error, refetch };
};

export default useDonations;
