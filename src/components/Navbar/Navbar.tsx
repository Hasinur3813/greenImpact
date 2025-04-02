import { useRef, useState } from "react";
import { NavLink, Link } from "react-router"; // Fixed import to `react-router-dom`
import { FiMenu, FiX, FiUser } from "react-icons/fi"; // Add icon for user avatar
import { FaSignInAlt } from "react-icons/fa"; // Sign-in icon for Login button

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const DropdownRef = useRef(null);

  // Sample user data, you can replace it with actual user state
  const user = { name: "John Doe", avatar: "/path-to-avatar.jpg" };

  const handleCloseDropdownMenu = () => {
    console.log("close menu");
  };

  return (
    <nav className="bg-offWhite shadow-md py-5 sticky top-0 z-50">
      <div className="container mx-auto flex px-4 justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-primaryColor">
          GreenImpact
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-darkGray focus:outline-none text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Items */}
        <ul
          className={`md:flex md:space-x-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-offWhite md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className="text-lg text-text hover:text-primaryColor transition font-semibold"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-lg text-text hover:text-primaryColor transition font-semibold"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className="text-lg text-text hover:text-primaryColor transition font-semibold"
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donate"
              className="text-lg text-text hover:text-primaryColor transition font-semibold"
            >
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-lg text-text hover:text-primaryColor transition font-semibold"
            >
              Contact
            </NavLink>
          </li>

          {/* Conditionally render Login or Avatar */}
          {!isLoggedIn ? (
            <li>
              <NavLink
                to="/login"
                className="flex items-center text-lg text-white bg-primaryColor hover:bg-accentColor py-2 px-4 rounded-full transition font-semibold"
              >
                <FaSignInAlt className="mr-2" /> Login
              </NavLink>
            </li>
          ) : (
            <li className="relative">
              <button
                onClick={() => handleCloseDropdownMenu}
                className="flex items-center cursor-pointer space-x-2 "
              >
                <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                  <span className="font-medium text-3xl text-primaryColor">
                    {user.name.slice(0, 1)}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
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
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsDropdownOpen(false);
                      }}
                      className="text-lg text-red-500 hover:text-primaryColor transition px-4  w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
