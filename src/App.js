import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { CoinInfo, Home } from "./pages";

function App() {
  return (
    <div className="min-h-[100vh]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/coins/:id" element={<CoinInfo />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
