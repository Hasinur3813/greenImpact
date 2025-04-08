import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/images/hero-bg.jpg')] h-[550px]  bg-cover bg-center bg-offWhite text-text py-20 flex flex-col items-center text-center px-6 md:px-12">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-bold text-primaryColor leading-tight">
          Join the Movement for a Greener Future
        </h1>
        <p className="text-base sm:text-lg text-white mt-4 md:mt-6">
          Be part of something bigger! Volunteer, donate, and participate in
          events to create a sustainable impact on our planet.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={"/events"}>
            <button className="bg-primaryColor cursor-pointer text-lightGray px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondaryColor transition">
              Get Involved
            </button>
          </Link>
          <Link to={"/donate"}>
            <button className="bg-secondaryColor cursor-pointer text-lightGray px-6 py-3 rounded-lg text-lg font-medium hover:bg-primaryColor transition">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
