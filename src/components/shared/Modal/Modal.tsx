import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  danger?: boolean;
  loading?: boolean;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
  onConfirm,
  loading = false,
  danger = false,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
    >
      <motion.div
        variants={modal}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold text-text mb-2">{title}</h2>
        <p className="text-muted mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md cursor-pointer text-muted border border-gray-300 hover:bg-lightGray"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md cursor-pointer text-white font-semibold shadow ${
              danger
                ? "bg-red hover:bg-red/80"
                : "bg-primaryColor hover:bg-secondaryColor"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
