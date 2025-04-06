import React from "react";
import { FaCalendarAlt, FaDollarSign, FaReceipt } from "react-icons/fa";

type Donation = {
  _id: string;
  eventTitle: string;
  amount: number;
  transactionId: string;
  date: string;
};

type Props = {
  donations: Donation[];
  handleClearHistory: () => void;
};
const donations = [
  {
    _id: "abc12df3",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc123e3",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc12",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc1",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
];
const MyDonations: React.FC<Props> = ({ handleClearHistory }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-primaryColor mb-8 text-center">
        My Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-muted">
          You haven't made any donations yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:border-primaryColor transition-all"
            >
              <h3 className="text-xl font-semibold text-primaryColor mb-2">
                {donation.eventTitle}
              </h3>

              <p className="flex items-center gap-2 text-lg font-medium text-green-600 mb-1">
                <FaDollarSign /> ${donation.amount.toFixed(2)}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <FaReceipt className="text-gray-500" />
                {donation.transactionId}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-500">
                <FaCalendarAlt /> {new Date(donation.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {donations.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleClearHistory}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all"
          >
            Clear History
          </button>
        </div>
      )}
    </section>
  );
};

export default MyDonations;
