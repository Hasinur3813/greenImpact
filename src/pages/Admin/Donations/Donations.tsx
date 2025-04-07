// pages/admin/Donations.tsx
import { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table/Table";

const dummyDonations = [
  {
    _id: "1",
    donorName: "Hasin Ahmed",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "TXN123456",
    date: "2025-04-05",
  },
  {
    _id: "2",
    donorName: "Nayeem Khan",
    amount: 100,
    eventTitle: "Beach Cleanup",
    transactionId: "TXN123457",
    date: "2025-04-04",
  },
];

const columns = [
  { key: "donorName", label: "Donor" },
  { key: "eventTitle", label: "Event" },
  {
    key: "amount",
    label: "Amount",
    render: (row) => `$${row.amount}`,
  },
  { key: "transactionId", label: "Transaction ID" },
  { key: "date", label: "Date" },
  {
    key: "action",
    label: "",
    render: (row) => (
      <button
        onClick={() => handleDelete(row._id)}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    ),
  },
];

const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this donation?")) {
    console.log("Deleted donation:", id);
  }
};

const Donations = () => {
  const [donations, setDonations] = useState(dummyDonations);

  return (
    <section className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primaryColor">All Donations</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search donor or event..."
            className="border border-primaryColor rounded-lg pl-10 pr-4 py-2 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <Table columns={columns} data={donations} />

      {donations.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No donations found.
        </div>
      )}
    </section>
  );
};

export default Donations;
