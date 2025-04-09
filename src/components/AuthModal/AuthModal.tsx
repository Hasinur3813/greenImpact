import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import DemoLogin from "../DemoLogin/DemoLogin";
import { FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface AuthModalProps {
  updateState: (key: string, value: boolean) => void;
}

interface loginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ updateState }) => {
  const { register, login } = useAuth();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [role, setRole] = useState<string>("donor");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = async (data: loginData) => {
    try {
      const response = await login(data);
      if (response?.success) {
        toast.success("Successfully Logged In");
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch {
      toast.error("Invalid Credentials!");
    }
  };

  const handleRegister = async (data: registerData) => {
    try {
      const response = await register(data);
      if (response?.success) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90]">
      {/* Modal Container */}
      <div className="bg-white w-[90%] overflow-y-auto max-w-md p-6 rounded-lg shadow-lg relative overflow-x-hidden">
        {/* Close Button */}
        <button
          className="absolute top-1 right-1 cursor-pointer text-gray-500 hover:text-gray-800"
          onClick={() => updateState("openAuthModal", false)}
        >
          <IoIosCloseCircle size={25} />
        </button>

        {/* Toggle Buttons */}
        <div className="flex justify-between items-center mb-6 relative">
          <button
            className={`w-1/2 text-lg font-semibold  cursor-pointer transition-all pb-2 ${
              !isRegister ? "text-primaryColor " : "text-gray-500"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-lg font-semibold cursor-pointer transition-all pb-2 ${
              isRegister ? "text-primaryColor" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>

          {/* Sliding Indicator */}
          <div
            className={`absolute bottom-0 w-1/2 h-1 bg-primaryColor transition-transform duration-500 ${
              isRegister ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
        </div>

        {/* Form Container */}
        <div className="relative  h-[450px] overflow-x-hidden overflow-y-auto">
          <div
            className={`absolute inset-0 items-center flex transition-transform duration-700 ${
              isRegister ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            {/* button for open demo login modal */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setModalOpen(true)}
              className="flex items-center absolute top-0 cursor-pointer gap-2 px-5 py-2.5 bg-primaryColor text-white rounded-full shadow-md hover:bg-secondaryColor transition-all font-semibold"
            >
              <FaSignInAlt />
              Try Demo
            </motion.button>

            {/* Demo Credentials Section */}
            <DemoLogin
              updateState={updateState}
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
            {/* Login Form */}
            <LoginForm handleLogin={handleLogin} />
            {/* Register Form */}
            <RegisterForm
              role={role}
              setRole={setRole}
              handleRegister={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
