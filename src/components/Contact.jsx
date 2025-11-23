import React, { useState } from "react";
import { motion, time } from "framer-motion";
import { Mail, Send, Copy, Check } from "lucide-react";
import { title } from "framer-motion/client";
const now = new Date();

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // prevent spam bots (honeypot)
    const honeypot = e.target.querySelector("#honeypot")?.value;
    if (honeypot) {
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

      // If EmailJS env vars are set, use EmailJS clientless REST API (no server required)
      if (serviceId && templateId && publicKey) {
        const payload = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            name: formState.name,
            email: formState.email,
            message: formState.message,
            time: now.toLocaleString(),
            title: "New Contact Form Submission",
            reply_to: formState.email,
          },
        };

        // Debug: log env and payload so we can inspect in browser console
        console.log("EmailJS env:", { serviceId, templateId, publicKey });
        console.log("EmailJS payload:", payload);

        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          // capture response body for clearer error messages
          let bodyText = "";
          try {
            bodyText = await res.text();
          } catch (readErr) {
            console.error("Failed to read EmailJS response body", readErr);
          }
          console.error("EmailJS send failed:", res.status, bodyText);
          // show a user-friendly alert with server message when available
          alert(`EmailJS error: ${res.status} ${bodyText}`);
          throw new Error(`EmailJS send failed: ${res.status} ${bodyText}`);
        }

        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Send email error", err);
      alert("Could not send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("chetanshivade73@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-pink">03.</span> Get In Touch
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
            <div className="space-y-6">
              {/* EMAIL CARD */}
              <div
                className="
              relative flex flex-wrap items-center gap-4 p-5 rounded-2xl
              bg-white/5 backdrop-blur-xl border border-white/10
              transition-all duration-300
              hover:border-neon-pink/40 hover:shadow-[0_0_18px_rgba(255,0,128,0.18)]
            "
              >
                <div className="p-3 bg-neon-pink/20 rounded-full text-neon-pink shadow-[0_0_10px_rgba(255,0,128,0.3)]">
                  <Mail size={26} />
                </div>

                <div className="flex-1 min-w-[65%]">
                  <p className="text-sm text-gray-400">Email Me</p>
                  <p className="text-white font-mono text-lg break-all tracking-wide">
                    chetanshivade73@gmail.com
                  </p>
                </div>

                <button
                  onClick={copyEmail}
                  className="
                p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all
                border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.15)]
              "
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check size={22} className="text-green-400" />
                  ) : (
                    <Copy size={22} className="text-white" />
                  )}
                </button>

                {copied && (
                  <div
                    className="
                  absolute bottom-[-45px] left-1/2 -translate-x-1/2
                  bg-neon-pink/20 border border-neon-pink/40
                  backdrop-blur-xl text-neon-pink
                  px-4 py-1 rounded-full text-sm
                  shadow-[0_0_12px_rgba(255,0,128,0.5)]
                  animate-fadeUp
                "
                  >
                    Copied to clipboard!
                  </div>
                )}
              </div>

              {/* QUOTE CARD (now same glow style) */}
              <div
                className="
              p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10
              transition-all duration-300
              hover:border-neon-pink/40 hover:shadow-[0_0_18px_rgba(255,0,128,0.18)]
            "
              >
                <p className="text-gray-300 mb-4">
                  "The best way to predict the future is to create it."
                </p>
                <p className="text-neon-pink font-mono text-sm">
                  - Peter Drucker
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* INPUTS */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="
              w-full bg-glass-100 border border-glass-200 rounded-lg px-4 py-3 text-white
              focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink
              transition-all
            "
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="
              w-full bg-glass-100 border border-glass-200 rounded-lg px-4 py-3 text-white
              focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink
              transition-all
            "
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="
              w-full bg-glass-100 border border-glass-200 rounded-lg px-4 py-3 text-white resize-none
              focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink
              transition-all
            "
                placeholder="Your message here..."
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
            w-full bg-neon-pink text-black font-bold py-4 rounded-lg transition-all
            flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-[0_0_20px_rgba(255,0,128,0.3)]
          "
            >
              {isSubmitting ? (
                <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
              ) : isSuccess ? (
                <>
                  <Check size={20} /> Message Sent!
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
