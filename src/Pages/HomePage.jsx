import React from "react";
import Banner from "../Components/HomeComponent/Banner";
import LatestItems from "../Components/HomeComponent/LatestItems";
import AboutUs from "../Components/AboutUs";
import FAQAccordion from "../Components/FAQAccordion";
import TestimonialsSection from "../Components/HomeComponent/TestimonialsSection";
import CommunityImpactSection from "../Components/HomeComponent/CommunityImact";

const HomePage = () => {
  return (
    <div className="">
      <Banner></Banner>
 
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 ">
      <AboutUs></AboutUs>

      </div>
      <LatestItems></LatestItems>
      <CommunityImpactSection></CommunityImpactSection>
      <TestimonialsSection></TestimonialsSection>
      <FAQAccordion></FAQAccordion>
    </div>
  );
};

export default HomePage;
