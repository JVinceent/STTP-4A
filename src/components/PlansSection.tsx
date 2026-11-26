"use client";

import { useState } from "react";
import { PLANS, SERVICES } from "@/content";
import { IconArrow, IconCheck, serviceIcon } from "./Icons";

const TRUCK_COSTS = [10000, 14000, 18000] as const;
const FARM_COUNTS = [3, 5, 8] as const;

type ModuleKey = (typeof SERVICES.cards)[number]["key"];

export function PlansSection() {
  const [selectedModules, setSelectedModules] = useState<ModuleKey[]>([
    "forecast",
    "truck",
    "buyer",
    "settle",
  ]);
  const [truckCost, setTruckCost] = useState<number>(14000);
  const [farmCount, setFarmCount] = useState<number>(5);

  const toggleModule = (key: ModuleKey) => {
    setSelectedModules((prev) => {
      if (prev.includes(key)) {
        return prev.length > 1 ? prev.filter((k) => k !== key) : prev;
      }
      return [...prev, key];
    });
  };

  const selectTierPreset = (tierName: string) => {
    if (tierName === "Single service") {
      setSelectedModules(["forecast"]);
    } else if (tierName === "Build your own") {
      setSelectedModules(["forecast", "truck"]);
    } else {
      setSelectedModules(["forecast", "truck", "buyer", "settle"]);
    }
  };

  const count = selectedModules.length;
  const activeTierName =
    count === 1 ? "Single service" : count < 4 ? "Build your own" : "Full package";

  const minFee = Math.round(truckCost * 0.08);
  const maxFee = Math.round(truckCost * 0.12);
  const perFarmFreight = Math.round(truckCost / farmCount);

  return (
    <div>
      {/* Interactive module configurator */}
      <div className="mt-10 rounded-none border border-line bg-card p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.92rem] font-bold uppercase tracking-wider text-ink">
            Select the modules your cooperative needs ({count} of 4 active):
          </p>
          <span className="rounded-none border border-green/30 bg-green/10 px-3 py-1 text-[0.82rem] font-mono font-bold uppercase text-green">
            Recommended: {activeTierName}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SERVICES.cards.map((c) => {
            const Icon = serviceIcon[c.key];
            const active = selectedModules.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => toggleModule(c.key)}
                className={`flex min-h-11 items-center gap-2 rounded-none border px-3.5 py-2 text-[0.9rem] font-bold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                  active
                    ? "border-ink bg-ink text-card"
                    : "border-line bg-paper text-ink hover:border-ink"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#bef648]" : "text-green"}`} />
                <span>{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Plan tier cards */}
      <ul className="mt-4 grid gap-4 lg:grid-cols-3">
        {PLANS.cards.map((p) => {
          const isMatched = p.name === activeTierName;
          return (
            <li
              key={p.name}
              className={`flex flex-col rounded-none p-6 transition-[background-color,border-color,box-shadow] duration-200 sm:p-8 shadow-sm ${
                isMatched
                  ? "border border-white/10 bg-[#0b130e] text-card ring-1 ring-[#bef648]"
                  : "border border-line bg-card text-ink"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.5rem] font-extrabold tracking-[-0.03em]">{p.name}</h3>
                {isMatched && (
                  <span className="rounded-none bg-[#bef648] px-2.5 py-1 text-[0.78rem] font-mono font-bold uppercase tracking-wider text-ink">
                    {p.name === "Full package" ? "All four" : "Selected"}
                  </span>
                )}
              </div>
              <p className={`mt-3 text-[1.02rem] ${isMatched ? "text-[#D7DCD4]" : "text-muted"}`}>
                {p.body}
              </p>

              <ul className="mb-8 mt-6 space-y-2.5 text-[0.95rem]">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <IconCheck className={`mt-1 h-4 w-4 shrink-0 ${isMatched ? "text-[#bef648]" : "text-green"}`} />
                    <span className={isMatched ? "text-card/90" : "text-ink"}>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-auto flex items-end justify-between gap-3 border-t pt-5 ${isMatched ? "border-white/15" : "border-line"}`}>
                <div>
                  <p className="text-[1.35rem] font-extrabold tracking-[-0.02em]">{p.priceTitle}</p>
                  <p className={`mt-1 text-[0.92rem] font-mono ${isMatched ? "text-[#bef648]" : "text-green"}`}>{p.priceNote}</p>
                </div>
                {!isMatched && (
                  <button
                    type="button"
                    onClick={() => selectTierPreset(p.name)}
                    className="inline-flex min-h-11 shrink-0 items-center rounded-none border border-line bg-paper px-3.5 text-[0.875rem] font-bold text-ink transition-colors hover:border-ink"
                  >
                    Preview
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Interactive freight estimator + Pilot CTA */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-none border border-line bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[1.2rem] font-bold">{PLANS.tripFee.title}</h3>
            <span className="rounded-none border border-line bg-paper px-3 py-1 text-[0.8rem] font-mono font-bold uppercase text-muted">
              8–12% of pooled freight
            </span>
          </div>
          <p className="mt-4 text-[clamp(2.2rem,4.4vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-ink">
            <span className="text-gradient-luxury">₱{minFee.toLocaleString()}–₱{maxFee.toLocaleString()}</span>
          </p>
          <p className="mt-2.5 text-[0.98rem] text-muted">
            On a ₱{truckCost.toLocaleString()} truck across {farmCount} farms (~₱{perFarmFreight.toLocaleString()} freight share per farm).
          </p>

          <div className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
            <div>
              <p className="text-[0.85rem] font-bold uppercase tracking-wider text-ink">Truck trip cost</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {TRUCK_COSTS.map((cost) => (
                  <button
                    key={cost}
                    type="button"
                    aria-pressed={truckCost === cost}
                    onClick={() => setTruckCost(cost)}
                    className={`min-h-10 rounded-none border px-2.5 text-[0.85rem] font-bold transition-colors ${
                      truckCost === cost
                        ? "border-ink bg-ink text-card"
                        : "border-line bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    ₱{(cost / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[0.85rem] font-bold uppercase tracking-wider text-ink">Farms sharing truck</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {FARM_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={farmCount === n}
                    onClick={() => setFarmCount(n)}
                    className={`min-h-10 rounded-none border px-2.5 text-[0.85rem] font-bold transition-colors ${
                      farmCount === n
                        ? "border-ink bg-ink text-card"
                        : "border-line bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    {n} farms
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded-none border border-ink/20 bg-[#bef648] p-6 text-ink sm:p-8 shadow-sm">
          <div className="relative z-10">
            <h3 className="text-[1.15rem] font-bold uppercase tracking-wider text-ink">{PLANS.pilot.title}</h3>
            <p className="mt-4 max-w-[22ch] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.15] tracking-[-0.035em]">
              {PLANS.pilot.body}
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-[#0b130e] px-6 text-[0.98rem] font-bold text-card transition-[background-color,transform] duration-150 hover:bg-[#1a281e] active:scale-[0.98] shadow-sm"
            >
              {PLANS.pilot.cta} <IconArrow />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-[70ch] text-[1rem] text-muted">{PLANS.line}</p>
    </div>
  );
}
