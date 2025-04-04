import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { Event } from "../../Types/Event";
import { Link } from "react-router";

interface EventType {
  event: Event;
  userRole: string;
}

const EventCard: React.FC<EventType> = ({ event, userRole }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex flex-col space-y-3 hover:shadow-xl transition duration-300">
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-xl"
      />

      {/* Event Title */}
      <h2 className="text-xl font-semibold text-text">{event.title}</h2>

      {/* Event Description */}
      <p className="text-muted text-sm">{event.description}</p>

      {/* Event Details */}
      <div className="flex items-center text-sm text-muted space-x-4">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-primaryColor" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Volunteers Needed */}
      <div className="flex items-center text-sm text-muted space-x-2">
        <FaUsers className="text-green-500" />
        <span>
          {event.volunteersJoined} / {event.volunteersNeeded} Volunteers
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 grow items-end">
        {userRole === "volunteer" && (
          <button
            type="button"
            className="bg-primaryColor cursor-pointer  text-white px-4 py-2 rounded-lg hover:bg-secondaryColor transition"
          >
            Join Now
          </button>
        )}
        <Link to="/donate">
          <button
            type="button"
            className="bg-red-500 cursor-pointer text-white  px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Donate
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
