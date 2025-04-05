import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
  role: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ updateState }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("volunteer");
  const axios = useAxiosPublic();

  const handleLogin = async (data: loginData) => {
    const user = data;

    const response = await axios.post("/auth/login", user);
    console.log(response.data);
  };

  const handleRegister = async (data: registerData) => {
    const user = data;

    const response = await axios.post("/auth/register", user);
    console.log(response.data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90]">
      {/* Modal Container */}
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative overflow-hidden">
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
        <div className="relative min-h-[400px] h-full overflow-hidden">
          <div
            className={`absolute inset-0 items-center flex transition-transform duration-700 ${
              isRegister ? "-translate-x-full" : "translate-x-0"
            }`}
          >
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
