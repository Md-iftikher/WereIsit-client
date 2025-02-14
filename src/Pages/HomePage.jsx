import React from 'react';
import Banner from '../Components/HomeComponent/Banner';
import LatestItems from '../Components/HomeComponent/LatestItems';
import AboutUs from '../Components/AboutUs';

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutUs></AboutUs>
      <LatestItems></LatestItems>
    </div>
  );
};

export default HomePage;