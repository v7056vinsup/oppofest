import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentFormModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        file: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please upload your college ID card");
      return;
    }

    try {
      setLoading(true);

      const base64 = await convertToBase64(form.file);

      const uploadResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbziTwLy-9xOsnD6YuD6SfJbf-wbFiAG6Ok_CnRQfjV9dCfIvVp7qmaozt500UL_pX4XTw/exec",
        {
          method: "POST",
          body: JSON.stringify({
            file: base64,
            fileName: form.file.name,
            mimeType: form.file.type,
          }),
        }
      );

      const uploadData = await uploadResponse.json();

      await fetch(
        "https://script.google.com/macros/s/AKfycbzZ_CZ0JbwdyYP6RnB9tE7yH3Y9Y2cZl42d4QSR9V5wFtPJX9nVtCQjzPMcHbQWqCtVRw/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            college: form.college,
            idCardUrl: uploadData.url,
          }),
        }
      );

      alert("Registration Submitted Successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        college: "",
        file: null,
      });

      // window.open("https://pay.jodo.in/pages/naWERNrmh8CuGrTe", "_blank");
      // console.log("Upload Response:", uploadData);
      setTimeout(() => {
      window.open(
        "https://pay.jodo.in/pages/naWERNrmh8CuGrTe",
        "_blank"
      );
    }, 500);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full max-w-lg bg-zinc-900 rounded-2xl border border-red-500/40 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-5">
              Student Pass Registration
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white"
              />

              <input
                type="text"
                name="college"
                placeholder="College Name"
                required
                value={form.college}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white"
              />

              <input
                type="file"
                accept="image/*,.pdf"
                required
                onChange={handleChange}
                className="w-full text-white"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg bg-zinc-700 text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}