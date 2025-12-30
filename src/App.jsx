import { useEffect, useState } from "react";
import "./index.css";

const ICONS = [
  "home",
  "rose",
  "lime",
  "carrot",
  "cooking-pot",
  "trees",
  "flower",
  "leaf-nature",
  "spade",
  "sprout",
  "tree-palm",
  "tree",
  "tree-pine",
  "bug",
  "snail",
  "worm",
  "wheat",
  "salad",
  "tractor",
  "cherry",
  "fish",
  "church",
  "fence",
  "store",
  "power-pole",



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
      className="card bg-base-300 border border-base-200 hover:border-base-300 transition cursor-pointer"
      onClick={() => onClick(name, svgContent)}
    >
      <div className="card-body h-12 w-12 justify-center items-center text-center">
        <div
          className="w-7 h-7"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        {/* <h2 className="card-title text-sm">{name}</h2> */}
      </div>
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
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl p-0 overflow-hidden relative flex flex-col md:flex-row bg-base-100">
        <button
          className="btn btn-sm btn-circle mixed btn-ghost absolute right-4 top-4 z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Left Side: Icon */}
        <div className="w-full md:w-1/2 bg-base-200 flex items-center justify-center p-12 min-h-[300px]">
          <div
            className="w-48 h-48 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center gap-6">
          <h2 className="text-3xl font-bold capitalize">{name}</h2>

          <div className="flex flex-col gap-3 w-full max-w-xs transition-all">
            <button
              onClick={handleCopy}
              className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all"
            >
              {copied ? "Copied!" : "Copy SVG"}
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline w-full hover:bg-base-200"
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
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
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute('data-theme', 'light');
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
    <main className="min-h-screen bg-base p-8 flex flex-col">
      <header className="max-w-4xl mb-8 lg:mb-4 mx-auto text-center justify-center relative">
        <div className="flex justify-left container  p-2">
          <img src="/niu-icons.svg" alt="Niu-Icons" className="w-12 h-12 " />
          <h1 className="text-2xl tracking-wider mt-2 font-bold text-base-content pb-3 ml-4 mb-4 ">Niu <span className=" -ml-1 text-gray-400">Icons</span></h1>
        </div>

        <p className="text-base mt-2">
          Free SVG icons with attribution. Simply, click to view, copy or download!
        </p>

        <label className="input input-bordered rounded-xl mt-4 input-lg flex items-center gap-2 w-full max-w-4xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>

          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow bg-transparent outline-none"
          />

          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>

        <div className="absolute top-0 right-0 m-2">
          <label className="swap swap-rotate">
            <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
            <div className="swap-on">🌙</div>
            <div className="swap-off">☀️</div>
          </label>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center max-w-screen-3xl mx-auto flex-grow">
        <section className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {filteredIcons.length > 0 ? (
            filteredIcons.map((icon) => (
              <IconCard key={icon} name={icon} onClick={openModal} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-base-content opacity-70">No matches found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-12 py-4 text-base-content opacity-70 border-t border-base-300 max-w-3xl mx-auto container">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-xs">Made with ❤️ in Papua New Guinea</p>
          <a
            href="https://github.com/glenhayoge/niu-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline flex items-center gap-1 "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline-block mr-2">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Repository
          </a>
        </div>
      </footer>

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