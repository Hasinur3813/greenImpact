import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm: React.FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });
    if (!error && paymentMethod) {
      alert(`Payment successful!`);
      const cardElement = elements.getElement(CardElement);
      cardElement?.clear();
    }
    setLoading(false);
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
