import React, { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(50);
  const [message, setMessage] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const events = [
    "Tree Planting Drive",
    "Beach Cleanup",
    "Renewable Energy Workshop",
  ];

  return (
    <Elements stripe={stripePromise}>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-50 px-3 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-8 max-w-lg w-full text-center">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primaryColor flex items-center justify-center gap-2">
            <FaHandHoldingHeart className="text-red-500" /> Support Our Mission
          </h1>
          <p className="text-muted mt-2">
            Your donation helps us create a greener, sustainable future.
          </p>

          {/* Event Selection */}
          <select
            className="mt-4 w-full px-4 py-2 border border-primaryColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="" disabled>
              Select an Event
            </option>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>

          {/* Preset Donation Amounts */}
          <div className="flex gap-3 justify-between mt-6 flex-wrap">
            {[10, 15, 25, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold text-lg border transition ${
                  amount === amt
                    ? "bg-primaryColor text-white"
                    : "border-primaryColor"
                } hover:bg-primaryColor hover:text-white`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-4 w-full px-4 py-3 border border-primaryColor rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-primaryColor"
            placeholder="Enter custom amount"
          />

          {/* Custom Message */}
          <textarea
            placeholder="Leave a message (optional)"
            className="mt-4 p-3 w-full border border-primaryColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {/* Stripe Payment Card */}
          <div className="mt-6">
            <CheckoutForm amount={Number(amount)} />
          </div>
        </div>
      </section>
    </Elements>
  );
};

export default Donate;
