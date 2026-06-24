// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Canvas } from "@react-three/fiber";
// import { Float, Html } from "@react-three/drei";
// import CountdownTimer from "./CountdownTimer";
// import heroImg from "../assets/hero.png";

// // ── Reactive window width ─────────────────────────────────────────────────────
// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handler = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return width;
// }

// // ── Floating ticket card ──────────────────────────────────────────────────────
// function FloatingTicket({ title, price, color, position, distanceFactor }) {
//   return (
//     <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8} floatingRange={[-0.3, 0.3]}>
//       <group position={position}>
//         <Html transform distanceFactor={distanceFactor}>
//           <div
//             className={`w-[360px] rounded-3xl overflow-hidden backdrop-blur-xl bg-black/75 border ${
//               color === "gold"
//                 ? "border-yellow-500/60 shadow-[0_0_50px_rgba(234,179,8,0.3)]"
//                 : "border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.35)]"
//             }`}
//           >
//             {/* Header */}
//             <div
//               className={`h-20 flex items-center justify-center ${
//                 color === "gold"
//                   ? "bg-gradient-to-r from-yellow-600 to-orange-500"
//                   : "bg-gradient-to-r from-red-700 via-red-500 to-orange-500"
//               }`}
//             >
//               <img src="vinsup.png" alt="Pass" className="w-36 h-auto object-contain" />
//             </div>

//             {/* Body */}
//             <div className="p-5">
//               <p className={`text-xs uppercase tracking-widest mb-1 ${color === "gold" ? "text-yellow-400" : "text-red-400"}`}>
//                 OPPO SPEED FEST
//               </p>
//               <h3 className="text-white text-2xl font-black mb-4">{title}</h3>

//               <div className="space-y-1.5 text-gray-300 text-sm mb-5">
//                 <p>📅 28 June 2026</p>
//                 <p>⏰ 1PM – 6PM</p>
//                 <p>📍 Kari Motor Speedway, CBE</p>
//               </div>

//               <div className={`border-t pt-4 ${color === "gold" ? "border-yellow-500/20" : "border-red-500/20"}`}>
//                 <p className="text-gray-400 text-xs mb-1">Ticket Price</p>
//                 <div className="flex items-baseline gap-2">
//                   <p className="text-white text-4xl font-black">₹{price}</p>
//                   <p className="text-gray-600 line-through text-base">₹999</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Html>
//       </group>
//     </Float>
//   );
// }

// // ── Main section ──────────────────────────────────────────────────────────────
// export default function HeroSection({ onBookClick }) {
//   const width = useWindowWidth();
//   const isMobile = width < 768;
//   const isSmallMobile = width < 480;

//   // Canvas camera distance — pull back more on small screens so cards fit
//   const cameraZ = isSmallMobile ? 22 : isMobile ? 18 : 14;

//   // distanceFactor: lower = the HTML element appears BIGGER in 3D space
//   const df = isSmallMobile ? 1.6 : isMobile ? 1.9 : 2.4;

//   // Card positions: stacked vertically on mobile, side by side on desktop
//   const pos1 = isMobile ? [0,  2.2, 0] : [-2.4, 0, 0];
//   const pos2 = isMobile ? [0, -2.2, 0] : [ 2.4, 0, 0];

//   // Canvas container height
//   const canvasH = isSmallMobile ? "520px" : isMobile ? "640px" : "900px";

//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${heroImg})` }}
//       />
//       <div className="absolute inset-0 hero-overlay" />
//       <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-red-950/30 to-transparent pointer-events-none" />
//       <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-red-950/30 to-transparent pointer-events-none" />

//       {/* Content grid */}
//       <div className="relative z-10 min-h-screen px-6 sm:px-10 lg:px-20 pt-20 pb-10 flex items-center">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

