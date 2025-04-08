// components/Sections/OurImpact.tsx
import { motion } from "framer-motion";
import { containerVariant, fadeUpVariant } from "../../utils/animationVariants";
import {
  FaTree,
  FaHandsHelping,
  FaGlobeAmericas,
  FaRecycle,
} from "react-icons/fa";

const impactStats = [
  {
    title: "10,000+ Trees Planted",
    icon: <FaTree className="text-4xl text-accentColor" />,
  },
  {
    title: "3,000+ Volunteers Engaged",
    icon: <FaHandsHelping className="text-4xl text-accentColor" />,
  },
  {
    title: "50+ Communities Reached",
    icon: <FaGlobeAmericas className="text-4xl text-accentColor" />,
  },
  {
    title: "200+ Cleanups Organized",
    icon: <FaRecycle className="text-4xl text-accentColor" />,
  },
];

const OurImpact = () => {
  return (
    <section className="py-20 bg-primaryColor/5 text-white px-6 md:px-10">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        className="container px-4 mx-auto text-center"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="text-4xl text-primaryColor font-bold mb-6"
        >
          Our Impact
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="text-secondaryColor mb-12 max-w-2xl mx-auto"
        >
          Every contribution helps us build a more sustainable future. Here’s a
          glimpse of what we’ve achieved—thanks to people like you.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              className="bg-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-primaryColor border border-primaryColor/50"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OurImpact;
