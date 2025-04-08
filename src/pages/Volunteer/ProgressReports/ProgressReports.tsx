import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Data for the progress report
const progressData = [
  { eventTitle: "Beach Cleanup", completed: 120, total: 150 },
  { eventTitle: "Tree Plantation", completed: 180, total: 200 },
  { eventTitle: "Recycling Campaign", completed: 100, total: 120 },
  { eventTitle: "Beach Cleanup", completed: 120, total: 150 },
  { eventTitle: "Tree Plantation", completed: 180, total: 200 },
  { eventTitle: "Recycling Campaign", completed: 100, total: 120 },
];

const ProgressReport = () => {
  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        My Progress Report
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Here you can track your volunteering progress across different events.
      </p>

      {/* Progress Bar Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="eventTitle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#4CAF50" />
            <Bar dataKey="total" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Progress Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {progressData.map((data, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-300 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {data.eventTitle}
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Completed:</strong> {data.completed}/{data.total} tasks
            </p>
            <p className="text-gray-500">
              Progress: {(data.completed / data.total) * 100}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgressReport;
