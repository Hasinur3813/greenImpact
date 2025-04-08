import React from "react";
import { NavLink } from "react-router";

interface ListItemProps {
  path: string;
  children: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ className, path, children }) => {
  return (
    <li>
      <NavLink
        to={path}
        end
        className={({ isActive }) => {
          return `${className} flex dark:text-lightGray group items-center w-full px-4 rounded-lg text-base font-semibold transition duration-300 dark:border-none py-2 ${
            isActive
              ? "bg-primaryColor text-white"
              : "bg-primaryColor/0 text-darkGray hover:!bg-primaryColor/30"
          }`;
        }}
      >
        <p className="group-hover:translate-x-1.5 transition-all duration-300">
          {children}
        </p>
      </NavLink>
    </li>
  );
};

export default ListItem;
