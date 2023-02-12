import React, { useEffect, useState } from "react";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { CoinList } from "../services/apiLinks";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

import millify from "millify";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    // const { data } = await axios.get(CoinList(currency));
    try {
      const { data } = await axios.get(CoinList(currency), {
        timeout: 5000,
      });
      setCoins(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <Container className="text-center ">
        <Typography
          variant="h4"
          style={{ marginBottom: 20, fontFamily: "Quicksand" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          className="mb-2 w-full "
          style={{
            marginBottom: 12,
            fontFamily: "Quicksand",
            width: "100%",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress className="bg-blue-400" />
          ) : (
            <Table aria-label="simple table">
              <TableHead className="bg-blue-100">
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Quicksand",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "center"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className="cursor-pointer  bg-[#fff] hover:bg-[#e6e6e673]"
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                          align=""
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            className="h-[50px] w-[50px] mb-[10px]"
                          />
                          <div className="flex flex-col">
                            <span className="uppercase text-[22px]">
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          }}
                          className="font-[500]"
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="center">
                          {symbol} {millify(row.market_cap)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          className="p-[20px] w-full flex justify-center font-quicksand"
          classes={{ ul: "text-black" }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </>
  );
}
