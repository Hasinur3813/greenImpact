import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaDonate,
  FaCalendarAlt,
  FaPlus,
  FaUserCog,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const COLORS = ["#00C49F", "#FF8042"];

const Overview = () => {
  // Dummy data
  const summaryStats = {
    users: 1200,
    donations: 540,
    events: 22,
    avgDonation: 45,
  };

  const monthlyDonations = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 2100 },
    { month: "Mar", amount: 800 },
    { month: "Apr", amount: 1600 },
    { month: "May", amount: 2500 },
  ];

  const roleDistribution = [
    { name: "Donors", value: 700 },
    { name: "Volunteers", value: 500 },
  ];

  const recentUsers = [
    { name: "Sarah Ahmed", role: "Donor" },
    { name: "John Doe", role: "Volunteer" },
    { name: "Emily Khan", role: "Donor" },
  ];

  const recentDonations = [
    { name: "Sarah Ahmed", amount: 100, date: "2025-04-01" },
    { name: "Emily Khan", amount: 200, date: "2025-04-02" },
    { name: "Ali Raza", amount: 150, date: "2025-04-03" },
  ];

  return (
    <section className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-primaryColor">
        Admin Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          icon={<FaUsers />}
          title="Total Users"
          value={summaryStats.users}
        />
        <SummaryCard
          icon={<FaDonate />}
          title="Total Donations"
          value={`$${summaryStats.donations}`}
        />
        <SummaryCard
          icon={<FaCalendarAlt />}
          title="Total Events"
          value={summaryStats.events}
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Avg Donations"
          value={`$${summaryStats.avgDonation}`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDonations}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4CAF50" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roleDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users & Donations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <ul className="space-y-3">
            {recentUsers.map((user, i) => (
              <li key={i} className="flex justify-between">
                <span>{user.name}</span>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Donations</h3>
          <ul className="space-y-3">
            {recentDonations.map((donation, i) => (
              <li key={i} className="flex justify-between">
                <span>{donation.name}</span>
                <span>${donation.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard icon={<FaPlus />} label="Add Event" />
        <ActionCard icon={<FaUserCog />} label="Manage Users" />
      </div>
    </section>
  );
};

// Summary card component
const SummaryCard = ({
  icon,
  title,
  value,
}: {
  icon: JSX.Element;
  title: string;
  value: string | number;
}) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="text-3xl text-primaryColor">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </motion.div>
);

// Action button/card
const ActionCard = ({ icon, label }: { icon: JSX.Element; label: string }) => (
  <button className="flex items-center justify-center space-x-3 p-4 bg-primaryColor text-white font-semibold rounded-xl hover:bg-secondaryColor transition">
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Overview;
