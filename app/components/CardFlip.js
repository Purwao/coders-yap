"use client";

import { useState } from "react";
import Image from "next/image";

export default function CardFlip() {
const roles = [
  {
    id: 1,
    emoji: "🧠",
    name: "Purwa Arda",
    title: "The Brain",
    image: "/1735112173048.png",
    description: "Comes up with the rants and ideas you see here. Fueled by shower thoughts.",
  },
  {
    id: 2,
    emoji: "🛠️",
    name: "Purwa Arda",
    title: "Developer",
    image: "/1735112173048.png",
    description: "Writes the code, curses at the bugs, and occasionally fixes them.",
  },
  {
    id: 3,
    emoji: "🎨",
    name: "Purwa Arda",
    title: "Designer",
    image: "/1735112173048.png",
    description: "Probably made this UI at 3AM and still calls it “minimalist.”",
  },
  {
    id: 4,
    emoji: "✍️",
    name: "Purwa Arda",
    title: "Blogger",
    image: "/1735112173048.png",
    description: "Writes like no one's reading. Usually, no one is.",
  },
  {
    id: 5,
    emoji: "☕",
    name: "Purwa Arda",
    title: "Intern",
    image: "/1735112173048.png",
    description: "Makes coffee, cries, and refreshes deployment logs.",
  },
  {
    id: 6,
    emoji: "🧹",
    name: "Purwa Arda",
    title: "Janitor",
    image: "/1735112173048.png",
    description: "Deletes dead branches and wipes up spilled coffee from the server room.",
  },
];


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

  return (
<div
  onClick={() => setFlipped(!flipped)}
  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped(!flipped)}
  role="button"
  tabIndex={0}
  aria-label={`Flip card for ${role.title}`}
  className="cursor-pointer perspective w-full h-80 outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl"
>
  <div
    className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
      flipped ? "rotate-y-180" : ""
    }`}
  >
    {/* Front Side */}
    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl flex flex-col items-center justify-center border border-blue-500 shadow-lg">
      <span className="text-white text-4xl mb-2">🫥</span>
      <h2 className="text-white text-xl font-semibold">Click to Reveal</h2>
      <p className="text-sm text-blue-200 mt-1">Who’s behind the code?</p>
    </div>

    {/* Back Side */}
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#111827] rounded-2xl flex flex-col items-center justify-center text-white p-5 border border-gray-800 shadow-xl">
      <div className="text-3xl mb-2">{role.emoji}</div>
      <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md mb-3">
        <Image
          src={role.image}
          alt={`${role.title} avatar`}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <h3 className="text-xl font-bold text-white">{role.title}</h3>
      <p className="text-sm text-gray-400">{role.name}</p>
      <p className="text-xs text-gray-500 mt-2 text-center px-2">{role.description}</p>
    </div>
  </div>
</div>

  );
}
