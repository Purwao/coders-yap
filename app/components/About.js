"use client";

import Image from "next/image";
import AnimatedCard from "./AnimatedCard";
import imgplaceholder from "/public/assets/images/about/ehhe.jpg";

export default function AboutSection() {
  return (
 <AnimatedCard>
  <section className="mt-10 relative isolate overflow-hidden bg-[#030712] border border-gray-800 rounded-2xl px-6 py-12 sm:py-20 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
    <div className="max-w-xl text-white z-10">
      <h2 className="text-4xl font-extrabold mb-4">
        Hi there! I&apos;m Purwa.
      </h2>
         <div className="max-w-xl text-white font-mono text-md leading-relaxed">
            <p className="mb-4">
              Hi, I’m Purwa. A developer who does things like building, experimenting,
              and learning through code n stuff !
            </p>
            <p className="mb-4">
              CodersYap is where I share insights, document experiments, and
              reflect on the process. This also serves as my personal footnotes 
              a record of the growth, lessons learned, and projects along the way.
            </p>
          </div>      
      <a
        href="https://purwao.vercel.app" // <-- replace with your real URL
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#66b2ff] hover:bg-blue-500 text-[#030712] font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/40"
      >
        Visit My Other Site
      </a>
    </div>

    <div className="relative w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] z-10">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#66b2ff]/20 to-[#1e3a8a]/30 blur-2xl scale-110 z-0" />
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

    <div
      className="absolute bottom-0 left-0 w-full h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(31,41,55,0.5),transparent)] pointer-events-none"
      aria-hidden
    />
  </section>
</AnimatedCard>
  );
}