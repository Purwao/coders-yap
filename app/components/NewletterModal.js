"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./NewsletterModal.module.css";
import confetti from "canvas-confetti";

export default function NewsletterModal() {
  const [step, setStep] = useState("mascot"); // mascot → prompt → form → exit
  const [exiting, setExiting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [delayedStart, setDelayedStart] = useState(false);

  // 🎬 Delay modal after 2 mins (120000ms)
  useEffect(() => {
    if (sessionStorage.getItem("newsletterPromptShown")) return;

    const delayTimer = setTimeout(() => {
      sessionStorage.setItem("newsletterPromptShown", "true");
      setDelayedStart(true);
    }, 120000); // show after 2 minutes

    return () => clearTimeout(delayTimer);
  }, []);

  // Automatically switch from mascot to prompt
  useEffect(() => {
    if (!delayedStart) return;
    const mascotTimer = setTimeout(() => setStep("prompt"), 1800);
    return () => clearTimeout(mascotTimer);
  }, [delayedStart]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => setStep("exit"), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://formspree.io/f/manjgnbp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
          setSubscribed(true);
          setTimeout(() => setStep("exit"), 3000);
        } else {
          const data = await res.json();
          alert(data?.errors?.[0]?.message || "Submission failed.");
        }
      })
      .catch((err) => {
        console.error("Formspree error:", err);
        alert("There was an error submitting the form.");
      });
  };

  if (!delayedStart || step === "exit") return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {(step === "mascot" || step === "prompt") && (
        <div
          className={`absolute bottom-8 left-8 flex items-center gap-4 pointer-events-auto ${
            exiting ? styles.fadeOut : ""
          }`}
        >
          {/* Mascot with background */}
          <div className="bg-blue-400 rounded-full p-2 shadow-lg">
            <div className={`${styles.mascot} w-24 h-24 sm:w-32 sm:h-32`}>
              <Image
                src="/assets/images/newsletter/mascot101.webp"
                alt="Mascot"
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Prompt Modal */}
          {step === "prompt" && (
            <div
              className={`${styles.fadeIn} bg-[#030712] text-white border border-blue-400 shadow-xl rounded-lg p-5 w-72 sm:w-96 font-mono`}
            >
              <p className="text-base sm:text-lg font-semibold mb-4 leading-relaxed">
                👋 Hey! Sorry to barge in... but wanna join my chaotic newsletter?
                <br />
                It&apos;s 100% free and 200% weird — like a code diary with caffeine.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="text-gray-400 hover:text-white transition"
                  onClick={handleClose}
                >
                  No thanks
                </button>
                <button
                  className="bg-blue-400 text-[#030712] px-4 py-2 rounded font-bold hover:bg-blue-500 transition"
                  onClick={() => setStep("form")}
                >
                  Sure
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Newsletter Form */}
      {step === "form" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div
            className={`${styles.newspaperAnim} bg-[#f4f4f4] text-black shadow-2xl border-4 border-gray-800 rounded-md w-80 sm:w-[32rem] px-6 py-8 font-mono`}
          >
            <h2 className="text-3xl font-black mb-4 text-center tracking-wide border-b border-black pb-2">
              🗞️ CodersYap Times
            </h2>
            <p className="text-sm sm:text-base mb-4 leading-relaxed text-gray-800">
              Join the only newsletter that rants louder than your linters. Code
              chaos, dev humor, experiments, and caffeine — straight to your inbox.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-400 rounded bg-white text-black"
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-400 rounded bg-white text-black"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-600 hover:text-black transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 font-bold rounded hover:bg-gray-800 transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {subscribed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="bg-white text-black font-mono border-4 border-gray-800 p-6 rounded-md shadow-2xl w-80 sm:w-[28rem] text-center animate-pulse">
            <h2 className="text-2xl font-black mb-2">🎉 Thanks, {name}!</h2>
            <p className="text-gray-700">
              You&apos;re officially part of the CodersYap inner circle. Expect
              chaos. Expect code. Expect caffeine.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
