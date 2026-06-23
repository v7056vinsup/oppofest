const items = [
  "🏁 OPPO SPEED FEST 2026",
  "📅 28th June 2026",
  "📍 Kari Motor Speedway, Coimbatore",
  "⏰ 1 PM – 6 PM",
  "🎓 College Students ₹99  |  👤 General Public ₹249",
  "🚗 Supercars  •  Drift Shows  •  F2 Cars",
  "🏍️ Superbikes  •  Monster Trucks",
  "🍔 Food Stalls & Merch",
  "⚡ LIMITED TICKETS — BOOK NOW!",
];

export default function TickerBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-red-600/10 border-y border-red-600/30 py-3">
      <div
        className="flex whitespace-nowrap animate-ticker"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-orbitron text-sm text-white/90 px-8 tracking-wider">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
