import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SingleCoin } from "../services/apiLinks";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../context/CryptoContext";
import { CoinData } from "../components";
import { Container, LinearProgress, Typography } from "@mui/material";
import millify from "millify";

const CoinInfo = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //styles
  const header = "font-semibold mb-[20px] font-quicksand";

  if (!coin) return <LinearProgress className="bg-blue-400" />;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center ">
        <div className="lg:w-[50%] w-full flex flex-col items-center mt-[15px] ">
          <img
            src={coin?.image?.large}
            alt={coin?.name}
            className="h-[150px] mb-[8px] "
          />
          <Typography variant="h3" style={{ marginBottom: 20 }}>
            {coin?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            className="w-full font-quicksand px-[25px] pt-0 pb-[15px] mt-2 text-center "
          >
            {/* {ReactHtmlParser(coin?.description.en.split(". ")[0])}. */}
            {coin?.description?.en?.length > 500
              ? coin?.description?.en?.slice(0, 500) + "..."
              : coin?.description?.en}
          </Typography>
          <div className="self-start px-[25px] gap-2 pt-10 w-full flex  md:justify-around flex-col items-center ">
            <span className="flex">
              <Typography variant="h5" className={header}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Quicksand",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            <span className="flex">
              <Typography variant="h5" className={header}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Quicksand",
                }}
              >
                {symbol}{" "}
                {millify(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span className="flex">
              <Typography variant="h5" className={header}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Quicksand",
                }}
              >
                {symbol}{" "}
                {/* {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M */}
                {millify(coin?.market_data.market_cap[currency.toLowerCase()])}
              </Typography>
            </span>
          </div>
        </div>
        <CoinData coin={coin} />
      </div>
    </Container>
  );
};

export default CoinInfo;
