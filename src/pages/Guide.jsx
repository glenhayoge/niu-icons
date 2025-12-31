export default function Guide() {
    return (
        <div className="max-w-3xl mx-auto w-full py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Guide & Documentation</h1>

            <div className="prose prose-lg max-w-none">
                <h3>What is Niu Icons?</h3>
                <p>
                    Niu Icons is an open-source collection of SVG icons designed for simplicity and flexibility.
                    Originally created for a personal project, it has grown into a community-driven library.
                </p>

                <div className="divider"></div>

                <h3>Installation</h3>
                <div className="mockup-code">
                    <pre data-prefix="$"><code>npm install niu-icons</code></pre>
                    <pre data-prefix=">" className="text-warning"><code>(Coming soon to npm)</code></pre>
                </div>
                <p className="mt-4">
                    Currently, you can simply download the SVGs directly or copy the code from the <a href="/icons" className="link">Icons page</a>.
                </p>

                <div className="divider"></div>

                <h3>Contributing</h3>
                <p>
                    We welcome contributions! Whether you're a designer or developer, you can help grow Niu Icons.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Fork the repository on GitHub.</li>
                    <li>Add your SVG icons to the <code>public/icons</code> folder.</li>
                    <li>Update the data file with your category and handle.</li>
                    <li>Submit a Pull Request.</li>
                </ul>

                <div className="mt-8">
                    <a href="https://github.com/glenhayoge/niu-icons" target="_blank" className="btn btn-outline gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
