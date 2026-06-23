import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="glass-card race-border rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center glow-red">
          <span className="font-orbitron text-2xl sm:text-3xl font-bold text-white">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        {/* Separator line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-red-800/40" />
      </motion.div>
      <span className="font-rajdhani text-xs text-gray-400 mt-2 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const eventDate = new Date("2026-06-28T13:00:00+05:30");
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-4 items-center justify-center">
      <TimeBlock value={timeLeft.days ?? 0} label="Days" />
      <span className="font-orbitron text-2xl text-red-500 mt-[-24px]">:</span>
      <TimeBlock value={timeLeft.hours ?? 0} label="Hours" />
      <span className="font-orbitron text-2xl text-red-500 mt-[-24px]">:</span>
      <TimeBlock value={timeLeft.minutes ?? 0} label="Mins" />
      <span className="font-orbitron text-2xl text-red-500 mt-[-24px]">:</span>
      <TimeBlock value={timeLeft.seconds ?? 0} label="Secs" />
    </div>
  );
}
