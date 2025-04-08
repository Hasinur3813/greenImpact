import { motion } from "framer-motion";
import { FaEye, FaBullhorn } from "react-icons/fa";

const VisionMissionSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 bg-lightGray">
      <div className="container px-4 mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-primaryColor mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Our Vision & Mission
        </motion.h2>
        <motion.p
          className="text-lg text-muted mb-12"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          At GreenImpact, we are driven by a clear vision and a strong mission
          to create lasting change in our communities.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Section */}
          <motion.div
            className="text-center p-6 bg-white shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaEye className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Our Vision
            </h3>
            <p className="text-muted">
              Our vision is to empower communities to embrace sustainability,
              creating a greener world for future generations.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="text-center p-6 bg-white shadow-md rounded-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <FaBullhorn className="text-5xl text-primaryColor mb-4" />
            <h3 className="text-2xl font-semibold text-primaryColor mb-2">
              Our Mission
            </h3>
            <p className="text-muted">
              Our mission is to drive positive change by engaging individuals in
              environmental initiatives, offering resources and tools to make
              impactful decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
