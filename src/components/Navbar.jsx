import {
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Container,
  AppBar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

function Navbar() {
  const { currency, setCurrency } = CryptoState();

  const naviagte = useNavigate();

  return (
    <div>
      <AppBar
        color="transparent"
        style={{
          boxShadow: "none",
          borderBottom: "1px solid lightgrey",
        }}
        position="static"
      >
        <Container>
          <Toolbar className="flex justify-between ">
            <Typography
              onClick={() => naviagte("/")}
              variant="h5"
              style={{
                color: "black",
                fontFamily: "Quicksand",
                fontWeight: 600,
              }}
              className="cursor-pointer"
            >
              Kryto
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              className="w-[100px] h-[40px] ml-[15px]"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
