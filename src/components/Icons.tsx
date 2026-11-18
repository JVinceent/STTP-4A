type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const IconForecast = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 17l5-5 4 3 7-8" />
    <path d="M15 7h4v4" />
    <path d="M3 21h18" />
  </svg>
);

export const IconTruck = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M2 6h11v10H2z" />
    <path d="M13 9h4.5L21 12.5V16h-8z" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const IconBuyer = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M7 11l3.5-3.5a2 2 0 0 1 2.8 0L17 11" />
    <path d="M2 12l4-4 3 1M22 12l-4-4-3 1" />
    <path d="M6 13l4 4a1.5 1.5 0 0 0 2.1 0l5.9-6" />
  </svg>
);

export const IconReceipt = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>
);

export const IconPin = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <path
      d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
      fill="currentColor"
    />
    <circle cx="12" cy="10" r="2.6" fill="#1B7A43" />
  </svg>
);

export const IconArrow = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className} strokeWidth={2.2}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const IconMessage = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 5h16v11H9l-5 4z" />
  </svg>
);

export const serviceIcon = {
  forecast: IconForecast,
  truck: IconTruck,
  buyer: IconBuyer,
  settle: IconReceipt,
} as const;
