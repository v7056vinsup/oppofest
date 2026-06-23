import { motion } from "framer-motion";

const highlights = [
  { icon: "🚗", title: "Supercars", desc: "Modern beasts. Unleash the power." },
  { icon: "🏎️", title: "Drift Shows", desc: "Smoke. Skid. Style. Feel the thrill." },
  { icon: "🏍️", title: "Superbikes", desc: "Ride. Race. Reign. Adrenaline on two wheels." },
  { icon: "🚜", title: "Monster Trucks", desc: "Big tires. Bigger thrills. Maximum power." },
  { icon: "🏁", title: "F2 Cars", desc: "Pure speed. Next level racing." },
  { icon: "🍔", title: "Food & Merch", desc: "Stalls, gear, and vibes all day long." },
  { icon: "🏛️", title: "Vintage Cars", desc: "Timeless beauty. Legendary heritage." },
  { icon: "🤝", title: "Car Community", desc: "Connect. Share. Belong. One tribe." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function EventHighlights() {
  return (
    <section className="py-20 px-4 relative">
      {/* Section header */}
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-orbitron text-red-500 text-sm tracking-[0.3em] mb-3 uppercase"
        >
          What Awaits You
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-orbitron text-4xl md:text-5xl font-black text-white"
        >
          RACE DAY{" "}
          <span className="text-gradient-red">LINEUP</span>
        </motion.h2>
        <div className="track-line w-40 mx-auto mt-5" />
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.04, y: -4 }}
            className="glass-card race-border rounded-xl p-5 text-center cursor-default group transition-all duration-300 hover:border-red-500/60 hover:glow-red"
          >
            <div className="text-4xl mb-3 group-hover:animate-bounce">{h.icon}</div>
            <h3 className="font-orbitron text-sm font-bold text-white mb-2 group-hover:text-gradient-red">
              {h.title}
            </h3>
            <p className="font-rajdhani text-gray-400 text-sm leading-snug">{h.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
