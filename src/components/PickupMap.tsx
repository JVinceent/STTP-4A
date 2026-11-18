import { IconTruck } from "./Icons";

type Plot = { pts: string; fill: string; farm?: { n: number; x: number; y: number; style: "yellow" | "light" } };

// Hand-drawn aerial patchwork (viewBox 1200×440). Five plots are the farms
// harvesting this round; the dashed line is the shared truck route.
const PLOTS: Plot[] = [
  { pts: "0,0 500,0 470,110 0,150", fill: "url(#pm-rows-dark)" },
  { pts: "0,150 470,110 440,230 0,260", fill: "#FFD21F", farm: { n: 1, x: 225, y: 188, style: "yellow" } },
  { pts: "0,260 440,230 405,340 0,370", fill: "url(#pm-rows-mid)" },
  { pts: "0,370 405,340 385,440 0,440", fill: "#1f6b35" },
  { pts: "535,0 820,0 790,170 500,190", fill: "#226f36" },
  { pts: "820,0 1200,0 1200,130 800,150", fill: "url(#pm-rows-mid)", farm: { n: 5, x: 1000, y: 72, style: "light" } },
  { pts: "500,190 790,170 770,300 470,320", fill: "url(#pm-rows-light)", farm: { n: 2, x: 632, y: 246, style: "light" } },
  { pts: "800,150 1200,130 1200,280 780,300", fill: "url(#pm-rows-dark)" },
  { pts: "470,320 770,300 750,440 430,440", fill: "#FFD21F", farm: { n: 3, x: 598, y: 378, style: "yellow" } },
  { pts: "780,300 1200,280 1200,440 760,440", fill: "url(#pm-rows-mid)", farm: { n: 4, x: 985, y: 366, style: "light" } },
];

const ROUTE = "M392 440 L438 300 L225 188 L470 212 L632 246 L598 378 L985 366 L1000 72";

export function PickupMap() {
  const farms = PLOTS.filter((p) => p.farm);
  return (
    <figure className="cv-art relative overflow-hidden rounded-[28px] bg-field-1">
      <svg
        viewBox="0 0 1200 440"
        preserveAspectRatio="xMidYMid slice"
        className="block h-[300px] w-full sm:h-[360px] lg:h-[440px]"
        role="img"
        aria-label="Illustrative map: five farms harvesting in the same two weeks, joined by one dashed truck route that stops at each farm."
      >
        <defs>
          {[
            ["pm-rows-dark", "#1d6230", "#2a7a3e"],
            ["pm-rows-mid", "#2f8a45", "#3f9c4f"],
            ["pm-rows-light", "#5aad4e", "#6dbd5c"],
          ].map(([id, a, b]) => (
            <pattern key={id} id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
              <rect width="16" height="16" fill={a} />
              <rect width="16" height="7" fill={b} />
            </pattern>
          ))}
          <pattern id="pm-farm-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="10" height="10" fill="#FFD21F" />
            <rect width="10" height="3" fill="#F2C200" />
          </pattern>
        </defs>

        <rect width="1200" height="440" fill="#2a7a3e" />
        {PLOTS.map((p, i) => (
          <g key={i}>
            <polygon points={p.pts} fill={p.farm?.style === "yellow" ? "url(#pm-farm-hatch)" : p.fill} />
            {p.farm?.style === "light" && (
              <polygon points={p.pts} fill="#FFFFFF" fillOpacity="0.28" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="8 7" />
            )}
          </g>
        ))}

        {/* Farm road */}
        <path d="M528 -10 L376 450" stroke="#C8B98F" strokeWidth="22" />
        <path d="M528 -10 L376 450" stroke="#E9DDB8" strokeWidth="2" strokeDasharray="10 10" />

        {/* Truck route */}
        <path d={ROUTE} fill="none" stroke="#141A16" strokeOpacity="0.35" strokeWidth="7" strokeLinejoin="round" />
        <path d={ROUTE} fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="2 10" strokeLinecap="round" strokeLinejoin="round" />

        {/* Pins */}
        {farms.map(({ farm }) => (
          <g key={farm!.n} transform={`translate(${farm!.x} ${farm!.y})`}>
            <ellipse cy="2" rx="9" ry="3.5" fill="#141A16" fillOpacity="0.35" />
            <path d="M0 0s-14-12.5-14-24a14 14 0 1 1 28 0C14-12.5 0 0 0 0Z" fill="#FFFFFF" />
            <circle cy="-24" r="5.5" fill="#1B7A43" />
            <text y="28" textAnchor="middle" className="hidden fill-white text-[17px] font-bold sm:block" style={{ paintOrder: "stroke", stroke: "rgb(20 26 22 / 0.45)", strokeWidth: 4 }}>
              Farm {farm!.n}
            </text>
          </g>
        ))}
      </svg>

      {/* Overlay chips */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 sm:left-5 sm:top-5">
        <span className="inline-flex items-center gap-2 rounded-xl bg-ink/85 px-3 py-2 text-sm font-medium text-card backdrop-blur">
          <IconTruck className="h-4 w-4 text-mint" />1 truck, 5 pickups
        </span>
        <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink">
          Illustrative example
        </span>
      </div>
    </figure>
  );
}
