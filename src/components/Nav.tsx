"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { NAV, SECTION_TO_NAV } from "@/content";

/**
 * Sticky top bar with scroll-spy. An IntersectionObserver watches every
 * section through a thin band across the upper middle of the viewport; the
 * section crossing that band sets the active link.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(SECTION_TO_NAV[entry.target.id] ?? null);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    // The last section can be too short to reach the band; treat the page
    // bottom as "contact".
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("contact");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper shadow-[0_1px_0_0_#D8D2C2]" : "bg-paper"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="shrink-0 rounded-lg" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1.5 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-flex h-10 items-center rounded-xl border px-4 text-[0.95rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-card"
                      : "border-line bg-card text-ink hover:border-ink/40"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            aria-current={active === "contact" ? "location" : undefined}
            className={`hidden h-10 items-center rounded-xl px-4 text-[0.95rem] font-bold transition-colors sm:inline-flex ${
              active === "contact" ? "bg-yellow text-ink ring-2 ring-ink" : "bg-ink text-card hover:bg-ink-2"
            }`}
          >
            Get in touch
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <ul className="mx-auto flex max-w-[1280px] flex-col gap-1.5 px-4 py-4 sm:px-6">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex h-12 items-center rounded-xl border px-4 font-medium ${
                    isActive ? "border-ink bg-ink text-card" : "border-line bg-card text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li className="sm:hidden">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 flex h-12 items-center justify-center rounded-xl bg-ink font-bold text-card"
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
