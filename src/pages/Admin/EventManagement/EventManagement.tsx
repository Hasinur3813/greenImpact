import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import EventModal from "../../../components/EventModal/EventModal";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Event } from "../../../Types/Event";
import toast from "react-hot-toast";
import useEvents from "../../../hooks/useEvents";
import Loader from "../../../components/Loader/Loader";

export interface EventFormData {
  _id?: string;
  title: string;
  description: string;
  organizer: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  image?: FileList | File | null | string | undefined;
}

interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (row: T) => React.ReactNode;
}

const EventManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EventFormData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const axiosSecure = useAxiosSecure();
  const { events, isLoading, refetch } = useEvents();

  const handleDelete = (id: string) => {
    console.log("delete ", id);
  };

  const handleEdit = (event: Event) => {
    setEditData(event);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: EventFormData) => {
    try {
      setLoading(true);
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
        ...data,
        image: photoURL,
        organizer: data.organizer || "GreenImpact Admin",
        status: "upcoming",
      };
      if (editData?._id) {
        console.log(newEvent);
        // Update existing event
        await updateEventInDB(editData._id, newEvent);
        toast.success("Event Updated Successfully.");
      } else {
        console.log("creating event");
        // Create new event
        await saveEventToDB(newEvent);
        toast.success("Event Created Successfully.");
      }
      refetch();
    } catch {
      toast.error(
        editData ? "Failed to update event!" : "Failed to create event!"
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setEditData(undefined);
    }
  };

  const updateEventInDB = async (id: string, event: Event) => {
    const res = await axiosSecure.patch(`/events/${id}`, event);
    console.log(res.data);
  };

  const saveEventToDB = async (event: Event) => {
    await axiosSecure.post("/events", event);
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

  if (isLoading) {
    return <Loader />;
  }

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

      <Table columns={columns} data={events && events} />

      {events?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No events available.
        </div>
      )}

      {isModalOpen && (
        <EventModal
          onClose={() => {
            setIsModalOpen(false);
            setEditData(undefined);
          }}
          onSubmit={handleSubmit}
          defaultValues={editData}
          loading={loading}
        />
      )}
    </section>
  );
};

export default EventManagement;
