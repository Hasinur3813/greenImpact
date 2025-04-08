import { motion } from "framer-motion";
import { FaHandsHelping, FaRegComment, FaShareAlt } from "react-icons/fa";

const GetInvolved = () => {
  const fadeIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 px-6 bg-color-bg-secondary">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-primaryColor mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Get Involved
        </motion.h2>
        <motion.p
          className="text-lg text-muted mb-12"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          Explore opportunities to make a difference with us.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {/* Volunteer Section */}
          <motion.div
            className="text-center p-6 bg-white shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaHandsHelping className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Volunteer
            </h3>
            <p className="text-muted mb-4">
              Offer your time and skills to support our cause.
            </p>
            <button className="bg-secondaryColor hover:bg-accent-hover text-white py-2 px-4 rounded-md">
              Sign Up
            </button>
          </motion.div>

          {/* Share Section */}
          <motion.div
            className="text-center p-6 bg-white shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaShareAlt className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Share
            </h3>
            <p className="text-muted mb-4">
              Help us reach a wider audience by sharing our mission.
            </p>
            <button className="bg-secondaryColor hover:bg-accent-hover text-white py-2 px-4 rounded-md">
              Share Now
            </button>
          </motion.div>

          {/* Donate Section */}
          <motion.div
            className="text-center p-6 bg-white shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaRegComment className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Donate
            </h3>
            <p className="text-muted mb-4">
              Contribute to our initiatives with your generous donation.
            </p>
            <button className="bg-secondaryColor hover:bg-accent-hover text-white py-2 px-4 rounded-md">
              Donate Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
