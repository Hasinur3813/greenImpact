import React from "react";
import ListItem from "../ListItem/ListItem";

interface DropdownProps {
  DropdownRef: React.RefObject<HTMLUListElement> | React.RefObject<null>;
  role: string;
}

const DropdownMenu: React.FC<DropdownProps> = ({ DropdownRef, role }) => {
  return (
    <ul
      ref={DropdownRef}
      className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 mt-4 space-y-2 py-4"
    >
      {/* donor route */}
      {role === "donor" && (
        <>
          <ListItem path="/dashboard">Dashboard</ListItem>
          <ListItem path="/dashboard/my-donation">My Donation</ListItem>
          <ListItem path="/dashboard/donate-now">Donate Now</ListItem>
          <ListItem path="/dashboard/transaction-history">
            Transaction History
          </ListItem>
        </>
      )}
      {/* volunteer route */}
      {role === "volunteer" && (
        <>
          <ListItem path="/dashboard">Dashboard</ListItem>
          <ListItem path="/dashboard/available-events">
            Available Events
          </ListItem>
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
          <ListItem path="/dashboard">Dashboard</ListItem>
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
  );
};

export default DropdownMenu;
