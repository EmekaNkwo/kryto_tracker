import React from "react";
import { CoinTable, HeroSection } from "../components";

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <HeroSection />
      <CoinTable />
    </div>
  );
};

export default Home;
