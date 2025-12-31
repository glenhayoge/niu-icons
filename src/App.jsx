import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Icons from "./pages/Icons";
import Guide from "./pages/Guide";
import "./index.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-base flex flex-col">
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

        <div className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </BrowserRouter>
  );
}