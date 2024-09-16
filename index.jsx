import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Layout from "./components/Layout"
import Watchlist from "./pages/Watchlist"
import HomePage from "./pages/HomePage"
import RandomMov from "./pages/RandomMov"


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="random" element={<RandomMov />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)