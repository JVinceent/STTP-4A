"use client";

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
    <div className="flex min-h-[196px] flex-col justify-between rounded-[18px] bg-[#163a22] p-4 text-card sm:aspect-[4/3]">
      <div className="flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[0.75rem] font-semibold text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          Farmer Field Notes
        </p>
        <span className="text-[0.75rem] font-semibold text-[#D7DCD4]">Nov 2026</span>
      </div>

      <div className="my-2">
        <p className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-card">
          {current.place}
        </p>
        <p className="mt-1 text-[0.84rem] leading-snug text-[#D7DCD4]">
          {current.note}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select interviewed crop">
        {CROP_NOTES.map((item, i) => {
          const active = i === idx;
          return (
            <button
              key={item.crop}
              type="button"
              aria-pressed={active}
              onClick={() => setIdx(i)}
              className={`min-h-8 rounded-lg px-2.5 py-1 text-[0.75rem] font-bold transition-colors ${
                active
                  ? "bg-accent text-ink"
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
