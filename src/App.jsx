// src/App.jsx
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./layout/main";
import Shop from "./pages/shop";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
