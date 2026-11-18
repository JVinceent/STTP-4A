import Image from "next/image";

type Props = {
  src: string | null;
  /** the filename this slot expects under /public/photos/ */
  expects: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * A team photo, or a neutral placeholder box labelled with the file it
 * expects. Drop the file into /public/photos/ and set `src` in content.ts.
 */
export function Photo({ src, expects, alt, sizes, className = "", preload }: Props) {
  if (!src) {
    return (
      <div
        className={`placeholder-box relative flex items-center justify-center overflow-hidden text-center ${className}`}
        role="img"
        aria-label={`Photo placeholder: add ${expects}`}
      >
        <span className="rounded-lg bg-card/90 px-3 py-1.5 text-[0.8rem] font-medium leading-snug text-muted">
          [Photo: /photos/{expects}]
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" preload={preload} />
    </div>
  );
}
