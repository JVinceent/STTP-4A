import { FieldArt, type FieldVariant } from "./FieldArt";
import { IconPin } from "./Icons";
import { HERO } from "@/content";

type Cell = { col: number; row: number; field?: FieldVariant };

// 3×3 plane. Cells with a field show a drawn field tile; cells without one
// show an empty dashed plot, like an unplanted parcel.
const CELLS: Cell[] = [
  { col: 0, row: 0 },
  { col: 1, row: 0, field: "rows" },
  { col: 2, row: 0, field: "terrace" },
  { col: 0, row: 1, field: "paddy" },
  { col: 1, row: 1, field: "patch" },
  { col: 2, row: 1 },
  { col: 0, row: 2, field: "young" },
  { col: 1, row: 2, field: "rows" },
];

const SIZE = 150;
const GAP = 30;

// Chip positions (percent of the visual box), tuned to sit over tiles.
// On mobile only two chips show, anchored inside the frame.
const CHIP_POS = [
  { cls: "flex right-0 top-[4%] sm:right-auto sm:left-[52%] sm:top-[6%]", thumb: "rows" as FieldVariant },
  { cls: "hidden sm:flex sm:left-0 sm:top-[40%]", thumb: "patch" as FieldVariant },
  { cls: "flex left-0 bottom-[6%] sm:bottom-auto sm:left-[56%] sm:top-[58%]", thumb: "terrace" as FieldVariant },
  { cls: "hidden sm:flex sm:left-[10%] sm:top-[80%]", thumb: "young" as FieldVariant },
];

export function HeroVisual() {
  const plane = SIZE * 3 + GAP * 2;
  return (
    <figure className="relative mx-auto w-full max-w-[640px]" aria-labelledby="hero-visual-caption">
      <div className="relative h-[360px] sm:h-[480px] lg:h-[560px]">
        {/* Isometric plane */}
        <div className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.64] sm:scale-[0.82] lg:scale-100">
          <div className="iso-plane relative" style={{ width: plane, height: plane }}>
            {CELLS.map((c, i) => {
              const style = {
                left: c.col * (SIZE + GAP),
                top: c.row * (SIZE + GAP),
                width: SIZE,
                height: SIZE,
                animationDelay: `${120 + i * 70}ms`,
              };
              return (
                <div key={i} className="tile-in absolute" style={style}>
                  <div className="dash-ring absolute -inset-[11px]" />
                  {c.field ? (
                    <div className="tile-slab absolute inset-0 overflow-hidden rounded-[18px]">
                      <FieldArt id={`hero-${i}`} variant={c.field} />
                    </div>
                  ) : (
                    <div className="absolute inset-0 rounded-[18px] bg-card/70 shadow-[inset_0_0_0_1px_#E4DFD1]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating chips (not tilted) */}
        {HERO.chips.map((chip, i) => {
          const pos = CHIP_POS[i];
          return (
            <div
              key={chip.label}
              className={`chip-in absolute w-max min-w-[180px] max-w-[250px] flex-col gap-2 rounded-2xl bg-white p-2.5 shadow-chip ${pos.cls}`}
              style={{ animationDelay: `${520 + i * 110}ms` }}
            >
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  <FieldArt id={`chip-${i}`} variant={pos.thumb} />
                </span>
                <span className="text-[0.95rem] font-bold leading-tight text-ink">{chip.label}</span>
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green text-white">
                  <IconPin className="h-3.5 w-3.5" />
                </span>
              </div>
              <span className="self-start rounded-lg bg-accent px-2.5 py-1.5 text-[0.9rem] font-bold leading-snug text-ink">
                {chip.value}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption id="hero-visual-caption" className="mt-2 text-center text-sm text-muted lg:text-right">
        Illustrative example.
      </figcaption>
    </figure>
  );
}
