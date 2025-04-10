import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Donation } from "../../Types/DonationTypes";

interface donationProps {
  amount: number;
  selectedEvent: string;
  message: string;
}

const CheckoutForm: React.FC<donationProps> = ({
  amount,
  selectedEvent,
  message,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axios = useAxiosSecure();

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
          message: message ? message : "",
          eventTitle: selectedEvent,
          transactionId: paymentMethod.id,
        };

        await saveDonationDetails(paymentDetails);

        // Simulate a successful payment process
        toast.success("Payment successful!");

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
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Payment Details
      </h2>
      <CardElement className="p-3 border border-primaryColor rounded-md" />
      <button
        type="submit"
        className="mt-4 w-full cursor-pointer bg-primaryColor text-white py-2 rounded-md font-semibold hover:bg-secondaryColor transition"
        disabled={!stripe}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
