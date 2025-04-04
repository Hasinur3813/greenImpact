import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    alert("Message Sent Successfully!");
    reset(); // ✅ Reset form after submission
  };

  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-primaryColor text-center mb-6">
          Contact Us
        </h2>
        <p className="text-center text-muted mb-8">
          Have questions or want to get involved? Reach out to us!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-2xl text-primaryColor" />
            <p className="text-text mt-2">+1 234 567 890</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-2xl text-primaryColor" />
            <p className="text-text mt-2">contact@greenimpact.org</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-2xl text-primaryColor" />
            <p className="text-text mt-2">123 Green Street, NY</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <input
            {...register("name", { required: "Name is required" })}
            className="p-3 border rounded-lg w-full focus:outline-primaryColor"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="p-3 border rounded-lg w-full focus:outline-primaryColor"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red text-sm">{errors.email.message}</p>
          )}

          <textarea
            {...register("message", { required: "Message cannot be empty" })}
            className="p-3 border rounded-lg w-full focus:outline-primaryColor"
            placeholder="Your Message"
            rows={4}
          />
          {errors.message && (
            <p className="text-red text-sm">{errors.message.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-3 rounded-lg font-semibold transition hover:bg-secondaryColor"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
