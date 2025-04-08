// components/Sections/HowItWorks.tsx
import { motion } from "framer-motion";
import { fadeUpVariant, containerVariant } from "../../utils/animationVariants";
import { FaLightbulb, FaHandsHelping, FaLeaf } from "react-icons/fa";

const steps = [
  {
    title: "1. Discover Opportunities",
    description:
      "Browse events and causes that align with your passion for the planet.",
    icon: <FaLightbulb className="text-accentColor text-3xl" />,
  },
  {
    title: "2. Join & Contribute",
    description:
      "Volunteer or donate directly to initiatives that need your support.",
    icon: <FaHandsHelping className="text-accentColor text-3xl" />,
  },
  {
    title: "3. See Your Impact",
    description:
      "Track your contribution and celebrate the positive change you've made.",
    icon: <FaLeaf className="text-accentColor text-3xl" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl text-primaryColor font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                className=" bg-lightGray border text-primaryColor border-primaryColor/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-accentColor/20 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-primaryColor text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
