import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EventCard from "../../components/EventCard/EventCard";
import { Event } from "../../Types/Event";

const fetchEvents = async () => {
  const { data } = await axios.get("/api/events.json");
  return data;
};

const Events = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  type userRoleType = "donor" | "volunteer" | "admin";

  const userRole: userRoleType = "volunteer";

  if (isLoading)
    return <p className="text-center text-lg">Loading events...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching events.</p>;

  return (
    <section className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-primaryColor text-center mb-5">
        Upcoming Events
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: Event) => (
          <EventCard key={event.id} event={event} userRole={userRole} />
        ))}
      </div>
    </section>
  );
};

export default Events;
