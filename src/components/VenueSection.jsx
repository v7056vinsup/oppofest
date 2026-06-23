import { motion } from "framer-motion";

export default function VenueSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-red-500 text-sm tracking-[0.3em] mb-3 uppercase"
          >
            Location
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-black text-white"
          >
            THE <span className="text-gradient-gold">CIRCUIT</span>
          </motion.h2>
          <div className="track-line w-40 mx-auto mt-5" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden race-border glow-red">
            <iframe
              title="Kari Motor Speedway"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.8240214385864!2d77.04967657480678!3d10.900975089255489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85033fb3ea7d5%3A0x32d9fc805a023de7!2sKari%20Motor%20Speedway%20Racetrack!5e0!3m2!1sen!2sin!4v1782198958875!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Details */}
          <div className="space-y-5">
            {[
              { icon: "📍", label: "Venue", value: "Kari Motor Speedway, Coimbatore" },
              { icon: "📅", label: "Date", value: "28th June 2026" },
              { icon: "⏰", label: "Timing", value: "1:00 PM – 6:00 PM" },
              { icon: "🎟️", label: "Entry", value: "₹299 (Exclusive Vinsup Price)" },
              { icon: "👥", label: "Group Deal", value: "Buy 10 tickets, get 1 FREE!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 glass-card race-border rounded-xl p-4 hover:border-red-500/50 transition-all"
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-orbitron text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                  <p className="font-rajdhani text-white text-lg font-semibold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
