// import { motion } from "framer-motion";
// import CountdownTimer from "./CountdownTimer";
// import heroImg from "../assets/hero.png";

// export default function HeroSection({ onBookClick }) {
//   return (
//     <section className="relative min-h-screen flex flex-col overflow-hidden">
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${heroImg})` }}
//       />
//       {/* Dark overlay */}
//       <div className="absolute inset-0 hero-overlay" />
//       {/* Red vignette sides */}
//       <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-red-950/30 to-transparent pointer-events-none" />
//       <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-red-950/30 to-transparent pointer-events-none" />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-10 lg:px-20 pt-20 pb-10">
//         <div className="max-w-xl">
//           {/* Brand */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="flex items-center gap-3 mb-4"
//           >
//             <div className="checker-bg w-8 h-8 rounded-sm" />
//             <span className="font-orbitron text-sm tracking-[0.25em] text-red-400 uppercase">
//               TCM Tribe Presents
//             </span>
//           </motion.div>

//           {/* Main title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35, duration: 0.7 }}
//             className="font-orbitron leading-none mb-2"
//           >
//             <span className="block text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
//               OPPO
//             </span>
//             <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-gradient-red drop-shadow-2xl">
//               SPEED
//             </span>
//             <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-2xl">
//               FEST
//             </span>
//           </motion.h1>

//           {/* Tagline */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//             className="font-rajdhani text-lg text-gray-300 tracking-widest mb-6"
//           >
//             SPEED. POWER. PASSION. — ALL ON TRACK!
//           </motion.p>

//           {/* Event details chips */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.85 }}
//             className="flex flex-wrap gap-3 mb-8"
//           >
//             {[
//               { icon: "📅", text: "28th June 2026" },
//               { icon: "⏰", text: "1PM – 6PM" },
//               { icon: "📍", text: "Kari Motor Speedway, CBE" },
//             ].map((chip, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-2 glass-card race-border rounded-full px-4 py-2 text-sm font-rajdhani text-white"
//               >
//                 <span>{chip.icon}</span>
//                 <span>{chip.text}</span>
//               </div>
//             ))}
//           </motion.div>

//           {/* Countdown */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.0 }}
//             className="mb-8"
//           >
//             <p className="font-orbitron text-xs text-gray-500 tracking-[0.2em] mb-3 uppercase">
//               Race Starts In
//             </p>
//             <CountdownTimer />
//           </motion.div>

//           {/* CTA buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.15 }}
//             className="flex flex-wrap gap-4"
//           >
//             <button
//               onClick={onBookClick}
//               className="btn-race rounded-xl px-8 py-4 font-orbitron text-white font-black text-base tracking-wider uppercase animate-pulse-red"
//             >
//               🎟️ Book ₹299 Ticket
//             </button>
//             <a
//               href="#highlights"
//               className="btn-gold rounded-xl px-8 py-4 font-orbitron text-black font-black text-base tracking-wider uppercase"
//             >
//               EXPLORE EVENT
//             </a>
//           </motion.div>

//           {/* Price badge */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3 }}
//             className="mt-6 flex items-center gap-3"
//           >
//             <div className="glass-card race-border rounded-lg px-4 py-2 glow-red">
//               <span className="font-rajdhani text-gray-400 text-sm line-through mr-2">₹999</span>
//               <span className="font-orbitron text-2xl font-black text-white">₹299</span>
//             </div>
//             <div className="bg-green-600/20 border border-green-600/40 rounded-lg px-3 py-2">
//               <span className="font-rajdhani text-green-400 text-sm font-bold">Save ₹600 per ticket</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

import CountdownTimer from "./CountdownTimer";
import heroImg from "../assets/hero.png";

function FloatingTicket() {
  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
      floatingRange={[-0.4, 0.4]}
    >
      <Html
          transform
          distanceFactor={1.5}
          scale={1.8}
        >
        <div className="w-[500px] h-[700px] rounded-3xl overflow-hidden backdrop-blur-xl bg-black/70 border border-red-500/40 shadow-[0_0_80px_rgba(239,68,68,0.45)]">
          {/* Header */}
          <div className="h-28 bg-gradient-to-r from-red-700 via-red-500 to-orange-500 flex items-center justify-center">
            {/* <h2 className="text-white font-black text-3xl tracking-wider">
              Vinsup PASS
            </h2> */}
            <img src="image.png" alt="Vinsup PASS" className="w-64 h-auto object-contain" />
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col h-[calc(100%-112px)] justify-between">
            <div>
              <p className="text-red-400 text-sm uppercase tracking-widest">
                OPPO SPEED FEST
              </p>

              <h3 className="text-white text-4xl font-black mt-3">
                VINSUP SPECIAL ENTRY
              </h3>

              <div className="mt-6 space-y-3 text-gray-300">
                <p>📅 28 June 2026</p>
                <p>⏰ 1PM - 6PM</p>
                <p>📍 Kari Motor Speedway</p>
              </div>
            </div>

            <div>
              <div className="border-t border-red-500/30 pt-4">
                <p className="text-gray-400 text-sm">Ticket Price</p>
                <p className="text-white text-4xl font-black">₹299</p>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </Float>
  );
}

export default function HeroSection({ onBookClick }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Red Glow Sides */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-950/30 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 sm:px-10 lg:px-20 pt-20 pb-10 flex items-center">
        {/* <div className="grid lg:grid-cols-2 gap-12 w-full items-center"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            {/* Brand */}
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

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-orbitron leading-none mb-2"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
                OPPO
              </span>

              <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-gradient-red drop-shadow-2xl">
                SPEED
              </span>

              <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-2xl">
                FEST
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-rajdhani text-lg text-gray-300 tracking-widest mb-6"
            >
              SPEED. POWER. PASSION. — ALL ON TRACK!
            </motion.p>

            {/* Event Chips */}
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
                <div
                  key={i}
                  className="flex items-center gap-2 glass-card race-border rounded-full px-4 py-2 text-sm font-rajdhani text-white"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-8"
            >
              <p className="font-orbitron text-xs text-gray-500 tracking-[0.2em] mb-3 uppercase">
                Race Starts In
              </p>

              <CountdownTimer />
            </motion.div>

            {/* Buttons */}
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
                🎟️ Book ₹299 Ticket
              </button>

              <a
                href="#highlights"
                className="btn-gold rounded-xl px-8 py-4 font-orbitron text-black font-black text-base tracking-wider uppercase"
              >
                Explore Event
              </a>
            </motion.div>

            {/* Price Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-6 flex items-center gap-3"
            >
              <div className="glass-card race-border rounded-lg px-4 py-2 glow-red">
                <span className="font-rajdhani text-gray-400 text-sm line-through mr-2">
                  ₹999
                </span>

                <span className="font-orbitron text-2xl font-black text-white">
                  ₹299
                </span>
              </div>

              <div className="bg-green-600/20 border border-green-600/40 rounded-lg px-3 py-2">
                <span className="font-rajdhani text-green-400 text-sm font-bold">
                  Save ₹600 per ticket
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE 3D TICKET */}
          {/* <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:block h-[700px]"
          > */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-[350px] sm:h-[450px] lg:h-[850px] flex justify-center items-center"
            >
            <Canvas
              camera={{
                position: [0, 0, 8],
                fov: 45,
              }}
            >
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />

              <FloatingTicket />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}