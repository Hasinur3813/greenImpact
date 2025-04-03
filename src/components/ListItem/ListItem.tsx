import React from "react";
import { NavLink } from "react-router";

interface ListItemProps {
  path: string;
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ path, children }) => {
  return (
    <li>
      <NavLink
        to={path}
        end
        className="flex dark:text-lightGray items-center bg-primaryColor/0 w-full px-4 rounded-lg text-base font-semibold text-darkGray hover:!bg-primaryColor/10  transition duration-300 dark:border-none"
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ListItem;
