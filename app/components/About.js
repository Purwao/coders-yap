"use client";

import Image from "next/image";
import AnimatedCard from "./AnimatedCard";
import imgplaceholder from "/public/assets/images/about/ehhe.jpg";

export default function AboutSection() {
  return (
    <AnimatedCard>
      <section
        className="mt-10 relative isolate overflow-hidden 
                   bg-[#030712] border border-gray-800 rounded-2xl 
                   px-6 py-12 sm:py-20 sm:px-12 lg:px-20 
                   flex flex-col lg:flex-row items-center gap-12"
      >
        {/* Text Section */}
        <div className="max-w-xl text-white z-10">
          <h2 className="text-5xl font-semibold text-white leading-snug">
  Hi, I’m Purwa.
</h2>
<p className="  text-gray-300">
 I am a developer and university student focused on building, experimenting, and expanding my coding expertise.
  I created CodersYap to share insights, document experiments, and reflect on my development as a coder. The platform records my growth, lessons learned, and completed projects.</p>
<p className="mb-4 text-gray-300">
 </p>
<a
  href="https://purwao.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-[#66b2ff] hover:bg-blue-500 text-[#030712] 
             font-semibold px-6 py-3 rounded-full transition-transform 
             duration-300 shadow-md hover:scale-105 hover:shadow-blue-500/40"
>
  Explore More Work →
</a>
        </div>

        {/* Image Section */}
        <div className="relative w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] z-10">
          <div
            className="absolute inset-0 rounded-full 
                       bg-gradient-to-tr from-[#66b2ff]/20 to-[#1e3a8a]/30 
                       blur-2xl scale-110 z-0"
          />
          <div className="relative w-full h-full z-10">
            <Image
              src={imgplaceholder}
              alt="Purwa speaking"
              fill
              className="object-contain drop-shadow-2xl rounded-2xl"
              priority
              sizes="(max-width: 768px) 300px, 360px"
            />
          </div>
        </div>

        {/* Decorative Gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-b to-gray-700 opacity-40 pointer-events-none"
          aria-hidden
        />
      </section>
    </AnimatedCard>
  );
}