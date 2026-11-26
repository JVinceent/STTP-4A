"use client";

import Image from "next/image";
import { useState } from "react";
import { IconCheck, serviceIcon } from "./Icons";

const MISSION_MODES = {
  without: {
    badge: "Solo farmgate sale",
    rows: [
      { label: "Farmgate price", value: "₱5–10 / kg distress rate" },
      { label: "Transport", value: "Wait for a biyahero or pay solo freight" },
      { label: "Loans & records", value: "Bad sales leave coop loans unpaid" },
    ],
  },
  with: {
    badge: "Pooled cooperative harvest",
    rows: [
      { label: "Pre-agreed offer", value: "₱30 / kg illustrative buyer price" },
      { label: "Transport", value: "1 shared truck routed to 5 farms" },
      { label: "Loans & records", value: "Auto-deducted loan + SMS peso receipt" },
    ],
  },
} as const;

export function MissionPanel({ text }: { text: string }) {
  const [mode, setMode] = useState<"without" | "with">("with");
  const current = MISSION_MODES[mode];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-[#0b130e] p-5 text-card sm:p-8 lg:p-10">
      <Image
        src="/stock/farmer-harvest.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 1216px, 94vw"
        className="object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b130e]/90 via-[#123620]/82 to-[#0b130e]/90"
      />
      <span
        aria-hidden="true"
        className="orb-ambient absolute -right-16 -top-16 h-72 w-72 rounded-full"
      />

      <div className="relative z-10 grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col justify-center rounded-[24px] border border-white/60 bg-white/95 p-6 text-ink shadow-soft backdrop-blur-md sm:p-8">
          <p className="text-[0.95rem] font-bold text-green">Our mission</p>
          <p className="mt-3 text-[1.2rem] font-medium leading-[1.45] tracking-[-0.01em] text-ink sm:text-[1.4rem]">
            {text}
          </p>
        </div>

        <div className="surface-obsidian flex flex-col justify-between rounded-[24px] border border-white/15 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div
              className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1"
              role="group"
              aria-label="Compare selling models"
            >
              <button
                type="button"
                aria-pressed={mode === "without"}
                onClick={() => setMode("without")}
                className={`min-h-10 rounded-lg px-3 py-1.5 text-[0.875rem] font-bold transition-colors ${
                  mode === "without"
                    ? "surface-lime text-ink"
                    : "text-[#d7e5d9] hover:text-card"
                }`}
              >
                Without CooPERA
              </button>
              <button
                type="button"
                aria-pressed={mode === "with"}
                onClick={() => setMode("with")}
                className={`min-h-10 rounded-lg px-3 py-1.5 text-[0.875rem] font-bold transition-colors ${
                  mode === "with"
                    ? "surface-lime text-ink"
                    : "text-[#d7e5d9] hover:text-card"
                }`}
              >
                With CooPERA
              </button>
            </div>
            <span className="text-[0.82rem] font-semibold text-mint">
              {current.badge}
            </span>
          </div>

          <dl className="mt-5 space-y-3">
            {current.rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-0.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <dt className="text-[0.875rem] text-[#C9D0C6]">{row.label}</dt>
                <dd className="text-[0.95rem] font-bold text-card">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const VISION_STAGES = [
  {
    key: "forecast" as const,
    label: "1. Forecast",
    farmer: "No sudden harvest panic — pickup window is planned 2 weeks early.",
    coop: "Knows exact volume across member farms before produce ripens.",
  },
  {
    key: "truck" as const,
    label: "2. Pool",
    farmer: "Shares freight instead of hiring an entire truck or losing to spoilage.",
    coop: "Fills one efficient route across nearby farms in a single trip.",
  },
  {
    key: "buyer" as const,
    label: "3. Sell",
    farmer: "Sells with collective bargaining power rather than alone at the gate.",
    coop: "Locks grade and fair price upfront with institutional buyers or KADIWA.",
  },
  {
    key: "settle" as const,
    label: "4. Settle",
    farmer: "Paid on time with an itemized SMS receipt for every peso — no app required.",
    coop: "Recovers farm loans cleanly on pickup day with full ledger records.",
  },
];

export function VisionPanel({ text }: { text: string }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = VISION_STAGES[stageIdx];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-[#103820] p-5 text-card sm:p-8 lg:p-10">
      <Image
        src="/stock/rice-field.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 1216px, 94vw"
        className="object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0e321c]/90 via-[#144728]/82 to-[#0b130e]/90"
      />
      <span
        aria-hidden="true"
        className="orb-ambient absolute -bottom-16 -left-16 h-72 w-72 rounded-full"
      />

      <div className="relative z-10 grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col justify-center rounded-[24px] border border-white/60 bg-white/95 p-6 text-ink shadow-soft backdrop-blur-md sm:p-8">
          <p className="text-[0.95rem] font-bold text-green">Our vision</p>
          <p className="mt-3 text-[1.2rem] font-medium leading-[1.45] tracking-[-0.01em] text-ink sm:text-[1.4rem]">
            {text}
          </p>
        </div>

        <div className="surface-obsidian flex flex-col justify-between rounded-[24px] border border-white/15 p-5 sm:p-6">
          <div>
            <p className="text-[0.875rem] font-semibold text-mint">
              Harvest-to-Receipt flow · Click a stage
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VISION_STAGES.map((s, idx) => {
                const Icon = serviceIcon[s.key];
                const active = idx === stageIdx;
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStageIdx(idx)}
                    className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-[0.85rem] font-bold transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] ${
                      active
                        ? "surface-lime border-transparent text-ink"
                        : "border-white/15 bg-white/5 text-card hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
              <p className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-wider text-mint">
                <IconCheck className="h-3.5 w-3.5" /> For the farmer
              </p>
              <p className="mt-1 text-[0.95rem] text-card">{stage.farmer}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
              <p className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-wider text-mint">
                <IconCheck className="h-3.5 w-3.5" /> For the cooperative
              </p>
              <p className="mt-1 text-[0.95rem] text-card">{stage.coop}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
