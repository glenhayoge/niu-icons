export default function Home() {
    return (
        <div className="hero min-h-[70vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    {/* <div className="flex justify-center mb-6">
                        <img src="/niu-icons.svg" alt="Niu-Icons" className="w-24 h-24" />
                    </div> */}
                    <h1 className="text-4xl font-bold">Niu<span className="text-gray-400">Icons</span></h1>
                    <p className="py-6 text-lg opacity-80">
                        Open source SVG icons, handcrafted with love. Perfect for modern web applications & digital designs.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a href="/icons" className="btn btn-primary">Browse Icons</a>
                        <a href="/guide" className="btn btn-ghost">Read Guide</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
