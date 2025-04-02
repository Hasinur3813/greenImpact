import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface FormProps {
  role: string;
  setRole: (value: string) => void;
  handleRegister: (data: registerData) => void;
}
interface registerData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const RegisterForm: React.FC<FormProps> = ({
  role,
  setRole,
  handleRegister,
}) => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerData>(); // Added generic type for useForm

  // Form Submit Handler
  const onSubmit = (data: registerData) => {
    handleRegister(data);
  };

  return (
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
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

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
        className="w-full cursor-pointer bg-primaryColor hover:bg-secondaryColor text-white py-2 rounded-lg font-semibold"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
