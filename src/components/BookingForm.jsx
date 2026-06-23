import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const TICKET_PRICE = 299;
const ORIGINAL_PRICE = 999;
const GROUP_THRESHOLD = 10; // buy 10 get 1 free

// ── EmailJS config ──────────────────────────────────────────────────────────
// Replace these with your actual EmailJS credentials.
// Get them free at https://www.emailjs.com/
const EMAILJS_SERVICE_ID  = "service_speedfest";   // ← your service ID
const EMAILJS_TEMPLATE_ID = "template_speedfest";  // ← your template ID
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";     // ← your public key

// ── Razorpay key ─────────────────────────────────────────────────────────────
// Replace with your Razorpay test / live key_id
const RAZORPAY_KEY = "rzp_test_YourKeyHere";

// ── Ticket ID counter (in-memory; persisted to localStorage) ─────────────────
function getNextTicketId() {
  const stored = parseInt(localStorage.getItem("sf_ticket_counter") || "0", 10);
  const next = stored + 1;
  localStorage.setItem("sf_ticket_counter", String(next));
  return next;
}

function formatTicketId(n) {
  return `SPF-2026-${String(n).padStart(5, "0")}`;
}

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", count: 1 });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // { ticketId, count, total }
  const formRef = useRef(null);

  // ── Derived values ────────────────────────────────────────────────────────
  const count = parseInt(form.count, 10) || 1;
  const freeTickets = Math.floor(count / (GROUP_THRESHOLD + 1)); // buy 10 get 1 free
  const chargeableTickets = count - freeTickets;
  const total = chargeableTickets * TICKET_PRICE;
  const savings = count * ORIGINAL_PRICE - total;

  // ── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Valid 10-digit Indian mobile required";
    if (count < 1 || count > 100) e.count = "Enter between 1 and 100 tickets";
    return e;
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  }

  // ── Initiate Razorpay payment ─────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    const amountPaise = total * 100; // Razorpay uses paise

    const options = {
      key: RAZORPAY_KEY,
      amount: amountPaise,
      currency: "INR",
      name: "OPPO Speed Fest 2026",
      description: `${count} ticket${count > 1 ? "s" : ""} – Kari Motor Speedway`,
      image: "/favicon.svg",
      prefill: {
        name: form.name,
        email: form.email,
        contact: `+91${form.phone}`,
      },
      theme: { color: "#e01b1b" },
      handler: function (response) {
        onPaymentSuccess(response);
      },
      modal: {
        ondismiss: () => toast.error("Payment cancelled."),
      },
    };

    // Razorpay is loaded via <script> in index.html
    if (typeof window.Razorpay === "undefined") {
      toast.error("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // ── After payment success ─────────────────────────────────────────────────
  async function onPaymentSuccess(response) {
    setLoading(true);
    const ticketNum = getNextTicketId();
    const ticketId = formatTicketId(ticketNum);

    try {
      // Send ticket email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: form.name,
          to_email: form.email,
          ticket_id: ticketId,
          ticket_count: count,
          free_tickets: freeTickets,
          total_amount: `₹${total.toLocaleString("en-IN")}`,
          payment_id: response.razorpay_payment_id || "N/A",
          event_date: "28th June 2026",
          event_time: "1:00 PM – 6:00 PM",
          venue: "Kari Motor Speedway, Coimbatore",
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("🎟️ Ticket sent to your email!", { duration: 5000 });
    } catch (err) {
      console.warn("Email send failed:", err);
      toast("Booking confirmed! Email delivery may be delayed.", { icon: "⚠️" });
    }

    setSuccess({
      ticketId,
      count,
      freeTickets,
      total,
      paymentId: response.razorpay_payment_id || "N/A",
    });
    setLoading(false);
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card race-border rounded-2xl p-8 text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-7xl mb-4"
        >
          🏁
        </motion.div>
        <h3 className="font-orbitron text-2xl font-black text-white mb-2">
          YOU'RE IN THE RACE!
        </h3>
        <p className="text-gray-400 font-rajdhani mb-6">
          Booking confirmed. Check your email for your ticket.
        </p>

        <div className="checker-bg rounded-xl p-5 mb-6 border border-red-600/30">
          <div className="bg-black/70 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-rajdhani">Ticket ID</span>
              <span className="font-orbitron text-yellow-400 font-bold text-sm">{success.ticketId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-rajdhani">Tickets</span>
              <span className="text-white font-bold">{success.count}</span>
            </div>
            {success.freeTickets > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-rajdhani">Free Bonus 🎉</span>
                <span className="text-green-400 font-bold">+{success.freeTickets}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-rajdhani">Amount Paid</span>
              <span className="text-white font-bold">₹{success.total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-rajdhani">Payment ID</span>
              <span className="text-gray-300 font-mono text-xs">{success.paymentId}</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <p className="text-red-400 font-rajdhani text-sm">📅 28th June 2026 • 1PM–6PM</p>
              <p className="text-red-400 font-rajdhani text-sm">📍 Kari Motor Speedway, Coimbatore</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setSuccess(null); setForm({ name:"", email:"", phone:"", count:1 }); }}
          className="btn-race rounded-lg px-6 py-3 font-orbitron text-white font-bold text-sm w-full"
        >
          BOOK MORE TICKETS
        </button>
      </motion.div>
    );
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card race-border rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-auto"
    >
      <h3 className="font-orbitron text-xl font-black text-white mb-1 text-center">
        BOOK YOUR <span className="text-gradient-red">PASS</span>
      </h3>
      <p className="font-rajdhani text-gray-400 text-sm text-center mb-6">
        Exclusive  pricing — limited slots only
      </p>

      {/* Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-rajdhani text-sm text-gray-300 mb-1 block">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="input-race w-full rounded-lg px-4 py-3"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="font-rajdhani text-sm text-gray-300 mb-1 block">Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ticket@youremail.com"
            className="input-race w-full rounded-lg px-4 py-3"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="font-rajdhani text-sm text-gray-300 mb-1 block">Phone Number</label>
          <div className="flex">
            <span className="input-race rounded-l-lg px-3 py-3 text-gray-400 border-r-0 font-rajdhani text-sm flex items-center">
              +91
            </span>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              maxLength={10}
              className="input-race flex-1 rounded-r-lg px-4 py-3 border-l-0"
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Ticket count */}
        <div>
          <label className="font-rajdhani text-sm text-gray-300 mb-1 block">
            Number of Tickets
            {count >= GROUP_THRESHOLD + 1 && (
              <span className="ml-2 text-green-400 font-bold text-xs">
                🎉 Group deal applied!
              </span>
            )}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, count: Math.max(1, count - 1) }))}
              className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 text-white font-bold text-lg hover:bg-red-600/40 transition-all"
            >
              −
            </button>
            <input
              name="count"
              type="number"
              min={1}
              max={100}
              value={form.count}
              onChange={handleChange}
              className="input-race flex-1 rounded-lg px-4 py-3 text-center font-orbitron text-lg"
            />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, count: Math.min(100, count + 1) }))}
              className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 text-white font-bold text-lg hover:bg-red-600/40 transition-all"
            >
              +
            </button>
          </div>
          {errors.count && <p className="text-red-400 text-xs mt-1">{errors.count}</p>}
        </div>
      </div>

      {/* Price summary */}
      <div className="mt-6 glass-card rounded-xl p-4 space-y-2 border border-yellow-500/20">
        <div className="flex justify-between font-rajdhani text-gray-400 text-sm">
          <span>Price per ticket</span>
          <span>
            <s className="text-gray-600 mr-1">₹{ORIGINAL_PRICE}</s>
            <span className="text-green-400 font-bold">₹{TICKET_PRICE}</span>
          </span>
        </div>
        <div className="flex justify-between font-rajdhani text-gray-400 text-sm">
          <span>Tickets</span>
          <span className="text-white">{count}</span>
        </div>
        {freeTickets > 0 && (
          <div className="flex justify-between font-rajdhani text-green-400 text-sm">
            <span>Free bonus tickets 🎉</span>
            <span>+{freeTickets} FREE</span>
          </div>
        )}
        <div className="flex justify-between font-rajdhani text-green-400 text-sm">
          <span>You save</span>
          <span className="font-bold">₹{savings.toLocaleString("en-IN")}</span>
        </div>
        <div className="pt-2 border-t border-gray-700 flex justify-between font-orbitron text-white font-bold">
          <span>Total</span>
          <span className="text-yellow-400 text-xl">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Group offer note */}
      {count < GROUP_THRESHOLD + 1 && (
        <p className="text-center text-gray-500 text-xs font-rajdhani mt-3">
          💡 Buy {GROUP_THRESHOLD + 1}+ tickets — get 1 ticket FREE every 10!
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-race w-full mt-5 py-4 rounded-xl font-orbitron font-black text-white text-base tracking-widest uppercase animate-pulse-red disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing…
          </span>
        ) : (
          <>🏁 PAY ₹{total.toLocaleString("en-IN")} & BOOK NOW</>
        )}
      </button>

      <p className="text-center text-gray-500 text-xs font-rajdhani mt-3">
        🔒 Secured by Razorpay — UPI, Cards, Net Banking & more
      </p>
    </motion.form>
  );
}
