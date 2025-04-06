import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64 w-full">
      <div className="flex flex-col items-center gap-3 text-primaryColor animate-pulse">
        <FaSpinner className="animate-spin text-4xl" />
        <p className="text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
