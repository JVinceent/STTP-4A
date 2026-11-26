"use client";

/**
 * Top homepage background inspired by Pinterest reference (Supervity / 3D Green Spheres & Silk Wave Topography).
 * Features:
 * - Floating 3D realistic spheres with depth-of-field bokeh (blurred foreground and crisp midground)
 * - Flowing 3D silk topographic ribbon curves in deep emerald, jade, and bright lime
 * - Minimalist architectural crosshairs and coordinate metadata for an expensive editorial feel
 */
export function HeroSilkBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >

      {/* 3D Flowing Green Silk / Topographic Wave Ribbons */}
      <svg
        className="absolute -right-20 -top-16 h-[125%] w-[85%] max-w-[900px] opacity-[0.22] lg:opacity-[0.28] transition-opacity duration-700"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="silk-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="45%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#bef648" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="silk-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#052e16" />
            <stop offset="40%" stopColor="#15803d" />
            <stop offset="80%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#bef648" />
          </linearGradient>
          <linearGradient id="silk-grad-3" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#bef648" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#16a34a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#052e16" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Layered undulating ribbon bands */}
        <path
          d="M 150,50 C 350,180 500,40 700,160 C 850,250 820,480 680,620 C 540,760 320,680 180,600 C 60,520 80,300 150,50 Z"
          fill="url(#silk-grad-1)"
          opacity="0.35"
          filter="blur(36px)"
        />
        <path
          d="M 180,100 Q 380,220 540,120 T 750,280 Q 720,520 560,620 T 220,540 Q 120,400 180,100 Z"
          stroke="url(#silk-grad-2)"
          strokeWidth="38"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M 240,160 Q 420,260 580,180 T 710,340 Q 660,540 500,600 T 260,500 Q 180,380 240,160 Z"
          stroke="url(#silk-grad-3)"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 300,210 Q 450,290 600,220 T 680,380"
          stroke="#bef648"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Subtle topographic contour lines */}
        <path
          d="M 120,260 C 260,340 440,240 640,320 C 740,360 810,480 770,590"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.45"
        />
        <path
          d="M 140,320 C 290,400 480,300 680,380 C 780,420 830,540 790,650"
          stroke="#84cc16"
          strokeWidth="1.2"
          opacity="0.4"
        />
      </svg>

      {/* Floating 3D Spheres (matching Pinterest composition with depth of field) */}
      
      {/* 1. Large foreground blurred sphere in bottom-right corner */}
      <div
        className="sphere-3d-blur absolute -bottom-16 -right-12 h-64 w-64 rounded-full sm:h-80 sm:w-80 opacity-55"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* 2. Crisp 3D glossy sphere floating in upper right */}
      <div
        className="sphere-3d-gloss absolute right-16 top-10 h-28 w-28 rounded-full sm:h-36 sm:w-36 opacity-85"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* 3. Small sharp floating sphere top-center/right */}
      <div
        className="sphere-3d-gloss absolute right-[42%] top-6 h-12 w-12 rounded-full opacity-70"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* 4. Soft depth sphere in upper left behind eyebrow badge */}
      <div
        className="sphere-3d-blur absolute -left-12 -top-12 h-44 w-44 rounded-full opacity-40"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* 5. Ambient emerald glow center-right */}
      <div
        className="orb-ambient absolute right-1/4 top-1/3 h-96 w-96 rounded-full"
      />
    </div>
  );
}
