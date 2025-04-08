import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const MyAssignedEvents = () => {
  interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    status: string;
  }

  const [assignedEvents, setAssignedEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate fetching assigned events
    setAssignedEvents([
      {
        id: "1",
        title: "Tree Plantation",
        date: "2025-05-10",
        location: "Dhaka",
        status: "upcoming",
      },
      {
        id: "2",
        title: "Beach Cleanup",
        date: "2025-04-20",
        location: "Cox's Bazar",
        status: "attended",
      },
      {
        id: "3",
        title: "Climate Awareness Campaign",
        date: "2025-06-15",
        location: "Chittagong",
        status: "upcoming",
      },
    ]);
  }, []);

  return (
    <section className="p-4 ">
      <h2 className="text-4xl font-extrabold text-primaryColor mb-8">
        My Assigned Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedEvents.map((event) => (
          <div
            key={event.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 duration-300"
          >
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              {event.title}
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              {event.date} - {event.location}
            </p>

            <div className="flex justify-between items-center">
              <p
                className={`font-semibold text-lg ${
                  event.status === "attended"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {event.status === "attended" ? (
                  <>
                    <FaCheckCircle className="inline-block mr-2 text-green-600" />
                    Attended
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="inline-block mr-2 text-yellow-500" />
                    Upcoming
                  </>
                )}
              </p>
              <button className="px-6 py-2 text-white bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 rounded-full hover:scale-110 transform transition duration-300">
                <FaEye className="inline-block mr-2" /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignedEvents.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No events assigned yet. Stay tuned for upcoming events!
        </div>
      )}
    </section>
  );
};

export default MyAssignedEvents;
