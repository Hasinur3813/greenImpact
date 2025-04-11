import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

interface FormProps {
  role: string;
  setRole: (value: string) => void;
  handleRegister: (data: registerData) => void;
}

interface registerData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "donor" | "volunteer";
}

const RegisterForm: React.FC<FormProps> = ({
  role,
  setRole,
  handleRegister,
}) => {
  const { loading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<registerData>();

  const onSubmit = (data: registerData) => {
    handleRegister(data);
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full shrink-0 space-y-4 transition-opacity"
    >
      {/* Name */}
      <div className="flex items-center border border-primaryColor rounded-lg px-3 py-2">
        <FaUser className="text-gray-400 mr-2" />
        <input
          {...register("name", { required: "Full Name is required" })}
          type="text"
          placeholder="Full Name"
          className="w-full outline-none"
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      {/* Email */}
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

      {/* Password */}
      <div className="flex items-center border border-primaryColor rounded-lg px-3 py-2 relative">
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
          className="w-full outline-none pr-8"
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

      {/* Confirm Password */}
      <div className="flex items-center border border-primaryColor rounded-lg px-3 py-2 relative">
        <FaLock className="text-gray-400 mr-2" />
        <input
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full outline-none pr-8"
        />
        <span
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 text-gray-400 cursor-pointer"
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
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
        className="w-full cursor-pointer bg-primaryColor hover:bg-secondaryColor text-white py-2 rounded-lg font-semibold"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
