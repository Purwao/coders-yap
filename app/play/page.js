"use client";

import React, { useRef, useState, useEffect } from "react";
import CommentSection from "../components/CommentSection";

export default function ScrollFadeInPage() {
  const ScrollFadeInSection = ({ children }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Set isVisible to true when entering, false when leaving
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 1.0 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-36"
        }`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 space-y-32">
      {/* Top intro section */}
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        👋 Scroll down to see animations!
      </div>

      {/* Animated sections */}
      {Array.from({ length: 5 }).map((_, i) => (
        <ScrollFadeInSection key={i}>
          <div className="bg-gray-800 p-10 rounded-2xl text-center text-xl shadow-xl">
            ✨ Section {i + 1}: This block fades and slides in!
          </div>
        </ScrollFadeInSection>
      ))}

      {/* Footer section */}
      <div className="h-screen flex items-center justify-center text-xl">
        🧼 You reached the bottom!
      </div>

      <CommentSection />
    </div>
  );
}
