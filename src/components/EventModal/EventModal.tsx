import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  defaultValues?: EventFormData;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image?: File | null; // Optional image field
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
  } = useForm<EventFormData>({
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.image ? URL.createObjectURL(defaultValues.image) : null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          {defaultValues ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Event Title"
            className="w-full border rounded-lg p-3"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Event Description"
            className="w-full border rounded-lg p-3"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full border rounded-lg p-3"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}

          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}

          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            placeholder="Price (if applicable)"
            className="w-full border rounded-lg p-3"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}

          {/* Image Upload */}
          <div>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-3 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Event Preview"
                  className="w-20 h-14 border border-primaryColor rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primaryColor hover:bg-secondaryColor text-white py-3 rounded-lg font-semibold"
          >
            {defaultValues ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
