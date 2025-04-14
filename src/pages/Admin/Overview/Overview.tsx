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
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

const COLORS = ["#00C49F", "#FF8042"];

const Overview = () => {
  const axios = useAxiosSecure();

  const { data: overview, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const { data } = await axios.get("/admin/overview");
      console.log(data.data);
      return data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
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
          value={overview?.summaryStats.users}
        />
        <SummaryCard
          icon={<FaDonate />}
          title="Total Donations"
          value={`$${overview?.summaryStats.totalDonations}`}
        />
        <SummaryCard
          icon={<FaCalendarAlt />}
          title="Total Events"
          value={overview?.summaryStats.events}
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Avg Donations"
          value={`$${overview?.summaryStats.avgDonation}`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overview?.donations.monthlyDonations}>
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
                data={overview?.roleDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {overview?.roleDistribution.map((_: unknown, index: number) => (
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
            {overview?.recentUsers.map((user, i) => (
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
            {overview?.donations.recentDonations.map((donation, i) => (
              <li key={i} className="flex justify-between">
                <span>{donation.donor.name}</span>
                <span>${donation.amount}</span>
                <span>${donation.transactionId.slice(0, 15)}...</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard icon={<FaPlus />} label="Add Event" />
        <Link to={"/dashboard/manage-users"} className="block w-full">
          <ActionCard icon={<FaUserCog />} label="Manage Users" />
        </Link>
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
  icon: React.ReactNode;
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
const ActionCard = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="flex items-center justify-center space-x-3 p-4 bg-primaryColor text-white font-semibold rounded-xl w-full cursor-pointer hover:bg-secondaryColor transition">
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Overview;
