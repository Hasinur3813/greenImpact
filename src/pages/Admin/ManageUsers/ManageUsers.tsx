import { FaUserEdit } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import PopconfirmDropdown from "../../../components/PopConfirmDropdown/PopConfirmDropdown";
import useUsers from "../../../hooks/useUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "volunteer" | "donor";
}
interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

const ManageUsers = () => {
  const axios = useAxiosSecure();
  const { users, isLoading, refetch } = useUsers();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const { data } = await axios.patch(
        `/auth/change-user-role?id=${userId}&role=${newRole}`
      );
      if (data.success) {
        toast.success("User role has been changed!");
        refetch();
      } else {
        toast.error("Failed to change the user role!");
      }
    } catch {
      toast.error("Failed to change the user role!");
    }
  };

  const columns: Column<User>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <PopconfirmDropdown
          user={user}
          onConfirmRoleChange={(userId, newRole) => {
            handleRoleChange(userId, newRole);
          }}
        />
      ),
    },
  ];

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center gap-3 mb-6">
        <FaUserEdit className="text-2xl text-primaryColor" />
        <h2 className="text-3xl font-bold text-primaryColor">Manage Users</h2>
      </div>

      {isLoading ? (
        <div className="text-center text-lg text-muted py-10">
          <Loader />
        </div>
      ) : (
        <Table data={users} columns={columns} />
      )}
    </section>
  );
};

export default ManageUsers;
