"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function LenisProvider({ children }) {
  useEffect(() => {
  const lenis = new Lenis({
  duration: 1.2,       // animation duration (seconds)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
  direction: 'vertical', // vertical or horizontal
  gestureDirection: 'vertical', // for touch devices
  smooth: true,        // enable smooth scroll
  smoothTouch: false,  // disable smooth scroll on touch devices
  touchMultiplier: 2,  // touch scroll momentum multiplier
});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}