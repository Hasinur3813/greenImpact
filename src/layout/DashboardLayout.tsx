import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = "donor";

  // Close sidebar on mobile devices
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-lightGray dark:bg-darkGray flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role={role}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
