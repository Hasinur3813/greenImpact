// pages/admin/EventManagement.tsx
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import EventModal from "../../../components/EventModal/EventModal";
export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}
const dummyEvents: Event[] = [
  {
    _id: "1",
    title: "Tree Plantation Drive",
    date: "2025-05-10",
    location: "Dhaka, Bangladesh",
    status: "upcoming",
  },
  {
    _id: "2",
    title: "Beach Cleanup",
    date: "2025-04-15",
    location: "Cox's Bazar",
    status: "completed",
  },
  {
    _id: "3",
    title: "Climate Awareness Campaign",
    date: "2025-06-01",
    location: "Chittagong",
    status: "upcoming",
  },
];
export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
}
interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (row: T) => React.ReactNode;
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EventFormData | undefined>();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event._id !== id));
    }
  };

  const handleEdit = (event: Event) => {
    setEditData({ ...event });
    setIsModalOpen(true);
  };

  const handleSubmit = (data: EventFormData) => {
    if (editData) {
      // Edit logic
      setEvents((prev) =>
        prev.map((ev) => (ev._id === editData._id ? { ...ev, ...data } : ev))
      );
    } else {
      // Create logic
      setEvents((prev) => [
        ...prev,
        { ...data, _id: crypto.randomUUID(), status: "upcoming" },
      ]);
    }
    setIsModalOpen(false);
    setEditData(undefined);
  };

  const columns: Column<Event>[] = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      render: (row: Event) => row.status.toUpperCase(),
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
            onClick={() => handleDelete(row._id)}
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
