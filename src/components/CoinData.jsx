/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../services/apiLinks";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

import Button from "./Button";
import { chartDays } from "../services/timeFrames";
import { CryptoState } from "../context/CryptoContext";
import { CircularProgress, LinearProgress } from "@mui/material";

const CoinData = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin?.id, days, currency));
    setflag(true);
    setHistoricData(data?.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <>
      <div className=" lg:w-[75%] flex flex-col items-center justify-center lg:mt-[25px] p-[40px] sm:w-full sm:mt-4 md:px-[20px] md:pt-0">
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "blue" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "rgb(37 99 235)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className="flex mt-[20px] justify-around w-full">
              {chartDays?.map((day) => (
                <Button
                  key={day?.value}
                  onClick={() => {
                    setDays(day?.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CoinData;
