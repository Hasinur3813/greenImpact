import { FaUserEdit } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import PopconfirmDropdown from "../../../components/PopConfirmDropdown/PopConfirmDropdown";

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
const users: User[] = [
  {
    _id: "u1",
    name: "Alice Green",
    email: "alice@greenimpact.org",
    role: "admin",
  },
  {
    _id: "u2",
    name: "Bob Johnson",
    email: "bob@greenimpact.org",
    role: "donor",
  },
  {
    _id: "u3",
    name: "Carol White",
    email: "carol@greenimpact.org",
    role: "volunteer",
  },
  {
    _id: "u4",
    name: "David Smith",
    email: "david@greenimpact.org",
    role: "donor",
  },
  {
    _id: "u5",
    name: "Eva Brown",
    email: "eva@greenimpact.org",
    role: "volunteer",
  },
];

const ManageUsers = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const loading = false;

  // useEffect(() => {
  //   axios.get("/api/users").then((res) => {
  //     setUsers(res.data);
  //     setLoading(false);
  //   });
  // }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`User ${userId} role changed to ${newRole}`);
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

      {loading ? (
        <div className="text-center text-lg text-muted py-10">
          Loading Users...
        </div>
      ) : (
        <Table data={users} columns={columns} />
      )}
    </section>
  );
};

export default ManageUsers;
