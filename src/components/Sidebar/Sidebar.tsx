import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";
import ListItem from "../ListItem/ListItem";
import { FiLogOut } from "react-icons/fi";
import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  role,
}) => {
  return (
    <div
      className={`fixed z-50 w-64 top-0 left-0 h-full bg-offWhite dark:bg-slate-800 shadow-sm dark:border-none p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 `}
    >
      {/* sidebar toogle Button for Desktop */}
      <button
        className="text-lightGray p-1  bg-black shadow-lg fixed -right-7 cursor-pointer rounded bottom-0 md:block"
        onClick={toggleSidebar}
      >
        {isSidebarOpen && <FaChevronLeft className="text-lg" />}
        {!isSidebarOpen && <FaChevronRight className="text-lg " />}
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl text-primaryColor font-extrabold tracking-wide"
          >
            GreenImpact
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
        <ul className="mt-4 space-y-2 ">
          {/* donor route */}
          {role === "donor" && (
            <>
              <ListItem path="/dashboard">My Donation</ListItem>
              <ListItem path="/dashboard/donate-now">Donate Now</ListItem>
              <ListItem path="/dashboard/transaction-history">
                Transaction History
              </ListItem>
            </>
          )}
          {/* volunteer route */}
          {role === "volunteer" && (
            <>
              <ListItem path="/dashboard">Available Events</ListItem>
              <ListItem path="/dashboard/my-assigned-events">
                My Assinged Events
              </ListItem>
              <ListItem path="/dashboard/progress-reports">
                Progress Reports
              </ListItem>
            </>
          )}
          {/* admin route */}
          {role === "admin" && (
            <>
              <ListItem path="/dashboard">Overview</ListItem>
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
            // onClick={onLogout}
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
