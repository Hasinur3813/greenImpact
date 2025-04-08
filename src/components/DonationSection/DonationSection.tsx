import { motion } from "framer-motion";
import { FaDonate, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router";

const DonationSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 bg-color-bg-secondary">
      <div className="container px-4 mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-primaryColor mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Make a Difference – Donate Today
        </motion.h2>
        <motion.p
          className="text-lg text-muted mb-12"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          Your donation helps us create a lasting impact in our community and
          beyond.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donate Now Section */}
          <motion.div
            className="text-center p-6 bg-lightGray shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaDonate className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Donate Now
            </h3>
            <p className="text-muted mb-4">
              Your contribution supports our mission to empower communities.
              Choose an amount to give today.
            </p>
            <Link to={"/donate"}>
              <button className="bg-secondaryColor cursor-pointer hover:bg-primaryColor text-white py-2 px-4 rounded-md">
                Donate
              </button>
            </Link>
          </motion.div>

          {/* Donation Options Section */}
          <motion.div
            className="text-center p-6 bg-lightGray shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaCreditCard className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Choose Your Amount
            </h3>
            <div className="space-y-4">
              <button className="bg-secondaryColor text-white py-2 px-4 rounded-md w-full hover:bg-primaryColor cursor-pointer">
                $10 - Support a Cause
              </button>
              <button className="bg-secondaryColor text-white py-2 px-4 rounded-md w-full hover:bg-primaryColor cursor-pointer">
                $25 - Make a Bigger Impact
              </button>
              <button className="bg-secondaryColor text-white py-2 px-4 rounded-md w-full hover:bg-primaryColor cursor-pointer">
                $50 - Empower a Community
              </button>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <motion.p
            className="text-lg text-muted"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            Or, choose any amount that works best for you!
          </motion.p>
          <Link to={"/donate"}>
            <motion.button
              className="mt-4 bg-secondaryColor cursor-pointer hover:bg-primaryColor text-white py-3 px-6 rounded-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
            >
              Custom Amount
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
