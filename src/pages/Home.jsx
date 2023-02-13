import React from "react";
import { HeroSection } from "../components";
import { MemorizedTable } from "../components/CoinTable";

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <HeroSection />

      <MemorizedTable />
    </div>
  );
};

export default Home;
