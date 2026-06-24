import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TickerBanner from "./components/TickerBanner";
import EventHighlights from "./components/EventHighlights";
import VenueSection from "./components/VenueSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import SpeedLines from "./components/SpeedLines";

export default function App() {
  const bookingRef = useRef(null);
  const [showPassModal, setShowPassModal] = useState(false);
const [showStudentForm, setShowStudentForm] = useState(false);

  function scrollToBooking() {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Ambient speed lines */}
      <SpeedLines />

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(224,27,27,0.4)",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "15px",
          },
        }}
      />

      {/* Navigation */}
      <Navbar onBookClick={scrollToBooking} showPassModal={showPassModal} setShowPassModal={setShowPassModal} showStudentForm={showStudentForm} setShowStudentForm={setShowStudentForm} />

      {/* Hero */}
      <HeroSection onBookClick={scrollToBooking} showPassModal={showPassModal} setShowPassModal={setShowPassModal} showStudentForm={showStudentForm} setShowStudentForm={setShowStudentForm} />

      {/* Ticker */}
      <TickerBanner />

      {/* Event highlights */}
      <div id="highlights">
        <EventHighlights />
      </div>

      {/* Venue */}
      <div id="venue">
        <VenueSection />
      </div>

      {/* Booking */}
      <BookingSection sectionRef={bookingRef} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
