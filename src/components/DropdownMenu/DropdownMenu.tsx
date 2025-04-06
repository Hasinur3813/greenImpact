import React from "react";
import ListItem from "../ListItem/ListItem";
import { useAuth } from "../../contexts/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

interface dropDownState {
  isOpenMobileMenu: boolean;
  isDropdownOpen: boolean;
  openAuthModal: boolean;
}

interface DropdownProps {
  DropdownRef: React.RefObject<HTMLUListElement> | React.RefObject<null>;
  role: string;
  setState: React.Dispatch<React.SetStateAction<dropDownState>>;
}

const DropdownMenu: React.FC<DropdownProps> = ({
  DropdownRef,
  role,
  setState,
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setState((prevState) => ({ ...prevState, isDropdownOpen: false }));
      toast.success("Successfully Logged Out.");
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <ul
      ref={DropdownRef}
      className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 mt-4 space-y-2 py-4"
    >
      {/* donor route */}
      {role === "donor" && (
        <>
          <ListItem className="!py-0" path="/dashboard">
            Dashboard
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/my-donation">
            My Donation
          </ListItem>
          <ListItem className="!py-0" path="/donate">
            Donate Now
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/transaction-history">
            Transaction History
          </ListItem>
        </>
      )}
      {/* volunteer route */}
      {role === "volunteer" && (
        <>
          <ListItem className="!py-0" path="/dashboard">
            Dashboard
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/available-events">
            Available Events
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/my-assigned-events">
            My Assinged Events
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/progress-reports">
            Progress Reports
          </ListItem>
        </>
      )}
      {/* admin route */}
      {role === "admin" && (
        <>
          <ListItem className="!py-0" path="/dashboard">
            Dashboard
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/overview">
            Overview
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/manage-users">
            Manage Users
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/event-management">
            Event Management
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/donations">
            Donations
          </ListItem>
          <ListItem className="!py-0" path="/dashboard/reports&analytics">
            Reports & Analytics
          </ListItem>
        </>
      )}
      <div className="w-full flex justify-center">
        <button
          onClick={handleLogout}
          type="button"
          className=" py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-lg font-semibold flex justify-center items-center gap-2 rounded-lg w-11/12 text-white"
        >
          <FiLogOut className="text-lg" /> Logout
        </button>
      </div>
    </ul>
  );
};

export default DropdownMenu;
