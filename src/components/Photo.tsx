import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/** Responsive photo container backed by next/image. */
export function Photo({ src, alt, sizes, className = "", preload }: Props) {
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" preload={preload} />
    </div>
  );
}
