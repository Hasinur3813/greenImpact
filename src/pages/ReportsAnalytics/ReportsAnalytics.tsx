import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";

const donationData = [
  { date: "Apr 1", amount: 200 },
  { date: "Apr 2", amount: 450 },
  { date: "Apr 3", amount: 300 },
  { date: "Apr 4", amount: 500 },
  { date: "Apr 5", amount: 650 },
];

const eventData = [
  { name: "Tree Planting", participants: 120 },
  { name: "Beach Cleanup", participants: 95 },
  { name: "Workshop", participants: 80 },
];

const topDonors = [
  { name: "Ali Raza", total: 1000 },
  { name: "Sarah Ahmed", total: 850 },
  { name: "Emily Khan", total: 600 },
];

const ReportAnalytics = () => {
  const [filter, setFilter] = useState("This Week");

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primaryColor">
          Reports & Analytics
        </h2>
        <div className="flex gap-3">
          {["Today", "This Week", "This Month"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-2 rounded-full border ${
                filter === label
                  ? "bg-primaryColor text-white"
                  : "text-gray-600"
              } hover:bg-primaryColor hover:text-white transition`}
            >
              {label}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 bg-secondaryColor text-white rounded-full hover:bg-primaryColor transition">
            <FaFileDownload />
            Export CSV
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Line Chart for Donations */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Events */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Event Participation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="participants"
                fill="#00C49F"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Donors */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Top Donors</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Total Donated</th>
            </tr>
          </thead>
          <tbody>
            {topDonors.map((donor, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{donor.name}</td>
                <td className="py-2">${donor.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReportAnalytics;
