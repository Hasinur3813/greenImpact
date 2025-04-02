import React from "react";
import { NavLink } from "react-router";

const DropdownMenu: React.FC<{
  DropdownRef: React.RefObject<HTMLUListElement> | React.RefObject<null>;
}> = ({ DropdownRef }) => {
  return (
    <ul
      ref={DropdownRef}
      className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-40 mt-4 space-y-2 py-4"
    >
      <li>
        <NavLink
          to="/profile"
          className="block text-lg text-text hover:text-primaryColor transition px-4 "
        >
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/settings"
          className="block text-lg text-text hover:text-primaryColor transition px-4 "
        >
          Settings
        </NavLink>
      </li>
      <li>
        <button className="text-lg text-red-500 hover:text-primaryColor transition px-4  w-full text-left">
          Logout
        </button>
      </li>
    </ul>
  );
};

export default DropdownMenu;
