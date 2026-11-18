"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string; content: ReactNode };

/** Segmented tabs (WAI-ARIA tabs pattern with arrow-key support). */
export function AboutTabs({ tabs }: { tabs: Tab[] }) {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="About CooPERA"
        className="inline-flex w-full max-w-[520px] rounded-2xl border border-line bg-card p-1.5 sm:w-auto"
      >
        {tabs.map((t, i) => {
          const selected = i === index;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={onKeyDown}
              className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 text-[0.95rem] font-medium transition-colors sm:flex-none sm:px-6 ${
                selected ? "bg-ink text-card" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={i !== index}
          tabIndex={0}
          className="mt-8 rounded-[28px] focus-visible:outline-offset-4"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
