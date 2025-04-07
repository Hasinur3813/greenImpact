import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layout/DashboardLayout";
import MyDonations from "../pages/Donor/MyDonations/MyDonations";
import Overview from "../pages/Admin/Overview/Overview";
import TransactionHistory from "../pages/Donor/TransactionHistory/TransactionHistory";
import MyAssignedEvents from "../pages/Volunteer/MyAssignedEvents/MyAssignedEvents";
import ProgressReports from "../pages/Volunteer/ProgressReports/ProgressReports";
import ManageUsers from "../pages/Admin/ManageUsers/ManageUsers";
import EventManagement from "../pages/Admin/EventManagement/EventManagement";
import Donations from "../pages/Admin/Donations/Donations";
import ReportsAnalytics from "../pages/Admin/ReportsAnalytics/ReportsAnalytics";
import Events from "../pages/Homepage/Events/Events";
import Aboutus from "../pages/Homepage/AboutUs/AboutUs";
import Donate from "../pages/Homepage/Donate/Donate";
import Contact from "../pages/Homepage/Contact/Contact";
import MyProfile from "../pages/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import RoleBaseRoute from "./RoleBaseRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
      // Donor routes

      {
        path: "my-donation",
        element: (
          <RoleBaseRoute allowedRole="donor">
            <MyDonations />
          </RoleBaseRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <RoleBaseRoute allowedRole="donor">
            <TransactionHistory />
          </RoleBaseRoute>
        ),
      },

      // Volunteer routes

      {
        path: "my-assigned-events",
        element: (
          <RoleBaseRoute allowedRole="volunteer">
            <MyAssignedEvents />
          </RoleBaseRoute>
        ),
      },

      {
        path: "progress-reports",
        element: (
          <RoleBaseRoute allowedRole="volunteer">
            <ProgressReports />
          </RoleBaseRoute>
        ),
      },

      // Admin routes

      {
        path: "overview",
        element: (
          <RoleBaseRoute allowedRole="admin">
            <Overview />
          </RoleBaseRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleBaseRoute allowedRole="admin">
            <ManageUsers />
          </RoleBaseRoute>
        ),
      },
      {
        path: "event-management",
        element: (
          <RoleBaseRoute allowedRole="admin">
            <EventManagement />
          </RoleBaseRoute>
        ),
      },
      {
        path: "donations",
        element: (
          <RoleBaseRoute allowedRole="admin">
            <Donations />
          </RoleBaseRoute>
        ),
      },
      {
        path: "reports&analytics",
        element: (
          <RoleBaseRoute allowedRole="admin">
            <ReportsAnalytics />
          </RoleBaseRoute>
        ),
      },
    ],
  },
]);
