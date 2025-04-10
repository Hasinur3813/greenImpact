import { FaChevronRight, FaChevronLeft, FaLeaf } from "react-icons/fa";
import { Link } from "react-router";
import ListItem from "../shared/ListItem/ListItem";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  role: string | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  role,
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div
      className={`fixed z-50 w-64 top-0 left-0 h-full bg-offWhite dark:bg-slate-800 shadow-sm dark:border-none p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 `}
    >
      {/* sidebar toogle Button for Desktop */}
      <button
        className="text-lightGray p-2 group  bg-black shadow-lg fixed -right-7 cursor-pointer rounded bottom-0 md:block"
        onClick={toggleSidebar}
      >
        {isSidebarOpen && (
          <FaChevronLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-500" />
        )}
        {!isSidebarOpen && (
          <FaChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-500" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl flex items-center gap-2 text-primaryColor font-bold tracking-wide"
          >
            <FaLeaf /> GreenImpact
          </Link>
        </div>
      </div>
      <hr className="my-1 border-primaryColor rounded-full border" />

      {/* Menu */}
      <h3 className="font-semibold text-lg mt-5 text-darkGray dark:text-lightGray">
        Menu
      </h3>

      {/* List */}
      <div className="flex flex-col space-y-4 h-full">
        <ul className="mt-4 ">
          {/* common route */}
          <ListItem path="/dashboard">My Profile</ListItem>
          {/* donor route */}
          {role === "donor" && (
            <>
              <ListItem path="/dashboard/my-donation">My Donation</ListItem>
              <ListItem path="/donate">Donate Now</ListItem>
              <ListItem path="/dashboard/transaction-history">
                Transaction History
              </ListItem>
            </>
          )}
          {/* volunteer route */}
          {role === "volunteer" && (
            <>
              <ListItem path="/events">Available Events</ListItem>
              <ListItem path="/dashboard/my-assigned-events">
                My Assigned Events
              </ListItem>
              <ListItem path="/dashboard/progress-reports">
                Progress Reports
              </ListItem>
            </>
          )}
          {/* admin route */}
          {role === "admin" && (
            <>
              <ListItem path="/dashboard/overview">Overview</ListItem>
              <ListItem path="/dashboard/manage-users">Manage Users</ListItem>
              <ListItem path="/dashboard/event-management">
                Event Management
              </ListItem>
              <ListItem path="/dashboard/donations">Donations</ListItem>
              <ListItem path="/dashboard/reports&analytics">
                Reports & Analytics
              </ListItem>
            </>
          )}
        </ul>
        <div className="grow flex items-end pb-20 justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center w-full justify-center cursor-pointer gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            <FiLogOut className="text-lg" />
            <span className="text-lg font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
