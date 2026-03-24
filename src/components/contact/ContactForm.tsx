"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactForm() {
  return (
    <ScrollReveal>
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[600px] bg-brand-dark2 rounded-2xl p-10 border border-brand-gray/20">
          <h3 className="font-display text-2xl font-bold mb-2">
            Send a Quick <span className="text-brand-pink italic">Message</span>
          </h3>
          <p className="text-brand-muted text-[13px] font-light leading-relaxed mb-7">
            Have a question or idea? Drop it here and Stevie will get back to you.
          </p>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full bg-brand-dark border-[1.5px] border-brand-gray2 rounded-[10px] px-4 py-3.5 text-brand-white text-sm font-body outline-none caret-brand-pink transition-colors duration-300 focus:border-brand-pink placeholder:text-brand-gray2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full bg-brand-dark border-[1.5px] border-brand-gray2 rounded-[10px] px-4 py-3.5 text-brand-white text-sm font-body outline-none caret-brand-pink transition-colors duration-300 focus:border-brand-pink placeholder:text-brand-gray2"
              />
            </div>
            <select
              name="subject"
              className="w-full bg-brand-dark border-[1.5px] border-brand-gray2 rounded-[10px] px-4 py-3.5 text-brand-muted text-sm font-body outline-none appearance-none cursor-pointer transition-colors duration-300 focus:border-brand-pink bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M3%205l3%203%203-3%22%20stroke%3D%22%23777%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]"
            >
              <option value="">What&apos;s this about?</option>
              <option value="commission">I want to commission a piece</option>
              <option value="question">Question about an existing piece</option>
              <option value="shipping">Shipping question</option>
              <option value="collab">Collaboration / Business inquiry</option>
              <option value="other">Just saying hey</option>
            </select>
            <textarea
              name="message"
              placeholder="Tell Stevie what's on your mind..."
              rows={4}
              className="w-full bg-brand-dark border-[1.5px] border-brand-gray2 rounded-[10px] px-4 py-3.5 text-brand-white text-sm font-body outline-none caret-brand-pink resize-y leading-relaxed transition-colors duration-300 focus:border-brand-pink placeholder:text-brand-gray2"
            />
            <div className="flex justify-between items-center">
              <p className="text-[11px] text-brand-gray2">
                Or just DM @artattheafters — Stevie&apos;s faster there
              </p>
              <button
                type="submit"
                className="px-9 py-3.5 bg-brand-pink text-brand-white rounded-full text-sm font-semibold font-body tracking-wider cursor-pointer transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,51,153,0.2)]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </ScrollReveal>
  );
}
