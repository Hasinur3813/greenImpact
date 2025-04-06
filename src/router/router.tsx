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
        path: "donate-now",
        element: (
          <RoleBaseRoute allowedRole="donor">
            <DonateNow />
          </RoleBaseRoute>
        ),
      },
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
        path: "available-events",
        element: (
          <RoleBaseRoute allowedRole="volunteer">
            <AvailableEvents />
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
