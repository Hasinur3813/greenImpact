import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import AuthModal from "../AuthModal/AuthModal";

export default function Navbar() {
  const [state, setState] = useState({
    isOpenMobileMenu: false,
    isDropdownOpen: false,
    openAuthModal: false,
  });

  const currentUser: boolean = false;
  const role = "donor";

  const DropdownRef = useRef(null);
  // Function to update state properties
  const updateState = (key: string, value: boolean) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  // Sample user data, you can replace it with actual user state
  const user = { name: "John Doe", avatar: "/path-to-avatar.jpg" };

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        DropdownRef.current &&
        !(DropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        updateState("isDropdownOpen", !state.isDropdownOpen);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.isDropdownOpen]);
  return (
    <nav className="bg-offWhite shadow-md py-5 sticky top-0 z-50">
      <div className="container mx-auto flex px-4 justify-between items-center">
        {/* auth modal */}
        {state.openAuthModal && <AuthModal updateState={updateState} />}
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-primaryColor">
          GreenImpact
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            updateState("isOpenMobileMenu", !state.isOpenMobileMenu)
          }
          className="md:hidden text-darkGray focus:outline-none text-2xl"
        >
          {state.isOpenMobileMenu ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Items */}
        <ul
          className={`md:flex md:space-x-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-offWhite md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            state.isOpenMobileMenu ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg transition font-semibold ${
                  isActive
                    ? "text-primaryColor"
                    : "text-text hover:text-primaryColor"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-lg transition font-semibold ${
                  isActive
                    ? "text-primaryColor"
                    : "text-text hover:text-primaryColor"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `text-lg transition font-semibold ${
                  isActive
                    ? "text-primaryColor"
                    : "text-text hover:text-primaryColor"
                }`
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `text-lg transition font-semibold ${
                  isActive
                    ? "text-primaryColor"
                    : "text-text hover:text-primaryColor"
                }`
              }
            >
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-lg transition font-semibold ${
                  isActive
                    ? "text-primaryColor"
                    : "text-text hover:text-primaryColor"
                }`
              }
            >
              Contact
            </NavLink>
          </li>

          {/* Conditionally render Login or Avatar */}
          {!currentUser ? (
            <li>
              <button
                onClick={() =>
                  updateState("openAuthModal", !state.openAuthModal)
                }
                type="button"
                className="flex items-center text-lg text-white bg-primaryColor hover:bg-accentColor py-2 px-4 rounded-full transition font-semibold"
              >
                <FaSignInAlt className="mr-2" /> Login
              </button>
            </li>
          ) : (
            <li className="relative">
              <button
                onClick={() =>
                  updateState("isDropdownOpen", !state.isDropdownOpen)
                }
                className="flex items-center cursor-pointer space-x-2 "
              >
                <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                  <span className="font-medium text-3xl text-primaryColor">
                    {user.name.slice(0, 1)}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {state.isDropdownOpen && (
                <DropdownMenu DropdownRef={DropdownRef} role={role} />
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
