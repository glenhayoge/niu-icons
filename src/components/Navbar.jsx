export default function Navbar({ toggleTheme, darkMode }) {
    return (
        <div className="navbar bg-base-100 max-w-4xl mx-auto w-full  sticky top-0 z-50 px-4 sm:px-8">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl gap-2 px-2">
                    <img src="/niu-icons.svg" alt="Niu-Icons" className="w-8 h-8" />
                    <span className="font-bold tracking-wide">Niu<span className="text-gray-400 font-normal">Icons</span></span>
                </a>
            </div>
            <div className="flex-none gap-2">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li>
                        <a href="/icons" className="font-medium hover:text-primary">Icons</a>
                    </li>
                    <li>
                        <a href="/guide" className="font-medium hover:text-primary">Guide</a>
                    </li>
                </ul>
                <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
                    <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
                    <div className="swap-on">🌙</div>
                    <div className="swap-off">☀️</div>
                </label>
            </div>
        </div>
    );
}