//           {/* ── Left: text content ── */}
//           <div className="max-w-xl">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center gap-3 mb-4"
//             >
//               <div className="checker-bg w-8 h-8 rounded-sm" />
//               <span className="font-orbitron text-sm tracking-[0.25em] text-red-400 uppercase">
//                 TCM Tribe Presents
//               </span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35, duration: 0.7 }}
//               className="font-orbitron leading-none mb-2"
//             >
//               <span className="block text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">OPPO</span>
//               <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-gradient-red drop-shadow-2xl">SPEED</span>
//               <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-2xl">FEST</span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//               className="font-rajdhani text-lg text-gray-300 tracking-widest mb-6"
//             >
//               SPEED. POWER. PASSION. — ALL ON TRACK!
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.85 }}
//               className="flex flex-wrap gap-3 mb-8"
//             >
//               {[
//                 { icon: "📅", text: "28th June 2026" },
//                 { icon: "⏰", text: "1PM – 6PM" },
//                 { icon: "📍", text: "Kari Motor Speedway, CBE" },
//               ].map((chip, i) => (
//                 <div key={i} className="flex items-center gap-2 glass-card race-border rounded-full px-4 py-2 text-sm font-rajdhani text-white">
//                   <span>{chip.icon}</span>
//                   <span>{chip.text}</span>
//                 </div>
//               ))}
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               className="mb-8"
//             >
//               <p className="font-orbitron text-xs text-gray-500 tracking-[0.2em] mb-3 uppercase">Race Starts In</p>
//               <CountdownTimer />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.15 }}
//               className="flex flex-wrap gap-4"
//             >
//               <button
//                 onClick={onBookClick}
//                 className="btn-race rounded-xl px-8 py-4 font-orbitron text-white font-black text-base tracking-wider uppercase animate-pulse-red"
//               >
//                 🎟️ Students ₹99 · Public ₹249
//               </button>
//               <a
//                 href="#highlights"
//                 className="btn-gold rounded-xl px-8 py-4 font-orbitron text-black font-black text-base tracking-wider uppercase"
//               >
//                 Explore Event
//               </a>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.3 }}
//               className="mt-6"
//             >
//               <div className="glass-card race-border rounded-lg px-4 py-2 glow-red inline-flex items-center gap-3">
//                 <div className="text-center">
//                   <span className="font-rajdhani text-gray-400 text-xs block">Students</span>
//                   <span className="font-orbitron text-xl font-black text-white">₹99</span>
//                 </div>
//                 <div className="w-px h-8 bg-gray-600" />
//                 <div className="text-center">
//                   <span className="font-rajdhani text-gray-400 text-xs block">General</span>
//                   <span className="font-orbitron text-xl font-black text-white">₹249</span>
//                 </div>
//                 <div className="w-px h-8 bg-gray-600" />
//                 <span className="font-rajdhani text-gray-500 text-sm line-through">₹999</span>
//               </div>
//             </motion.div>
//           </div>

//           {/* ── Right: floating ticket cards ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.8 }}
//             style={{ height: canvasH }}
//             className="flex justify-center items-center"
//           >
//             <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
//               <ambientLight intensity={2} />
//               <directionalLight position={[5, 5, 5]} intensity={2} />

//               <FloatingTicket
//                 title="STUDENT PASS"
//                 price="99"
//                 color="red"
//                 position={pos1}
//                 distanceFactor={df}
//               />
//               <FloatingTicket
//                 title="PUBLIC PASS"
//                 price="249"
//                 color="gold"
//                 position={pos2}
//                 distanceFactor={df}
//               />
//             </Canvas>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import CountdownTimer from "./CountdownTimer";
import heroImg from "../assets/hero.png";

