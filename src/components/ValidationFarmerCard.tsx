"use client";

import Image from "next/image";
import { useState } from "react";

const CROP_NOTES = [
  {
    crop: "Tomato",
    place: "Lipa, Batangas",
    note: "Peak harvest drops prices; loans and pickers are due immediately.",
  },
  {
    crop: "Palay & Coconut",
    place: "Batangas",
    note: "Coop lends inputs, yet each grower sells solo at harvest.",
  },
  {
    crop: "Eggplant",
    place: "Dolores, Quezon",
    note: "No shared truck schedule to group nearby harvests.",
  },
] as const;

export function ValidationFarmerCard() {
  const [idx, setIdx] = useState(0);
  const current = CROP_NOTES[idx];

  return (
    <div className="relative flex min-h-[196px] flex-col justify-between overflow-hidden rounded-none border border-white/10 bg-[#0b130e] p-4 text-card sm:aspect-[4/3]">
      <Image
        src="/stock/farm-landscape.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 300px, 45vw"
        className="object-cover object-center opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b130e]/92 via-[#102e1b]/84 to-[#0b130e]/92"
      />

      <div className="relative z-10 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 rounded-none border border-white/15 bg-white/5 px-2.5 py-0.5 text-[0.72rem] font-bold uppercase tracking-wider text-[#bef648]">
          <span className="h-1.5 w-1.5 rounded-none bg-[#bef648]" aria-hidden="true" />
          Farmer Field Notes
        </p>
        <span className="text-[0.72rem] tracking-wider text-[#D7DCD4]">NOV 2026</span>
      </div>

      <div className="relative z-10 my-2">
        <p className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-card">
          {current.place}
        </p>
        <p className="mt-1 text-[0.85rem] leading-snug text-[#D7DCD4]">
          {current.note}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-1.5" role="group" aria-label="Select interviewed crop">
        {CROP_NOTES.map((item, i) => {
          const active = i === idx;
          return (
            <button
              key={item.crop}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`min-h-8 rounded-none px-2.5 py-1 text-[0.75rem] font-bold transition-colors ${
                active
                  ? "bg-[#bef648] text-ink"
                  : "bg-white/10 text-card hover:bg-white/20"
              }`}
            >
              {item.crop}
            </button>
          );
        })}
      </div>
    </div>
  );
}
