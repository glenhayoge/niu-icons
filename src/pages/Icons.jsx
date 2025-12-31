import { useEffect, useState } from "react";
import { ICONS_DATA, CATEGORIES } from "../data";

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
            <div className="card-body h-12 w-12  justify-center mx-auto items-center text-center">
                <div
                    className="w-7 h-7 text-center"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            </div>
        </div>
    );
};

const IconModal = ({ name, svgContent, contributor, onClose }) => {
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
                <div className="w-full md:w-1/2 bg-base-200/50 flex items-center justify-center p-12 min-h-[300px] relative">
                    {/* Grid Background */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    ></div>

                    <div
                        className="w-48 h-48 [&>svg]:w-full [&>svg]:h-full z-10 drop-shadow-sm"
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

                        {contributor && (
                            <div className="mt-4 text-center">
                                <p className="text-xs text-base-content/60">
                                    Contributor: <a href={`https://github.com/${contributor}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline font-medium">@{contributor}</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default function Icons() {
    const [search, setSearch] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(false);
    const [modalContent, setModalContent] = useState({ name: "", svg: "", contributor: "" });
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredIcons = ICONS_DATA.filter((icon) => {
        const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "All" || icon.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const openModal = (name, svg) => {
        const iconData = ICONS_DATA.find(i => i.name === name);
        setModalContent({ name, svg, contributor: iconData?.contributor });
        setSelectedIcon(true);
    };

    const closeModal = () => {
        setSelectedIcon(false);
        setModalContent({ name: "", svg: "", contributor: "" });
    };

    return (
        <div className="flex flex-col items-center max-w-3xl mx-auto justify-center max-w-screen-3xl mx-auto flex-grow w-full">
            <div className="max-w-4xl mx-auto text-center justify-center relative w-full mb-12">
                <h2 className="text-3xl font-bold mb-6">Browse Icons</h2>

                <div className="flex justify-center my-6">
                    <div role="tablist" className="tabs tabs-boxed">
                        {CATEGORIES.map((category) => (
                            <a
                                key={category}
                                role="tab"
                                className={`tab ${activeCategory === category ? "tab-active" : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>

                <label className="input input-bordered rounded-xl mt-4 input-lg flex items-center gap-2 w-full max-w-4xl mx-auto">
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
            </div>

            <section className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 w-full">
                {filteredIcons.length > 0 ? (
                    filteredIcons.map((icon) => (
                        <IconCard key={icon.name} name={icon.name} onClick={openModal} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-lg text-base-content opacity-70">No matches found</p>
                        <p className="text-sm mt-2">Try a different search term</p>
                    </div>
                )}
            </section>

            {selectedIcon && (
                <IconModal
                    name={modalContent.name}
                    svgContent={modalContent.svg}
                    contributor={modalContent.contributor}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
