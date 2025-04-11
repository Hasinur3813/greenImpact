import { FaSearch, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import { Donation } from "../../../Types/DonationTypes";
import useDonations from "../../../hooks/useDonations";
import Loader from "../../../components/Loader/Loader";
import ConfirmModal from "../../../components/shared/Modal/Modal";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

interface Column<T> {
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
}

const Donations = () => {
  const { donations, isLoading, refetch } = useDonations();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletionId, setDeletionId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const axios = useAxiosSecure();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/donation/delete/${deletionId}`);
      if (data.success) {
        toast.success("Successfully Deleted!");
        refetch();
      } else {
        toast.error("Failed to delete!");
      }
    } catch {
      toast.error("Failed to delete!");
    } finally {
      setIsModalOpen(false);
      setDeletionId(null);
    }
  };

  const handleModal = (id: string) => {
    setDeletionId(id);
    setIsModalOpen(true);
  };

  // Filter donations based on the search input
  const filteredDonations = donations?.filter((donation: Donation) => {
    const searchLower = search.toLowerCase();
    return (
      donation.donor?.name?.toLowerCase().includes(searchLower) || // Match donor name
      donation.donor?.email?.toLowerCase().includes(searchLower) || // Match donor email
      donation.eventTitle?.toLowerCase().includes(searchLower) // Match event title
    );
  });
  const columns: Column<Donation>[] = [
    {
      key: "donorName",
      label: "Donor",
      render: (row: Donation) => `${row.donor?.name || "Unknown"}`,
    },
    {
      key: "donorEmail",
      label: "Email",
      render: (row: Donation) => `${row.donor?.email || "Unknown"}`,
    },
    { key: "eventTitle", label: "Event" },
    {
      key: "amount",
      label: "Amount",
      render: (row: Donation) => `$${row.amount}`,
    },
    { key: "transactionId", label: "Transaction ID" },
    { key: "date", label: "Date" },
    {
      key: "action",
      label: "",
      render: (row: Donation) => (
        <button
          onClick={() => handleModal(row._id!)}
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          <FaTrash />
        </button>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primaryColor">All Donations</h2>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search donor or event..."
            className="border border-primaryColor rounded-lg pl-10 pr-4 py-2 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <Table columns={columns} data={filteredDonations} />

      {filteredDonations?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No donations found.
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDeletionId(null);
        }}
        onConfirm={() => handleDelete()}
        danger={true}
      />
    </section>
  );
};

export default Donations;
