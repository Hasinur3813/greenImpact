import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axios.get("/api/events.json");
      return data;
    },
  });

  return { events, isLoading, error };
};

export default useEvents;
