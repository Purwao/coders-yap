"use client";

import { useState } from "react";
import Image from "next/image";
import { roles } from "../constant";

export default function CardFlip() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-16 px-6 bg-[#030712]">
      {roles.map((role) => (
        <FlipCard key={role.id} role={role} />
      ))}
    </section>
  );
}

function FlipCard({ role }) {
  const [flipped, setFlipped] = useState(false);
  const isRed = role.suit === "♥" || role.suit === "♦";

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective w-full h-80 rounded-xl"
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-b from-[#030712] to-[#0f172a] rounded-xl flex flex-col items-center justify-between border border-blue-400/20 shadow-lg overflow-hidden py-6 px-4">
          {/* Poker Corners */}
          <div
            className={`absolute top-2 left-2 font-bold text-3xl flex flex-col items-center ${
              isRed ? "text-red-400" : "text-white"
            }`}
          >
            <div className="text-lg vertical-text">{role.hand}</div>
            <div>{role.suit}</div>
          </div>
          <div
            className={`absolute bottom-2 right-2 font-bold text-3xl flex flex-col items-center transform rotate-180 ${
              isRed ? "text-red-400" : "text-white"
            }`}
          >
            <div className="text-lg vertical-text">{role.hand}</div>
            <div>{role.suit}</div>
          </div>

          {/* Center Content */}
          <div className="flex flex-col h-full items-center justify-center text-center z-10">
            <p className="text-blue-500/80 text-[11px] font-mono tracking-wide z-10 transform rotate-180">
              Tap to declassify identity
            </p>
            <div className="flex flex-col w-full h-full items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-800/30 border border-blue-400/30 shadow-inner flex items-center justify-center mb-3">
                <span className="text-white text-2xl">{role.emoji}</span>
              </div>
              <p className="text-blue-400 text-xs uppercase tracking-widest font-mono mt-1">
                codename
              </p>
              <p className="text-sky-300 text-base italic tracking-tight font-mono">
                &quot;{role.codename}&quot;
              </p>
              <div className="w-10 h-0.5 bg-blue-600/40 my-2" />
            </div>
            <p className="text-blue-500/80 text-[11px] font-mono tracking-wide z-10">
              Tap to declassify identity
            </p>
          </div>
        </div>

         {/* REDESIGNED BACK SIDE */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-b from-[#030712] to-[#0f172a] rounded-xl flex flex-col items-center justify-between border border-blue-400/20 shadow-lg overflow-hidden py-6 px-4">
          {/* Poker Corners (consistent with front) */}
          <div
            className={`absolute top-2 left-2 font-bold text-3xl flex flex-col items-center ${
              isRed ? "text-red-400" : "text-white"
            }`}
          >
            <div className="text-lg vertical-text">{role.hand}</div>
            <div>{role.suit}</div>
          </div>
          <div
            className={`absolute bottom-2 right-2 font-bold text-3xl flex flex-col items-center transform rotate-180 ${
              isRed ? "text-red-400" : "text-white"
            }`}
          >
            <div className="text-lg vertical-text">{role.hand}</div>
            <div>{role.suit}</div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col h-full items-center justify-center text-center z-10 w-full">
            <p className="text-blue-500/80 text-[11px] font-mono tracking-wide mb-1">
              TOP SECRET // NOFORN
            </p>

            <div className="relative w-20 h-20 rounded-full bg-blue-900/30 border-2 border-blue-400/30 mb-4 overflow-hidden">
              <Image
                src={role.image}
                alt={role.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-sky-200 tracking-tight">
                {role.name}
              </h3>
              <p className="text-blue-400 text-sm font-mono">{role.title}</p>
              <div className="w-12 h-px bg-blue-600/40 my-2 mx-auto" />
              <p className="text-xs text-gray-300 px-4 leading-relaxed">
                {role.description}
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}