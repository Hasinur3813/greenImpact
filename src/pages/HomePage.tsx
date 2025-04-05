import HeroSection from "../components/HeroSection/HeroSection";
import PopularEvents from "../components/PopularEvents/PopularEvents";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <>
      <Toaster />
      <HeroSection />
      <PopularEvents />
    </>
  );
};

export default HomePage;
