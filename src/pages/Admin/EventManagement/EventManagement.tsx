// pages/admin/EventManagement.tsx
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import EventModal from "../../../components/EventModal/EventModal";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

interface EventFormData {
  title: string;
  description: string;
  organizer: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  image?: File | null;
}

// Corrected Event interface
export interface Event {
  _id?: string | undefined;
  title: string;
  description: string;
  location: string;
  organizer: string;
  time: string;
  volunteersNeeded: number;
  image: string;
  status?: "upcoming" | "completed" | "cancelled";
}

const dummyEvents: Event[] = [
  {
    _id: "1",
    title: "Tree Plantation Drive",
    description: "hjshddhdkdk",
    time: "2025-05-10",
    organizer: "ajdhd",
    volunteersNeeded: 20,
    location: "Dhaka, Bangladesh",
    image: "",
    status: "upcoming",
  },
];

interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (row: T) => React.ReactNode;
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Event | undefined>();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event._id !== id));
    }
  };

  const handleEdit = (event: Event) => {
    // Map `time` to `date` and fix any mismatches for form default values
    setEditData({
      title: event.title,
      description: event.description,
      location: event.location,
      organizer: event.organizer,
      time: event.time,
      volunteersNeeded: event.volunteersNeeded,
      image: event.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: EventFormData) => {
    try {
      let photoURL = typeof data.image === "string" ? data.image : "";

      if (data.image instanceof FileList && data.image[0]) {
        const formData = new FormData();
        formData.append("key", import.meta.env.VITE_IMGBB_API_KEY);
        formData.append("image", data.image[0]);

        const res = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        photoURL = res.data.data.url;
      }

      const newEvent: Event = {
        title: data.title,
        description: data.description,
        location: data.location,
        time: data.time,
        volunteersNeeded: data.volunteersNeeded,
        image: photoURL,
        organizer: "GreenImpact Admin", // Or pull from context
        status: "upcoming",
      };

      await saveEventToDB(newEvent);
    } catch (error) {
      console.error("Error submitting event:", error);
    }

    setIsModalOpen(false);
    setEditData(undefined);
  };

  const saveEventToDB = async (event: Event) => {
    try {
      const res = await axiosSecure.post("/events", event);
      console.log(res.data);
    } catch (error) {
      console.error("Error saving event to DB:", error);
    }
  };

  const columns: Column<Event>[] = [
    { key: "title", label: "Title" },
    { key: "time", label: "Date" },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      render: (row: Event) => row.status?.toUpperCase() || "N/A",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Event) => (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id!)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primaryColor">Manage Events</h2>
        <button
          onClick={() => {
            setEditData(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center cursor-pointer gap-2 bg-primaryColor hover:bg-secondaryColor text-white px-4 py-2 rounded-lg shadow"
        >
          <FaPlus /> Create New Event
        </button>
      </div>

      <Table columns={columns} data={events} />

      {events.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No events available.
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={editData}
      />
    </section>
  );
};

export default EventManagement;
