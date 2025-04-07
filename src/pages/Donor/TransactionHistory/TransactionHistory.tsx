import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthProvider";
import Table from "../../../components/Table/Table";

interface Donation {
  _id: string;
  amount: number;
  eventTitle: string;
  date: string;
  transactionId: string;
}

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

const donations = [
  {
    _id: "abc123",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc123",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc123",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc123",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
  {
    _id: "abc123",
    amount: 50,
    eventTitle: "Tree Plantation Drive",
    transactionId: "txn_001XYZ",
    date: "2025-04-01T12:34:56Z",
  },
];

const fetchDonations = async (email: string): Promise<Donation[]> => {
  const res = await fetch(`/api/donations?email=${email}`, {
    credentials: "include",
  });
  return res.json();
};

const clearDonations = async (email: string) => {
  const res = await fetch(`/api/donations/clear?email=${email}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};

export default function TransactionHistory() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const isLoading = false;
  const columns: Column<Donation>[] = [
    { key: "eventTitle", label: "Event" },
    {
      key: "amount",
      label: "Amount",
      render: (row: Donation) => `$${row.amount.toFixed(2)}`,
    },
    {
      key: "date",
      label: "Date",
      render: (row: Donation) => new Date(row.date).toLocaleDateString(),
    },
    { key: "transactionId", label: "Transaction ID" },
  ];

  // const { data: donations, isLoading } = useQuery({
  //   queryKey: ["myDonations", user?.email],
  //   queryFn: () => fetchDonations(user?.email),
  //   enabled: !!user?.email,
  // });

  // const mutation = useMutation({
  //   mutationFn: () => clearDonations(user?.email),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["myDonations"]);
  //   },
  // });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primaryColor">My Donations</h2>
          {donations?.length > 0 && (
            <button
              // onClick={() => mutation.mutate()}
              className="flex items-center gap-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition"
            >
              <FaTrash />
              Clear History
            </button>
          )}
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading donations...</p>
        ) : donations?.length === 0 ? (
          <p className="text-center text-gray-500">No donations found.</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <Table columns={columns} data={donations} />
          </div>
        )}
      </div>
    </div>
  );
}