// ── Reactive window width ─────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ── Floating ticket card ──────────────────────────────────────────────────────
function FloatingTicket({ title, price, color, position, distanceFactor, cardWidth }) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8} floatingRange={[-0.3, 0.3]}>
      <group position={position}>
        <Html transform distanceFactor={distanceFactor} center prepend zIndexRange={[10, 0]}>
          <div
            style={{ width: cardWidth }}
            className={`rounded-3xl overflow-hidden backdrop-blur-xl bg-black/75 border ${
              color === "gold"
                ? "border-yellow-500/60 shadow-[0_0_50px_rgba(234,179,8,0.3)]"
                : "border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.35)]"
            }`}
          >
            {/* Header */}
            <div
              className={`h-20 flex items-center justify-center ${
                color === "gold"
                  ? "bg-gradient-to-r from-yellow-600 to-orange-500"
                  : "bg-gradient-to-r from-red-700 via-red-500 to-orange-500"
              }`}
            >
              <img src="vinsup.png" alt="Pass" className="w-36 h-auto object-contain" />
            </div>

            {/* Body */}
            <div className="p-5">
              <p className={`text-xs uppercase tracking-widest mb-1 ${color === "gold" ? "text-yellow-400" : "text-red-400"}`}>
                OPPO SPEED FEST
              </p>
              <h3 className="text-white text-2xl font-black mb-4">{title}</h3>

              <div className="space-y-1.5 text-gray-300 text-sm mb-5">
                <p>📅 28 June 2026</p>
                <p>⏰ 1PM – 6PM</p>
                <p>📍 Kari Motor Speedway, CBE</p>
              </div>

              <div className={`border-t pt-4 ${color === "gold" ? "border-yellow-500/20" : "border-red-500/20"}`}>
                <p className="text-gray-400 text-xs mb-1">Ticket Price</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-white text-4xl font-black">₹{price}</p>
                  <p className="text-gray-600 line-through text-base">₹999</p>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function HeroSection({ onBookClick }) {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isSmallMobile = width < 480;

  // Camera distance
  const cameraZ = isSmallMobile ? 9 : isMobile ? 10 : 16;

  // distanceFactor: HIGHER = HTML projects SMALLER in 3D space.
  // Desktop needs a bigger value so both cards shrink to fit side-by-side.
  const df = isSmallMobile ? 2.2 : isMobile ? 2.3 : 3.6;

  // CSS width of each card div
  const cardWidth = isSmallMobile ? 280 : isMobile ? 300 : 380;

  // Card positions: stacked vertically on mobile, tighter side-by-side on desktop
  const pos1 = isMobile ? [0,  1.6, 0] : [-1.6, 0, 0];
  const pos2 = isMobile ? [0, -1.6, 0] : [ 1.6, 0, 0];

  // Canvas container height
  const canvasH = isSmallMobile ? "620px" : isMobile ? "720px" : "960px";

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-red-950/30 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-red-950/30 to-transparent pointer-events-none" />

      {/* Content grid */}
      <div className="relative z-10 min-h-screen px-6 sm:px-10 lg:px-20 pt-20 pb-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

          {/* ── Left: text content ── */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="checker-bg w-8 h-8 rounded-sm" />
              <span className="font-orbitron text-sm tracking-[0.25em] text-red-400 uppercase">
                TCM Tribe Presents
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-orbitron leading-none mb-2"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">OPPO</span>
              <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-gradient-red drop-shadow-2xl">SPEED</span>
              <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-2xl">FEST</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-rajdhani text-lg text-gray-300 tracking-widest mb-6"
            >
              SPEED. POWER. PASSION. — ALL ON TRACK!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { icon: "📅", text: "28th June 2026" },
                { icon: "⏰", text: "1PM – 6PM" },
                { icon: "📍", text: "Kari Motor Speedway, CBE" },
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2 glass-card race-border rounded-full px-4 py-2 text-sm font-rajdhani text-white">
                  <span>{chip.icon}</span>
                  <span>{chip.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-8"
            >
              <p className="font-orbitron text-xs text-gray-500 tracking-[0.2em] mb-3 uppercase">Race Starts In</p>
              <CountdownTimer />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onBookClick}
                className="btn-race rounded-xl px-8 py-4 font-orbitron text-white font-black text-base tracking-wider uppercase animate-pulse-red"
              >
                🎟️ Students ₹99 · Public ₹249
              </button>
              <img src="/flag.png" alt="flag" className="w-20 h-20" />
              <a
                href="#highlights"
                className="btn-gold rounded-xl px-8 py-4 font-orbitron text-black font-black text-base tracking-wider uppercase"
              >
                Explore Event
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-6"
            >
              <div className="glass-card race-border rounded-lg px-4 py-2 glow-red inline-flex items-center gap-3">
                <div className="text-center">
                  <span className="font-rajdhani text-gray-400 text-xs block">Students</span>
                  <span className="font-orbitron text-xl font-black text-white">₹99</span>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="text-center">
                  <span className="font-rajdhani text-gray-400 text-xs block">General</span>
                  <span className="font-orbitron text-xl font-black text-white">₹249</span>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <span className="font-rajdhani text-gray-500 text-sm line-through">₹999</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: floating ticket cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ height: canvasH }}
            className="w-full flex justify-center items-center overflow-hidden rounded-2xl"
          >
            <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />

              <FloatingTicket
                title="STUDENT PASS"
                price="99"
                color="red"
                position={pos1}
                distanceFactor={df}
                cardWidth={cardWidth}
              />
              <FloatingTicket
                title="PUBLIC PASS"
                price="249"
                color="gold"
                position={pos2}
                distanceFactor={df}
                cardWidth={cardWidth}
              />
            </Canvas>
          </motion.div>

        </div>
      </div>
    </section>
  );
}