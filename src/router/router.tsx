import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layout/DashboardLayout";
import MyDonations from "../pages/MyDonations/MyDonations";
import AvailableEvents from "../pages/AvailableEvents/AvailableEvents";
import Overview from "../pages/Overview/Overview";
import DonateNow from "../pages/DonateNow/DonateNow";
import TransactionHistory from "../pages/TransactionHistory/TransactionHistory";
import MyAssignedEvents from "../pages/MyAssignedEvents/MyAssignedEvents";
import ProgressReports from "../pages/ProgressReports/ProgressReports";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import EventManagement from "../pages/EventManagement/EventManagement";
import Donations from "../pages/Donations/Donations";
import ReportsAnalytics from "../pages/ReportsAnalytics/ReportsAnalytics";
import Events from "../pages/Events/Events";
import Aboutus from "../pages/AboutUs/AboutUs";
import Donate from "../pages/Donate/Donate";
import Contact from "../pages/Contact/Contact";
import MyProfile from "../pages/MyProfile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/about",
        element: <Aboutus />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  // dashboard layout
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
      // Donor routes
      {
        path: "donate-now",
        element: <DonateNow />,
      },
      {
        path: "my-donation",
        element: <MyDonations />,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory />,
      },

      // Volunteer routes

      {
        path: "my-assigned-events",
        element: <MyAssignedEvents />,
      },
      {
        path: "available-events",
        element: <AvailableEvents />,
      },
      {
        path: "progress-reports",
        element: <ProgressReports />,
      },

      // Admin routes

      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "event-management",
        element: <EventManagement />,
      },
      {
        path: "donations",
        element: <Donations />,
      },
      {
        path: "reports&analytics",
        element: <ReportsAnalytics />,
      },
    ],
  },
]);
