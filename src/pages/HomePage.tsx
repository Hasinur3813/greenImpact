import DonationSection from "../components/DonationSection/DonationSection";

import HeroSection from "../components/HeroSection/HeroSection";
import HowItWorks from "../components/HowItWorkSection/HowItWorks";
import OurImpact from "../components/OurImpactSection/OurImpact";
import PopularEvents from "../components/PopularEvents/PopularEvents";

import VisionMissionSection from "../components/VisionMissionSection/VisionMissionSection";
import CallToActionSection from "../components/CallToActionSection/CallToActionSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularEvents />
      <HowItWorks />
      <OurImpact />
      {/* <GetInvolved /> */}
      <DonationSection />
      <VisionMissionSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;
