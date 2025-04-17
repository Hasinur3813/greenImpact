import { motion } from "framer-motion";
const SummaryCard = ({
  icon,
  title,
  value,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  className?: string;
}) => (
  <motion.div
    className={`${className} bg-white p-6 rounded-xl shadow-md flex items-center gap-4`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="text-3xl text-primaryColor">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </motion.div>
);

export default SummaryCard;
