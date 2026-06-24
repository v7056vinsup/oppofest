import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StudentFormModal from "./StudentFormModal";
export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Event", href: "#highlights" },
    { label: "Venue", href: "#venue" },
  ];

  useEffect(() => {
  if (showPassModal || showStudentForm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showPassModal, showStudentForm]); 

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
            OPPO SPEED<span className="text-red-500">FEST</span>
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
          {/* <button
            onClick={() => window.open("https://pay.jodo.in/pages/zsQ6BRVfrLGHZyYh", "_blank")}
            className="btn-race rounded-lg px-5 py-2 font-orbitron text-white text-sm font-bold tracking-wider"
          >   
            🎟️ BOOK NOW
          </button> */}
          <button
            onClick={() => setShowPassModal(true)}
            className="btn-race rounded-lg px-5 py-2 font-orbitron text-white text-sm font-bold tracking-wider"
          >
            🎟️ BOOK NOW
          </button>

           <button
            onClick={() =>
              window.open(
                "https://maps.app.goo.gl/2XDhCw6YKYs8X3Y56",
                "_blank"
              )
            }
            className="rounded-lg px-5 py-2 bg-gradient-to-r from-yellow-600 to-orange-500 hover:bg-gradient-to-r hover:from-yellow-700 hover:to-orange-600 text-white font-orbitron text-sm font-bold tracking-wider transition-all"
          >
            📍 CONTACT US
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
              {/* <button
                onClick={() => { setMenuOpen(false); onBookClick(); }}
                className="btn-race w-full rounded-lg px-5 py-3 font-orbitron text-white text-sm font-bold"
              >
                🎟️ BOOK NOW — Students ₹99 · General ₹249
              </button> */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowPassModal(true);
                }}
                className="btn-race w-full rounded-lg px-5 py-3 font-orbitron text-white text-sm font-bold"
              >
                🎟️ BOOK NOW
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.open(
                    "https://maps.app.goo.gl/2XDhCw6YKYs8X3Y56",
                    "_blank"
                  );
                }}
                className="w-full rounded-lg px-5 py-3 bg-gradient-to-r from-yellow-600 to-orange-500 hover:bg-gradient-to-r hover:from-yellow-700 hover:to-orange-600 text-white font-orbitron text-sm font-bold"
              >
                📍 CONTACT US
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pass Selection Modal */}
      <AnimatePresence>
        {showPassModal && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
             style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
              }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-red-500/40 mx-auto"
            >
              <h2 className="text-white text-2xl font-bold mb-6">
                Select Pass Type
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowPassModal(false);
                    setShowStudentForm(true);
                  }}
                  className="w-full p-4 rounded-xl bg-red-600 text-white font-bold"
                >
                  🎓 Student Pass ₹99
                </button>

                <button
                  onClick={() => {
                    window.open(
                      "https://pay.jodo.in/pages/zsQ6BRVfrLGHZyYh",
                      "_blank"
                    );

                    setShowPassModal(false);
                  }}
                  className="w-full p-4 rounded-xl bg-yellow-500 text-black font-bold"
                >
                  👤 General Pass ₹249
                </button>

                <button
                  onClick={() => setShowPassModal(false)}
                  className="w-full p-3 text-gray-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StudentFormModal
        open={showStudentForm}
        onClose={() => setShowStudentForm(false)}
      />
    </motion.nav>
  );
}
