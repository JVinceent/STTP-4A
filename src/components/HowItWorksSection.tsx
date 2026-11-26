"use client";

import { useId, useState } from "react";
import { HOW } from "@/content";
import { IconCheck, IconMessage, IconTruck } from "./Icons";
import { PickupMap } from "./PickupMap";

const PRICE_PRESETS = [24, 30, 36] as const;
const MIDDLEMAN_PRICE = 12;

export function HowItWorksSection() {
  const sliderId = useId();
  const [selectedFarm, setSelectedFarm] = useState(3);
  const [offerPrice, setOfferPrice] = useState(30);
  const [approved, setApproved] = useState(false);

  const farm = HOW.farms.find((f) => f.n === selectedFarm) ?? HOW.farms[2];

  const gross = farm.kg * offerPrice;
  const net = gross - farm.loan - farm.freight;
  const middlemanNet = farm.kg * MIDDLEMAN_PRICE - farm.loan;
  const difference = net - middlemanNet;

  return (
    <div>
      <div className="mt-10">
        <PickupMap
          farms={HOW.farms}
          selectedFarm={selectedFarm}
          onSelectFarm={setSelectedFarm}
          approved={approved}
        />
      </div>

      {/* Accessible farm selector bar below the 3D map */}
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Select a farm on the route">
        <span className="mr-1 text-[0.9rem] font-semibold text-muted">Inspect farmer payout:</span>
        {HOW.farms.map((f) => {
          const active = f.n === selectedFarm;
          return (
            <button
              key={f.n}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedFarm(f.n)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 py-2 text-[0.9rem] font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                active
                  ? "border-ink bg-ink text-card"
                  : "border-line bg-card text-ink hover:border-ink/40"
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.75rem] font-extrabold ${
                  active ? "bg-accent text-ink" : "bg-paper text-green"
                }`}
              >
                {f.n}
              </span>
              <span>{f.farmer}</span>
              <span className={`text-[0.8rem] ${active ? "text-[#D7DCD4]" : "text-muted"}`}>
                ({(f.kg / 1000).toFixed(1)}t)
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Manager card */}
        <div className="flex flex-col rounded-[28px] border border-line bg-card p-4 sm:p-5">
          <p className="rounded-2xl border border-line bg-paper py-3 text-center text-[1.05rem] font-bold text-ink">
            {HOW.manager.title}
          </p>
          <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line">
            {HOW.manager.stats.map((s) => (
              <div key={s.value} className="flex flex-col-reverse px-3 py-4 text-center sm:px-4">
                <dt className="mt-1 text-[0.95rem] text-muted">{s.label}</dt>
                <dd className="text-[1.15rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.35rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Interactive buyer price control */}
          <div className="mt-4 rounded-2xl border border-line bg-paper/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor={sliderId} className="text-[0.95rem] font-bold text-ink">
                Buyer offer price
              </label>
              <span className="inline-block rounded-lg bg-accent px-2.5 py-1 text-[1rem] font-extrabold tabular-nums text-ink">
                ₱{offerPrice} / kg
              </span>
            </div>

            <input
              id={sliderId}
              type="range"
              min={18}
              max={40}
              step={1}
              value={offerPrice}
              onChange={(e) => setOfferPrice(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-[#207a21]"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => {
                const selected = offerPrice === p;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setOfferPrice(p)}
                    className={`inline-flex min-h-11 items-center rounded-xl border px-3.5 text-[0.9rem] font-bold transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] ${
                      selected
                        ? "border-ink bg-ink text-card"
                        : "border-line bg-card text-ink hover:border-ink/40"
                    }`}
                  >
                    ₱{p}/kg
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-1 flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper p-4">
            {approved ? (
              <>
                <p className="inline-flex items-center gap-2 text-[0.98rem] font-bold text-green">
                  <IconCheck className="h-5 w-5 shrink-0" />
                  Booking approved · 5 SMS receipts queued
                </p>
                <button
                  type="button"
                  onClick={() => setApproved(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-card px-4 text-[0.92rem] font-bold text-ink transition-[border-color,transform] duration-150 hover:border-ink/40 active:scale-[0.98]"
                >
                  Reset simulation
                </button>
              </>
            ) : (
              <>
                <p className="inline-flex items-center gap-2 text-[0.95rem] text-muted">
                  <IconTruck className="h-4 w-4 text-green" />
                  Ready for manager sign-off
                </p>
                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  className="surface-cta-green inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-[1rem] font-bold text-ink shadow-[0_12px_26px_-10px_rgb(22_101_52/0.45)] transition-[filter,transform] duration-150 active:scale-[0.98]"
                >
                  <IconCheck className="h-4 w-4" />
                  {HOW.manager.action}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Farmer card */}
        <div className="flex flex-col rounded-[28px] border border-line bg-card p-4 sm:p-5">
          <p className="rounded-2xl border border-line bg-paper py-3 text-center text-[1.05rem] font-bold text-ink">
            {HOW.farmer.title} (Farm {farm.n} · {farm.farmer})
          </p>
          <dl className="mt-4 rounded-2xl border border-line px-4">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[1.05rem] text-muted">
                {farm.kg.toLocaleString()} kg × ₱{offerPrice}
              </dt>
              <dd className="text-[1.05rem] font-bold tabular-nums text-ink">
                ₱{gross.toLocaleString()}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-line py-3">
              <dt className="text-[1.05rem] text-muted">Loan</dt>
              <dd className="text-[1.05rem] font-bold tabular-nums text-ink">
                −₱{farm.loan.toLocaleString()}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-line py-3">
              <dt className="text-[1.05rem] text-muted">Freight share</dt>
              <dd className="text-[1.05rem] font-bold tabular-nums text-ink">
                −₱{farm.freight.toLocaleString()}
              </dd>
            </div>
          </dl>

          <div className="surface-obsidian mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-card">
            <div>
              <p className="text-[1.05rem]">
                Net payout{" "}
                <span className="surface-lime ml-1 inline-block rounded-lg px-2.5 py-1 text-[1.35rem] font-extrabold tabular-nums tracking-[-0.02em] text-ink">
                  ₱{net.toLocaleString()}
                </span>
              </p>
              <p className="mt-1.5 text-[0.9rem] text-[#D7DCD4]">
                {difference >= 0 ? (
                  <>
                    <span className="font-bold text-mint">+₱{difference.toLocaleString()}</span> vs. ₱12/kg middleman (₱{middlemanNet.toLocaleString()})
                  </>
                ) : (
                  <>Compared to ₱{middlemanNet.toLocaleString()} at ₱12/kg middleman</>
                )}
              </p>
            </div>
            <p className="inline-flex items-center gap-2 text-[0.95rem] text-[#D7DCD4]">
              <IconMessage className="h-4 w-4 text-mint" /> with a text receipt.
            </p>
          </div>

          {approved && (
            <div
              role="status"
              aria-live="polite"
              className="mt-3 rounded-2xl border border-green/35 bg-green/10 p-3.5 text-[0.92rem] text-ink"
            >
              <p className="font-bold text-green">SMS Receipt Sent to {farm.farmer}</p>
              <p className="mt-1 font-medium tabular-nums">
                CooPERA: {farm.kg.toLocaleString()}kg @ ₱{offerPrice}/kg = ₱{gross.toLocaleString()}. Loan −₱{farm.loan.toLocaleString()}, Freight −₱{farm.freight.toLocaleString()}. Net payout: ₱{net.toLocaleString()}.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 max-w-[70ch] text-[0.95rem] text-muted">{HOW.farmer.caption}</p>
    </div>
  );
}
