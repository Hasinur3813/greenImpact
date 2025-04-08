import { motion } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";

const CallToActionSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 px-6 bg-color-offWhite text-center">
      <motion.h2
        className="text-3xl font-bold text-primaryColor mb-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        Join the Movement for a Greener Future
      </motion.h2>

      <motion.p
        className="text-lg text-muted mb-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
      >
        Be a part of something bigger—help us plant trees, reduce waste, and
        promote sustainable living.
      </motion.p>

      <motion.div
        className="flex justify-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link to={"/events"}>
          <button className="bg-primaryColor cursor-pointer text-white hover:bg-secondaryColor py-3 px-6 rounded-lg flex items-center gap-3">
            <FaHandsHelping />
            Get Involved
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;
