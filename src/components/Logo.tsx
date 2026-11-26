import Image from "next/image";

type LogoProps = {
  /** "light" = on paper/card backgrounds, "dark" = on ink backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

/** The CooPERA mark: hand, leaves and the connected-nodes sprout. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={512}
      height={512}
      className={`${className} object-contain`}
      aria-hidden="true"
    />
  );
}

/**
 * Wordmark from the brand logo: "Coo" in green, "PERA" in orange.
 * On dark backgrounds "Coo" switches to the logo's light leaf green for contrast.
 */
export function Logo({ tone = "light", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.45rem] font-extrabold leading-none tracking-[-0.03em]">
        <span className="sr-only">CooPERA</span>
        <span aria-hidden="true" className={tone === "dark" ? "text-leaf" : "text-green"}>
          Coo
        </span>
        <span aria-hidden="true" className={tone === "dark" ? "text-accent" : "text-accent-text"}>
          PERA
        </span>
      </span>
    </span>
  );
}
