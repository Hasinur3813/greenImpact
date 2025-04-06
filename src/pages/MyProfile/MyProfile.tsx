import { FaUserCircle, FaEnvelope, FaUserTag, FaEdit } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return <div className="text-center mt-12 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primaryColor/10 to-offWhite p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-5xl text-primaryColor" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primaryColor">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.role.toUpperCase()}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primaryColor hover:bg-secondaryColor text-white px-4 py-2 rounded-full transition">
            <FaEdit />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg">
            <FaEnvelope className="text-gray-500" />
            <span className="text-gray-700">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <FaUserTag className="text-gray-500" />
            <span className="text-gray-700 capitalize">Role: {user.role}</span>
          </div>

          {/* Optional extra info based on role */}
          {user.role === "volunteer" && (
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded">
              <p>You can join environmental events and contribute your time!</p>
            </div>
          )}

          {user.role === "donor" && (
            <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 rounded">
              <p>You can donate to causes and track your impact here.</p>
            </div>
          )}

          {user.role === "admin" && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded">
              <p>You have full administrative access.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
