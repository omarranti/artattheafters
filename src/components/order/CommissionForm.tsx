"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FormData {
  name: string;
  email: string;
  description: string;
}

const inputClasses =
  "w-full bg-brand-dark border border-brand-gray/20 rounded-xl px-4 py-3.5 text-brand-white font-body placeholder:text-white/30 focus:border-brand-pink/40 focus:outline-none transition-colors duration-200";

const labelClasses =
  "block font-body text-white/70 text-sm uppercase tracking-wider mb-2";

export default function CommissionForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("description", form.description);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      setSuccess(true);
      setForm({ name: "", email: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="commission-form" className="py-16 md:py-24">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-5xl text-brand-white text-center mb-4">
          Let&apos;s Create Something Together
        </h2>
        <p className="font-body text-white/50 text-center max-w-lg mx-auto mb-4">
          Tell me what you want — I&apos;ll follow up within 24 hours with size options, pricing, and next steps.
        </p>
        <p className="font-body text-white/30 text-center text-sm max-w-md mx-auto mb-12">
          Custom pieces start at $50. See sizes above for full pricing.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-brand-dark2 border border-brand-gray/20 rounded-xl p-6 md:p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Success toast */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl p-4 text-brand-green font-body text-center bg-brand-green/10 border border-brand-green/20"
              >
                Got it! Stevie will reach out within 24 hours to talk details, sizing, and pricing.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error toast */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl p-4 text-red-400 font-body text-center bg-red-500/10 border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name <span className="text-brand-pink">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-brand-pink">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="you@email.com"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              What do you want painted?{" "}
              <span className="text-brand-pink">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              className={`${inputClasses} min-h-[100px] resize-none`}
              placeholder="A bull eating adderall, SpongeBob doing a kickflip, your cat as a samurai... anything goes"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full bg-brand-pink text-brand-white rounded-full px-8 py-4 text-base font-body font-bold uppercase tracking-wider hover:brightness-110 hover:opacity-90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "SENDING..." : "LET'S CREATE SOMETHING"}
          </motion.button>

          {/* Alternate payment info */}
          <div className="text-center space-y-2 pt-2">
            <p className="font-body text-white/40 text-sm">
              Prefer to keep it simple? DM on{" "}
              <a href="https://www.instagram.com/artattheafters/" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline">Instagram</a>
              {" "}or Venmo{" "}
              <span className="text-brand-green">@steviealger</span> with your
              idea.
            </p>
          </div>
        </motion.form>
      </ScrollReveal>
    </section>
  );
}
