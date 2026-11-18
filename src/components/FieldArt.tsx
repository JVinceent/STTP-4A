/**
 * Drawn aerial field textures (no stock photos). Each variant is a 200×200
 * SVG that scales to fill its box. Pass a unique `id` per instance so the
 * pattern ids don't collide.
 */
export type FieldVariant = "rows" | "paddy" | "terrace" | "patch" | "young";

type Props = {
  id: string;
  variant: FieldVariant;
  className?: string;
};

export function FieldArt({ id, variant, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {variant === "rows" && <Rows id={id} />}
      {variant === "paddy" && <Paddy id={id} />}
      {variant === "terrace" && <Terrace />}
      {variant === "patch" && <Patch />}
      {variant === "young" && <Young id={id} />}
    </svg>
  );
}

/** Wide banner (1200×420): contoured terraces or flat paddies. */
export function FieldBanner({
  id,
  variant,
  className = "",
}: {
  id: string;
  variant: "terrace" | "paddy";
  className?: string;
}) {
  const rows = Array.from({ length: 34 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sun`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#0B2A14" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {variant === "terrace" ? (
        <>
          <rect width="1200" height="420" fill="#1d6230" />
          {rows.map((i) => {
            const y = i * 15 - 60;
            return (
              <path
                key={i}
                d={`M-60 ${y} C 260 ${y - 70}, 640 ${y + 90}, 1260 ${y - 10}`}
                stroke={i % 3 === 0 ? "#2f8a45" : i % 3 === 1 ? "#4ea84d" : "#66b95a"}
                strokeWidth="11"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        </>
      ) : (
        <>
          <rect width="1200" height="420" fill="#6cb952" />
          {[
            "0,0 420,0 380,150 0,180",
            "420,0 860,0 840,120 380,150",
            "860,0 1200,0 1200,110 840,120",
            "0,180 380,150 350,300 0,320",
            "380,150 840,120 820,280 350,300",
            "840,120 1200,110 1200,270 820,280",
            "0,320 350,300 330,420 0,420",
            "350,300 820,280 800,420 330,420",
            "820,280 1200,270 1200,420 800,420",
          ].map((pts, i) => (
            <polygon
              key={pts}
              points={pts}
              fill={["#7cc463", "#5aad4e", "#8fd16b", "#4ea84d", "#9bd776", "#66b95a", "#3f9c4f", "#74bf55", "#5aad4e"][i]}
              stroke="#D9EFB8"
              strokeWidth="5"
            />
          ))}
        </>
      )}
      <rect width="1200" height="420" fill={`url(#${id}-sun)`} />
    </svg>
  );
}

/** Dense vegetable rows on a diagonal, like tomato or eggplant beds. */
function Rows({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-r`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          <rect width="14" height="14" fill="#2a7d3c" />
          <rect width="14" height="8" fill="#3d9a4a" />
          <rect y="2" width="14" height="3" fill="#56b257" opacity="0.7" />
          <rect y="10.5" width="14" height="1.4" fill="#1a5c2b" />
        </pattern>
        <radialGradient id={`${id}-l`} cx="30%" cy="20%" r="90%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0b2a14" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-r)`} />
      <rect width="200" height="200" fill={`url(#${id}-l)`} />
    </>
  );
}

/** Rice paddies: flat bright plots split by thin bunds. */
function Paddy({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-p`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <rect width="6" height="6" fill="#74bf55" />
          <rect width="6" height="2" fill="#86cc63" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-p)`} />
      <path d="M0 62 L200 40 M0 128 L200 112 M0 176 L200 166 M70 0 L84 200 M140 0 L150 200" stroke="#d9efb8" strokeWidth="3" opacity="0.85" />
      <path d="M0 62 L200 40 M0 128 L200 112 M70 0 L84 200" stroke="#3f8f3a" strokeWidth="1" opacity="0.5" transform="translate(1.5 2)" />
      <rect x="86" y="44" width="56" height="70" fill="#9bd776" opacity="0.55" />
      <rect x="0" y="130" width="72" height="46" fill="#5aa845" opacity="0.6" />
    </>
  );
}

/** Contoured tea-style terraces. */
function Terrace() {
  const lines = Array.from({ length: 22 }, (_, i) => i);
  return (
    <>
      <rect width="200" height="200" fill="#1f6b35" />
      {lines.map((i) => (
        <path
          key={i}
          d={`M-20 ${i * 11 - 30} C 50 ${i * 11 - 52}, 120 ${i * 11 + 14}, 220 ${i * 11 - 12}`}
          stroke={i % 2 ? "#3c9a48" : "#58b555"}
          strokeWidth="6.5"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <rect width="200" height="200" fill="#0b2a14" opacity="0.08" />
    </>
  );
}

/** Patchwork of plots with a dirt road, the aerial map look. */
function Patch() {
  return (
    <>
      <rect width="200" height="200" fill="#2f8a45" />
      <polygon points="0,0 92,0 70,88 0,104" fill="#4ea84d" />
      <polygon points="92,0 200,0 200,70 78,92" fill="#226f36" />
      <polygon points="0,104 70,88 62,200 0,200" fill="#1d6230" />
      <polygon points="78,92 200,70 200,200 66,200" fill="#7cc463" />
      <path d="M96 -4 L60 204" stroke="#c9b98f" strokeWidth="5" />
      <path d="M96 -4 L60 204" stroke="#efe3bf" strokeWidth="1.2" strokeDasharray="4 5" />
    </>
  );
}

/** Young seedlings: light ground with sparse dotted rows. */
function Young({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-y`} width="12" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
          <rect width="12" height="10" fill="#8fbf5a" />
          <circle cx="3" cy="5" r="2.2" fill="#3f8f3a" />
          <circle cx="9" cy="5" r="2.2" fill="#4c9c42" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-y)`} />
      <rect width="200" height="200" fill="#ffffff" opacity="0.06" />
    </>
  );
}
