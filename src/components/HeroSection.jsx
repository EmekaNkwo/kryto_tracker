import { Container, Typography } from "@mui/material";

import CoinCarousel from "./CoinCarousel";

function HeroSection() {
  return (
    <>
      <Container className="h-[400px] flex pt-[25px] justify-around">
        <div className="flex h-[40%] flex-col justify-center text-center">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Quicksand",
            }}
          >
            Kryto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Quicksand",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <CoinCarousel />
      </Container>
    </>
  );
}

export default HeroSection;
