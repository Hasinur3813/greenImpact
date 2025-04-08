import { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "donor" | "volunteer";
}

interface RoleDropdownProps {
  user: User;
  onConfirmRoleChange: (id: string, newRole: string) => void;
}

const roles = ["admin", "donor", "volunteer"];

const PopconfirmDropdown: React.FC<RoleDropdownProps> = ({
  user,
  onConfirmRoleChange,
}) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tempRole, setTempRole] = useState(user.role);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as User["role"];
    if (newRole !== user.role) {
      setTempRole(newRole);
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    setSelectedRole(tempRole);
    onConfirmRoleChange(user._id, tempRole);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setTempRole(selectedRole);
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      <select
        value={selectedRole}
        onChange={handleChange}
        className="bg-white border border-gray-300 px-3 py-1.5 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>

      {showConfirm && (
        <div
          className={`absolute transition-all duration-300 z-50 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded p-4 space-y-3`}
        >
          <p className="text-gray-700 text-sm font-medium">
            Are you sure you want to change{" "}
            <span className="font-bold">{user.name}'s</span> role to{" "}
            <span className="text-primaryColor font-semibold">{tempRole}</span>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-3 py-1 text-sm cursor-pointer rounded bg-primaryColor text-white hover:bg-secondaryColor"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopconfirmDropdown;
