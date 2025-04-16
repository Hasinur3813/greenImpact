import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

type PaymentSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string | null;
  amount: number;
  paymentMethod?: string;
  date?: string;
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-30%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
  exit: { y: "30%", opacity: 0, transition: { duration: 0.2 } },
};

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  transactionId,
  amount,
  paymentMethod = "Credit Card",
  date = new Date().toLocaleString(),
}: PaymentSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-full max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <div className="text-center">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primaryColor">
                Payment Successful!
              </h2>
              <p className="text-muted text-sm mb-4">
                Thank you for your support.
              </p>

              <div className="bg-lightGray p-4 rounded-lg text-left text-sm">
                <p>
                  <span className="font-medium text-text">Transaction ID:</span>{" "}
                  {transactionId}
                </p>
                <p>
                  <span className="font-medium text-text">Amount:</span> $
                  {amount.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium text-text">Method:</span>{" "}
                  {paymentMethod}
                </p>
                <p>
                  <span className="font-medium text-text">Date:</span> {date}
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-5 py-2 bg-primaryColor text-white rounded-lg hover:bg-secondaryColor transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
