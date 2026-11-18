type LogoProps = {
  /** "light" = on paper/card backgrounds, "dark" = on ink backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

/** Geometric mark: a peso coin with a leaf cut into it. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#141A16" />
      <circle cx="16" cy="16" r="10" fill="#FFD21F" />
      <path d="M16 8.6c4.6 2.3 5.6 8.6 0 14.8-5.6-6.2-4.6-12.5 0-14.8Z" fill="#141A16" />
      <path d="M16 12.2v10" stroke="#FFD21F" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Wordmark: "Coo" in ink, "PERA" in yellow.
 * On light backgrounds yellow letters fail contrast, so "PERA" sits on a
 * yellow block with ink letters. On dark backgrounds the letters are yellow.
 */
export function Logo({ tone = "light", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.35rem] font-extrabold leading-none tracking-[-0.04em]">
        <span className="sr-only">CooPERA</span>
        <span aria-hidden="true" className={tone === "dark" ? "text-card" : "text-ink"}>
          Coo
        </span>
        {tone === "dark" ? (
          <span aria-hidden="true" className="text-yellow">
            PERA
          </span>
        ) : (
          <span aria-hidden="true" className="rounded-[4px] bg-yellow px-[2px] text-ink">
            PERA
          </span>
        )}
      </span>
    </span>
  );
}
