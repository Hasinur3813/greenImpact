import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Donation } from "../../Types/DonationTypes";
import PaymentSuccessModal from "../PaymentSuccessModal/PaymentSuccessModal";
import { useNavigate } from "react-router";

interface donationProps {
  amount: number;
  selectedEvent: string;
  message: string;
  inputValidation: (
    errorName: "amountError" | "eventError",
    action: boolean
  ) => void;
}

const CheckoutForm: React.FC<donationProps> = ({
  amount,
  selectedEvent,
  message,
  inputValidation,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        toast.error(
          error.message || "An error occurred while processing payment."
        );
        return;
      }

      if (paymentMethod) {
        const paymentDetails: Donation = {
          donor: user?._id,
          amount: amount,
          message: message || "",
          eventTitle: selectedEvent,
          transactionId: paymentMethod.id,
        };

        const data = await saveDonationDetails(paymentDetails);
        if (data.success) {
          toast.success(data?.message || "Thank you for you support!");
          setTransactionId(paymentMethod.id);
          setIsModalOpen(true);
        } else {
          toast.error("Something went wrong!");
        }

        // Clear the card input field
        const cardElement = elements.getElement(CardElement);
        cardElement?.clear();
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveDonationDetails = async (paymentDetails: Donation) => {
    const res = await axios.post("/donation/save-donation", paymentDetails);
    return res.data;
  };

  useEffect(() => {
    inputValidation("amountError", !amount);
    inputValidation("eventError", !selectedEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, selectedEvent]);

  return (
    <>
      <PaymentSuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTransactionId(null);
          navigate("/dashboard/my-donation");
        }}
        transactionId={transactionId}
        amount={amount}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Payment Details
        </h2>
        <CardElement className="p-3 border border-primaryColor rounded-md" />
        <button
          type="submit"
          disabled={!selectedEvent || !amount || !stripe}
          className={`${
            !selectedEvent || !amount || !stripe
              ? "bg-primaryColor/50 cursor-not-allowed"
              : "bg-primaryColor hover:bg-secondaryColor cursor-pointer"
          } mt-4 w-full   text-white py-2 rounded-md font-semibold  transition`}
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
