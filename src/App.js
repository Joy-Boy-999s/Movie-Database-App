import React from "react";
import "./App.css";
import Navbar from "./components/Header";

function App() {
  return (
    <>
      {/* Glassmorphism Overlay */}
      <div className="glass-overlay"></div>

      {/* Main Content */}
      <Navbar />
      <div className="glossy-container">
        
        <h1>Welcome to My Movie App</h1>
        <p>Enjoy a sleek, glossy background with a glass effect!</p>
        <p style={{ marginBottom: "100vh" }}>
          Scroll down to see how the content moves inside the glossy container!
        </p>
      </div>
    </>
  );
}

export default App;
