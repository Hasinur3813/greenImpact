import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaClock, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import SummaryCard from "../../../components/SummaryCard/SummaryCard";
import { FiList } from "react-icons/fi";
import { MdUpcoming } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

const events = [
  {
    _id: "1",
    title: "Beach Cleanup Drive",
    description: "Join hands to clean the coastal area.",
    location: "Cox’s Bazar, Bangladesh",
    organizer: "GreenImpact Org",
    time: "April 21, 2025 - 9:00 AM",
    volunteersNeeded: 20,
    image: "https://i.ibb.co/vJbG0W9/beach-cleanup.jpg",
    status: "Upcoming",
  },
  {
    _id: "2",
    title: "Tree Plantation",
    description: "Let's make our city greener.",
    location: "Dhaka University",
    organizer: "GreenImpact Team",
    time: "April 25, 2025 - 10:30 AM",
    volunteersNeeded: 15,
    image: "https://i.ibb.co/z6jFhDR/tree-plant.jpg",
    status: "Ongoing",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function MyAssignedEvents() {
  const [search, setSearch] = useState("");

  const filtered = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-14">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-primaryColor mb-6">
          My Assigned Events
        </h2>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Total Events" value={"5"} icon={<FiList />} />
          <SummaryCard title="Upcoming" value={"2"} icon={<MdUpcoming />} />
          <SummaryCard title="Ongoing" value={"1"} icon={<BsClockHistory />} />
          <SummaryCard
            title="Completed"
            value={"2"}
            icon={<AiOutlineCheckCircle />}
          />
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg mb-6 shadow-sm border border-gray-200">
          <FaSearch className="text-muted" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full outline-none text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Events */}
        {filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <motion.div
                key={event._id}
                custom={i * 0.5}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-text mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted mb-3">{event.description}</p>
                  <div className="text-sm text-muted flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primaryColor" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primaryColor" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-primaryColor" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-secondaryColor/20 text-secondaryColor">
                      {event.status}
                    </span>
                    <button className="text-sm text-white bg-primaryColor px-3 py-1 rounded-lg hover:bg-green-700 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-20"
          >
            <h3 className="text-xl text-muted mb-3">
              No assigned events found
            </h3>
            <p className="text-sm text-gray-500">
              Join new events from the explore section.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
