import { NavLink } from "react-router";

const ListItem = ({ path, children }) => {
  return (
    <li>
      <NavLink
        to={path}
        end
        className="flex dark:text-lightGray items-center bg-primaryColor/0 w-full px-4 py-2 rounded-lg text-base font-semibold text-darkGray hover:!bg-primaryColor/10  transition duration-300 border-b dark:border-none"
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ListItem;
