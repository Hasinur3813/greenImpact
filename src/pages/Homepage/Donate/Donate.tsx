import React, { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm";
import useEvents from "../../../hooks/useEvents";
import { Event } from "../../../Types/Event";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(50);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState({
    amountError: false,
    eventError: false,
  });
  const { events } = useEvents();

  const inputValidation = (errorName: string, action: boolean) => {
    setError((prevError) => ({ ...prevError, [errorName]: action }));
  };

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
            className={`mt-4 w-full px-4 py-2 border ${
              selectedEvent
                ? "border-primaryColor focus:ring-primaryColor"
                : "border-red focus:ring-red"
            } rounded-lg focus:outline-none focus:ring-2 `}
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select an Event</option>
            {events?.map((event: Event) => (
              <option key={event._id} value={event.title}>
                {event.title}
              </option>
            ))}
          </select>
          {error?.eventError && (
            <p className="text-left font-semibold text-red">
              Please select an event to donate.
            </p>
          )}

          {selectedEvent && (
            <div>
              <p className="py-3 px-2 bg-primaryColor/10 my-4 rounded-lg border-l-8 border-primaryColor">
                You are donating to <strong>{selectedEvent} </strong> of{" "}
                <strong>${amount || 0}</strong>
              </p>
            </div>
          )}

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
            className={`mt-4 w-full px-4 py-2 border ${
              amount
                ? "border-primaryColor focus:ring-primaryColor"
                : "border-red focus:ring-red"
            } rounded-lg focus:outline-none focus:ring-2 `}
            placeholder="Enter custom amount"
          />
          {error?.amountError && (
            <p className="text-left font-semibold text-red">
              Please select an amount or choose a custom amount.
            </p>
          )}
          {/* Custom Message */}
          <textarea
            placeholder="Leave a message (optional)"
            className="mt-4 p-3 w-full border border-primaryColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {/* Stripe Payment Card */}
          <div className="mt-6">
            <CheckoutForm
              amount={Number(amount)}
              selectedEvent={selectedEvent}
              message={message}
              inputValidation={inputValidation}
            />
          </div>
        </div>
      </section>
    </Elements>
  );
};

export default Donate;
