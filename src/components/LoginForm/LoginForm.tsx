import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";

interface LoginProps {
  handleLogin: (data: loginData) => void;
}
interface loginData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginProps> = ({ handleLogin }) => {
  const { loading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  // Form Submit Handler
  const onSubmit = (data: loginData) => {
    handleLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full shrink-0 space-y-4 transition-opacity"
    >
      <div className="flex items-center border border-primaryColor rounded-lg px-3 py-2">
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
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <div className="flex items-center border border-primaryColor rounded-lg px-3 py-2">
        <FaLock className="text-gray-400 mr-2" />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full outline-none"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-400 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      {/* Login Button */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-primaryColor hover:bg-secondaryColor text-white py-2 rounded-lg font-semibold"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
