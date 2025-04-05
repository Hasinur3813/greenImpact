import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/AuthProvider";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { user } = useAuth();

  // Close sidebar on mobile devices
  useEffect(() => {
    const screenWidth: number = window.innerWidth;
    if (screenWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);
  const toggleSidebar: () => void = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-lightGray dark:bg-darkGray flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role={user?.role}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all bg-gray-100 duration-300 overflow-y-auto ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
