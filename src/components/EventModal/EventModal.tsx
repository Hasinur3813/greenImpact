import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Event } from "../../Types/Event";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  defaultValues?: Event;
}

interface EventFormData {
  title: string;
  description: string;
  organizer: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  image?: File | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.image ? URL.createObjectURL(defaultValues.image) : null
  );
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    onClose();
  };

  const handleFormSubmit = (data: EventFormData) => {
    onSubmit(data);
    reset();
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex overflow-auto pt-20 pb-10  items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg z-[99] w-full max-w-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          {defaultValues ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
          {/* title */}
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Event Title"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* description */}
          <div>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Event Description"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* organizer */}
          <div>
            <input
              {...register("organizer", { required: "Organizer is required" })}
              placeholder="Event organizer"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.organizer && (
              <p className="text-red-500">{errors.organizer.message}</p>
            )}
          </div>

          {/* date */}
          <div>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.time && (
              <p className="text-red-500">{errors.time.message}</p>
            )}
          </div>

          {/* location */}

          <div>
            {" "}
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="Location"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* organizer needed */}
          <div>
            <input
              type="number"
              step="0.01"
              {...register("volunteersNeeded", {
                required: "volunteersNeeded is required",
                min: { value: 0, message: "Value must be positive" },
              })}
              placeholder="Volunteers Needed"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.volunteersNeeded && (
              <p className="text-red-500">{errors.volunteersNeeded.message}</p>
            )}
          </div>
          {/* Image Upload */}
          <div>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-primaryColor rounded-lg p-2 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Event Preview"
                  className="w-20 h-14 border object-cover border-primaryColor rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primaryColor cursor-pointer hover:bg-secondaryColor text-white py-3 rounded-lg font-semibold"
          >
            {defaultValues ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
