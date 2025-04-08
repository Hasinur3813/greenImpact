import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

export interface EventFormData {
  title: string;
  description: string;
  organizer: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  image?: FileList | File | null | string | undefined;
}
interface EventModalProps {
  onClose: () => void;
  loading: boolean;
  onSubmit: (data: EventFormData) => void;
  defaultValues?: EventFormData;
}

const EventModal: React.FC<EventModalProps> = ({
  onClose,
  onSubmit,
  loading,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: { ...defaultValues, image: undefined },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (typeof defaultValues?.image === "string") {
      setImagePreview(defaultValues.image);
    } else {
      setImagePreview(null);
    }
  }, [defaultValues]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    setSelectedImage(null);
    onClose();
  };

  const handleFormSubmit = (data: EventFormData) => {
    const formData = {
      ...data,
      image: selectedImage || defaultValues?.image,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex overflow-auto pt-20 pb-10 items-center justify-center">
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
          {/* Title */}
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

          {/* Description */}
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

          {/* Organizer */}
          <div>
            <input
              {...register("organizer", { required: "Organizer is required" })}
              placeholder="Organizer"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.organizer && (
              <p className="text-red-500">{errors.organizer.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              {...register("time", { required: "Date is required" })}
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.time && (
              <p className="text-red-500">{errors.time.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="Location"
              className="w-full border border-primaryColor rounded-lg p-2"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Volunteers Needed */}
          <div>
            <input
              type="number"
              {...register("volunteersNeeded", {
                required: "Volunteers needed is required",
                min: { value: 0, message: "Must be positive" },
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
              {...register("image", {
                required: !defaultValues?.image ? " Image is required" : false,
              })}
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
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryColor cursor-pointer hover:bg-secondaryColor text-white py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Please wait..."
              : defaultValues
              ? "Update Event"
              : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
