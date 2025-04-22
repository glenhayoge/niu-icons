// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";

const ICONS = [
  "home",
  "user",
  "search",
  "settings",
  "star",
  // Add more icon names that match your public/icons/*.svg
];


const IconCard = ({ name, onClick }) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch(`/icons/${name}.svg`)
      .then((res) => res.text())
      .then(setSvgContent)
      .catch(console.error);
  }, [name]);

  return (
    <div
      className="flex flex-col items-center border rounded-2xl p-4 shadow hover:shadow-md transition cursor-pointer"
      onClick={() => onClick(name, svgContent)}
    >
      <div
        className="w-12 h-12 mb-2"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <p className="text-sm text-gray-700 mb-2 text-center">{name}</p>
    </div>
  );
};

const IconModal = ({ name, svgContent, onClose }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (svgContent) {
      await navigator.clipboard.writeText(svgContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {copied ? "Copied!" : "Copy SVG"}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(false);
  const [modalContent, setModalContent] = useState({ name: "", svg: "" });

  const filteredIcons = ICONS.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (name, svg) => {
    setModalContent({ name, svg });
    setSelectedIcon(true);
  };

  const closeModal = () => {
    setSelectedIcon(false);
    setModalContent({ name: "", svg: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
<header className="mb-8 text-center relative">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🌟 SVG Icon Library</h1>
  <p className="text-gray-600 dark:text-gray-300 mt-2">
    Free SVG icons with attribution. Click to view, copy or download!
  </p>

  <input
    type="text"
    placeholder="Search icons..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-4 px-4 py-2 w-full max-w-sm border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
  />

  <button
    onClick={toggleTheme}
    className="absolute top-0 right-0 m-2 px-3 py-1 text-sm rounded border bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
  >
    {darkMode ? "🌙 Dark" : "☀️ Light"}
  </button>
</header>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredIcons.map((icon) => (
          <IconCard key={icon} name={icon} onClick={openModal} />
        ))}
      </section>
      {selectedIcon && (
        <IconModal
          name={modalContent.name}
          svgContent={modalContent.svg}
          onClose={closeModal}
        />
      )}
    </main>
  );
}