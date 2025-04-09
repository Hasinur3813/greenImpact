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
import Modal from "../../../components/shared/Modal/Modal";

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
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
}

const EventManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EventFormData | undefined>(
    undefined
  );
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deletionId, setDeletioId] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const axiosSecure = useAxiosSecure();
  const { events, isLoading, refetch } = useEvents();

  const handleDelete = async () => {
    try {
      const { data } = await axiosSecure.delete(`/event/delete/${deletionId}`);
      if (data.success) {
        toast.success("The event has been deleted!");
        refetch();
      } else {
        toast.error("Failed to delete the event!");
      }
    } catch {
      toast.error("Failed to delete the event!");
    } finally {
      setDeletioId(undefined);
      setOpenDeleteModal(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditData(event);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: EventFormData) => {
    try {
      setLoading(true);
      let photoURL = typeof data.image === "string" ? data.image : "";

      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("key", import.meta.env.VITE_IMGBB_API_KEY);
        formData.append("image", data.image);

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
        // Update existing event
        await updateEventInDB(editData._id, newEvent);
        toast.success("Event Updated Successfully.");
      } else {
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
    await axiosSecure.patch(`/events/${id}`, event);
  };

  const saveEventToDB = async (event: Event) => {
    await axiosSecure.post("/events", event);
  };

  const columns: (Column<Event> & { key: keyof Event | "action" })[] = [
    { key: "title", label: "Title" },
    { key: "time", label: "Date" },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      render: (row: Event) => row.status?.toUpperCase() || "N/A",
    },
    {
      key: "action",
      label: "Actions",
      render: (row: Event) => (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleEdit(row)}
            className="text-primaryColor/60 cursor-pointer hover:text-primaryColor"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              setDeletioId(row._id);
              setOpenDeleteModal(true);
            }}
            className="text-red-600 cursor-pointer hover:text-red-800"
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

      {/* modal for creating/updating event */}
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

      {/* modal for deletion event */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => handleDelete()}
        danger={true}
      />
    </section>
  );
};

export default EventManagement;
