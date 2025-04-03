import React from "react";
import { FaLeaf, FaHandsHelping, FaGlobe } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primaryColor">
          About GreenImpact
        </h1>
        <p className="text-muted mt-3 text-lg">
          Empowering communities for a greener and more sustainable future.
        </p>
      </div>

      {/* Content */}
      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Image */}
        <div className="flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1661884072874-e1efc8f4b0d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About GreenImpact"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Section - Mission Statement */}
        <div>
          <h2 className="text-2xl font-semibold text-text">Our Mission</h2>
          <p className="text-muted mt-3">
            GreenImpact is dedicated to promoting environmental awareness,
            conservation efforts, and sustainable solutions. Through
            community-driven initiatives, volunteer programs, and eco-friendly
            events, we aim to create a positive impact on our planet.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <FaLeaf className="text-primaryColor text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-text">Sustainability</h3>
          <p className="text-muted mt-2">
            We advocate for responsible practices that protect our environment.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <FaHandsHelping className="text-secondaryColor text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-text">Community</h3>
          <p className="text-muted mt-2">
            Engaging individuals and organizations to drive real change.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <FaGlobe className="text-green-500 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-text">Impact</h3>
          <p className="text-muted mt-2">
            Creating meaningful and lasting environmental improvements.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-text">
          Join Us in Making a Difference!
        </h2>
        <p className="text-muted mt-2">
          Whether you volunteer, donate, or spread awareness, every action
          counts.
        </p>
        <button className="mt-4 bg-primaryColor text-white px-6 py-3 rounded-lg hover:bg-secondaryColor transition">
          Get Involved
        </button>
      </div>
    </section>
  );
};

export default About;
