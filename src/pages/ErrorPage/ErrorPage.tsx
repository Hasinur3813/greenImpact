import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 p-6">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
        <FaExclamationCircle className="text-6xl text-red-500 mx-auto animate-pulse mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you're looking for, or an unexpected error
          occurred.
        </p>
        <Link
          to="/"
          className="inline-block bg-primaryColor hover:bg-secondaryColor text-white px-6 py-2 rounded-full font-semibold transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
