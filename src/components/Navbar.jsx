import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Event", href: "#highlights" },
    { label: "Venue", href: "#venue" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-red-900/30 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <img src="tcm.png" alt="chennai mobiles" className="w-20 h-auto object-contain" />
        <a href="#" className="flex items-center gap-2">
          <div className="checker-bg w-7 h-7 rounded-sm" />
          <span className="font-orbitron text-white font-black text-lg">
            SPEED<span className="text-red-500">FEST</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-rajdhani text-gray-300 hover:text-red-400 text-base font-semibold tracking-wider transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => window.open("https://pay.jodo.in/pages/zsQ6BRVfrLGHZyYh", "_blank")}
            className="btn-race rounded-lg px-5 py-2 font-orbitron text-white text-sm font-bold tracking-wider"
          >   
            🎟️ BOOK NOW
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-card border-t border-red-900/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-rajdhani text-gray-300 hover:text-red-400 text-lg font-semibold py-2"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onBookClick(); }}
                className="btn-race w-full rounded-lg px-5 py-3 font-orbitron text-white text-sm font-bold"
              >
                🎟️ BOOK NOW — Students ₹99 · General ₹249
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
