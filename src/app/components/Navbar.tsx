export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a
          href="#home"
          className="text-sm font-semibold tracking-wide text-white/90 hover:text-white"
        >
          Aurora
        </a>
        <div className="space-x-6 text-sm">
          <a href="#home" className="text-white/80 hover:text-indigo-400">
            Home
          </a>
          <a href="#about" className="text-white/80 hover:text-indigo-400">
            About
          </a>
          <a href="#skills" className="text-white/80 hover:text-indigo-400">
            Skills
          </a>
          <a href="#game" className="text-white/80 hover:text-indigo-400">
            🦕
          </a>
          <a href="#contact" className="text-white/80 hover:text-indigo-400">
            Contact
          </a>
          
        </div>
      </div>
    </nav>
  );
}
