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

// Role-based route wrapper
const RoleBasedRoute = ({ element, allowedRoles, userRole }: any) => {
  return allowedRoles.includes(userRole) ? element : <div>Access Denied</div>;
};

// Example user role (replace this with actual user role from context or state)
const userRole: "donor" | "volunteer" | "admin" = "donor" as
  | "donor"
  | "volunteer"
  | "admin"; // Example: "donor", "volunteer", or "admin"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (() => {
          switch (userRole) {
            case "donor":
              return (
                <RoleBasedRoute
                  element={<MyDonations />}
                  allowedRoles={["donor"]}
                  userRole={userRole}
                />
              );
            case "volunteer":
              return (
                <RoleBasedRoute
                  element={<AvailableEvents />}
                  allowedRoles={["volunteer"]}
                  userRole={userRole}
                />
              );
            case "admin":
              return (
                <RoleBasedRoute
                  element={<Overview />}
                  allowedRoles={["admin"]}
                  userRole={userRole}
                />
              );
            default:
              return <div>Access Denied</div>;
          }
        })(),
      },
      // Donor routes
      {
        path: "donate-now",
        element: (
          <RoleBasedRoute
            element={<DonateNow />}
            allowedRoles={["donor"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "transaction-history",
        element: (
          <RoleBasedRoute
            element={<TransactionHistory />}
            allowedRoles={["donor"]}
            userRole={userRole}
          />
        ),
      },

      // Volunteer routes

      {
        path: "my-assigned-events",
        element: (
          <RoleBasedRoute
            element={<MyAssignedEvents />}
            allowedRoles={["volunteer"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "progress-reports",
        element: (
          <RoleBasedRoute
            element={<ProgressReports />}
            allowedRoles={["volunteer"]}
            userRole={userRole}
          />
        ),
      },

      // Admin routes

      {
        path: "manage-users",
        element: (
          <RoleBasedRoute
            element={<ManageUsers />}
            allowedRoles={["admin"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "event-management",
        element: (
          <RoleBasedRoute
            element={<EventManagement />}
            allowedRoles={["admin"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "donations",
        element: (
          <RoleBasedRoute
            element={<Donations />}
            allowedRoles={["admin"]}
            userRole={userRole}
          />
        ),
      },
      {
        path: "reports&analytics",
        element: (
          <RoleBasedRoute
            element={<ReportsAnalytics />}
            allowedRoles={["admin"]}
            userRole={userRole}
          />
        ),
      },
    ],
  },
]);
