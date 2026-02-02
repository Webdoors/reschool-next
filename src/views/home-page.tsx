import HomeContainer from "../containers/home/home";

import React from 'react'
import HeaderComponent from "../components/header/header";
export const HomePage: React.FC = () => {
  return <React.Fragment>
    <HeaderComponent/>
  
    <HomeContainer />
  </React.Fragment>
};

export default HomePage;
