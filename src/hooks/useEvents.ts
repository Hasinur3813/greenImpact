import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEvents = () => {
  const axios = useAxiosSecure();
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axios.get("/events");
      return data;
    },
  });

  return { events, isLoading, error, refetch };
};

export default useEvents;
