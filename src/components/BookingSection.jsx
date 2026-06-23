import { motion } from "framer-motion";
import BookingForm from "./BookingForm";

export default function BookingSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="booking" className="py-20 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-red-500 text-sm tracking-[0.3em] mb-3 uppercase"
          >
            Exclusive Offer by Vinsup Skill Academy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-black text-white"
          >
            GET YOUR <span className="text-gradient-red">TICKET</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-gray-400 mt-3 text-lg"
          >
            ⚠️ Limited passes available — secure yours before they're gone!
          </motion.p>
          <div className="track-line w-40 mx-auto mt-5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: offer details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Price card */}
            <div className="glass-card race-border rounded-2xl p-6 glow-red">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-orbitron text-gray-400 text-xs tracking-widest mb-1">Exclusice Price by Vinsup Skill Academy</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-orbitron text-5xl font-black text-white">₹299</span>
                    <span className="font-rajdhani text-gray-400 line-through text-xl">₹999</span>
                  </div>
                  <p className="font-rajdhani text-green-400 font-bold">You save ₹600 per ticket!</p>
                </div>
                <div className="text-5xl animate-float">🏎️</div>
              </div>
              <div className="track-line" />
              <p className="font-rajdhani text-gray-300 text-sm mt-4">
                Regular price on BookMyShow is ₹999. This exclusive offer is only for Vinsup Gate Way Users —
                first come, first served!
              </p>
            </div>

            {/* Group offer */}
            <div className="glass-card border border-yellow-500/30 rounded-2xl p-5 glow-gold">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <h4 className="font-orbitron text-yellow-400 font-bold mb-1">GROUP OFFER</h4>
                  <p className="font-rajdhani text-gray-300">
                    Buy <strong className="text-white">10 tickets</strong> and get{" "}
                    <strong className="text-yellow-400">1 ticket FREE!</strong>
                  </p>
                  <p className="font-rajdhani text-gray-400 text-sm mt-1">
                    Applied automatically at checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="glass-card race-border rounded-2xl p-5">
              <h4 className="font-orbitron text-white font-bold mb-4 text-sm">WHAT'S INCLUDED</h4>
              <ul className="space-y-2">
                {[
                  "Full event access (1PM–6PM)",
                  "Supercar & Drift Show viewing",
                  "F2 Cars & Monster Truck display",
                  "Superbike showcases",
                  "Food stalls & merchandise",
                  "Non-stop entertainment",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-rajdhani text-gray-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment methods */}
            <div className="glass-card race-border rounded-2xl p-4">
              <p className="font-orbitron text-gray-400 text-xs tracking-widest mb-3">PAYMENT METHODS</p>
              <div className="flex flex-wrap gap-2">
                {["UPI", "Debit Card", "Credit Card", "Net Banking"].map((m) => (
                  <span
                    key={m}
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 font-rajdhani text-gray-300 text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="font-rajdhani text-gray-500 text-xs mt-3 flex items-center gap-1">
                🔒 Powered by Razorpay — 100% secure payments
              </p>
            </div>
          </motion.div>

          {/* Right: booking form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
