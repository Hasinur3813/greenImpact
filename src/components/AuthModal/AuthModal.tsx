import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

interface AuthModalProps {
  updateState: (key: string, value: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ updateState }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("volunteer");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form Submit Handler
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full shrink-0 space-y-4 transition-opacity"
            >
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primaryColor hover:bg-secondaryColor text-white py-2 rounded-lg font-semibold"
              >
                Login
              </button>
            </form>

            {/* Register Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full shrink-0  space-y-4 transition-opacity"
            >
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  {...register("name", { required: "Full Name is required" })}
                  type="text"
                  placeholder="Full Name"
                  className="w-full outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              {/* Role Selection */}
              <div className="flex justify-center gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    {...register("role")}
                    type="radio"
                    value="volunteer"
                    checked={role === "volunteer"}
                    onChange={() => setRole("volunteer")}
                  />
                  <span>Volunteer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    {...register("role")}
                    type="radio"
                    value="donor"
                    checked={role === "donor"}
                    onChange={() => setRole("donor")}
                  />
                  <span>Donor</span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-primaryColor hover:bg-secondaryColor text-white py-2 rounded-lg font-semibold"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
