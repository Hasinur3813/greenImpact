import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
// Define roles for demo login
export type UserRole = "admin" | "volunteer" | "donor";

// Define demo credentials type
export interface DemoCredentials {
  [key: string]: {
    email: string;
    password: string;
  };
}

// Define the props for the DemoLogin component
export interface DemoLoginProps {
  updateState: (key: string, value: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

const demoCredentials: DemoCredentials = {
  admin: { email: "admin@greenimpact.com", password: "Admin123" },
  volunteer: {
    email: "volunteer@greenimpact.com",
    password: "Ha0000",
  },
  donor: { email: "donor@greenimpact.com", password: "donor123" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

const DemoLogin: React.FC<DemoLoginProps> = ({
  updateState,
  isOpen,
  onClose,
}) => {
  const { login } = useAuth();

  const handleDemoLogin = async (role: "admin" | "volunteer" | "donor") => {
    try {
      const response = await login(
        demoCredentials[role as keyof DemoCredentials]
      );
      if (response?.success) {
        toast.success(`Logged in as ${role}`);
        updateState("openAuthModal", false); // Close the modal after successful login
      } else {
        toast.error(`Demo Login Failed for ${role}!`);
      }
    } catch {
      toast.error(`Demo Login Failed for ${role}!`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative z-[60]"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // prevent close on modal click
          >
            <button
              onClick={onClose}
              className="absolute top-4 cursor-pointer right-4 text-muted hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-primaryColor mb-2 text-center">
              Demo Login
            </h3>
            <p className="text-sm text-muted text-center mb-4">
              Use the demo credentials to explore the platform.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDemoLogin("admin")}
                className="bg-red-500 cursor-pointer text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Login as Admin
              </button>
              <button
                onClick={() => handleDemoLogin("volunteer")}
                className="bg-blue-500 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login as Volunteer
              </button>
              <button
                onClick={() => handleDemoLogin("donor")}
                className="bg-primaryColor cursor-pointer text-white py-2 rounded-lg hover:bg-secondaryColor transition"
              >
                Login as Donor
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoLogin;
