import React from "react";
import "./App.css";
import Navbar from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import SearchMovies from "./components/SearchMovies";

function App() {
  return (
    <>
      {/* Glassmorphism Overlay */}
      <div className="glass-overlay"></div>

      {/* Main Content */}
      <Navbar />
      <div className="glossy-container">
        <h1>Welcome to My Movie App</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search" element={<SearchMovies />} />
        </Routes>

        <p style={{ marginBottom: "100vh" }}></p>
      </div>
    </>
  );
}

export default App;
