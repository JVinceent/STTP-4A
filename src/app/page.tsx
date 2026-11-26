import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { HeroVisual } from "@/components/HeroVisual";
import { AboutTabs } from "@/components/AboutTabs";
import { MissionPanel, VisionPanel } from "@/components/AboutVisuals";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PlansSection } from "@/components/PlansSection";
import { ValidationFarmerCard } from "@/components/ValidationFarmerCard";
import { TerrainBanner3D } from "@/components/TerrainBanner3D";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { IconArrow, IconMessage, serviceIcon } from "@/components/Icons";
import {
  ABOUT,
  CONTACT,
  FOOTER,
  HERO,
  HOW,
  PARTNERS,
  PLANS,
  SERVICES,
  STORY,
  TEAM,
  VALIDATION,
} from "@/content";

const wrap = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const h2 = "text-[clamp(2.1rem,4.4vw,3.6rem)] font-bold text-ink";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative z-0 isolate">
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Plans />
        <Validation />
        <Partnerships />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
}) {
  const styles = {
    primary: "bg-accent text-ink shadow-[0_10px_24px_-10px_rgb(20_26_22/0.55)] hover:bg-accent-hover",
    secondary: "border border-line bg-card text-ink hover:border-ink/40",
    dark: "bg-ink text-card hover:bg-ink-2",
  }[variant];
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-[1rem] font-bold transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] ${styles}`}
    >
      {children}
    </a>
  );
}

/* ---------------------------- Home (hero) --------------------------- */

function Hero() {
  return (
    <section id="home" className="pt-2 sm:pt-4">
      <div className={wrap}>
        <div className="overflow-hidden rounded-[28px] border border-line bg-card px-5 pb-6 pt-8 sm:rounded-[36px] sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-2.5 pr-4 text-[0.875rem] font-medium text-muted">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
                {HERO.eyebrow}
              </p>
              <h1 className="mt-6 max-w-[15ch] text-[clamp(2.5rem,5.4vw,4.6rem)] font-bold text-ink">
                {HERO.heading}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.0625rem] text-muted sm:text-[1.125rem]">{HERO.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#contact">
                  Request a pilot <IconArrow />
                </Button>
                <Button href="#how-it-works" variant="secondary">
                  See how it works
                </Button>
              </div>
            </div>
            <HeroVisual />
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-6">
            {HERO.figures.map((f) => (
              <li key={f.value} className="flex flex-col rounded-[20px] border border-line bg-paper/60 p-5">
                <span className="text-[1.9rem] font-extrabold leading-none tracking-[-0.03em] text-ink">{f.value}</span>
                <span className="mt-3 text-[1rem] leading-snug text-ink">{f.label}</span>
                <span className="mt-auto pt-3 text-[0.875rem] text-muted">{f.source}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- About ------------------------------ */

function Story() {
  return (
    <ol className="relative">
      {STORY.map((m, i) => {
        const last = i === STORY.length - 1;
        return (
          <li key={m.title} className="relative grid grid-cols-[28px_1fr] gap-x-4 sm:gap-x-6">
            {/* rail */}
            <div className="relative flex justify-center" aria-hidden="true">
              {!last && <span className="absolute bottom-0 top-7 w-px bg-line" />}
              <span
                className={`relative mt-2 h-4 w-4 rounded-full border-[3px] ${
                  last ? "border-ink bg-accent" : "border-green bg-card"
                }`}
              />
            </div>

            {m.photo ? (
              <div className={`grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-6 ${last ? "pb-0" : "pb-10"}`}>
                <Photo
                  src={m.photo.src}
                  alt={m.photo.alt}
                  sizes="(min-width: 640px) 220px, 90vw"
                  className="order-2 aspect-[4/3] rounded-xl sm:order-none sm:rounded-2xl"
                />
                <div className="pt-0.5">
                  <span className="inline-flex rounded-full border border-line bg-paper px-2.5 py-0.5 text-[0.78rem] font-semibold text-green">
                    {m.tag}
                  </span>
                  <h3 className="mt-2 text-[1.3rem] font-bold tracking-[-0.02em] text-ink">{m.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[1.0625rem] text-muted">{m.body}</p>
                </div>
              </div>
            ) : (
              <div className={`pt-0.5 ${last ? "pb-0" : "pb-8"}`}>
                <span className="inline-flex rounded-full border border-line bg-paper px-2.5 py-0.5 text-[0.78rem] font-semibold text-green">
                  {m.tag}
                </span>
                <h3 className="mt-2 text-[1.25rem] font-bold tracking-[-0.02em] text-ink">{m.title}</h3>
                <p className="mt-1.5 max-w-[66ch] text-[1.0625rem] text-muted">{m.body}</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={`${h2} max-w-[20ch]`}>{ABOUT.heading}</h2>
        </Reveal>
        <div className="mt-10">
          <AboutTabs
            tabs={[
              { id: "mission", label: "Our mission", content: <MissionPanel text={ABOUT.mission} /> },
              { id: "vision", label: "Our vision", content: <VisionPanel text={ABOUT.vision} /> },
              {
                id: "story",
                label: "Our story",
                content: (
                  <div className="rounded-[28px] border border-line bg-card p-5 sm:p-10">
                    <Story />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Services ---------------------------- */

function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={`${h2} max-w-[14ch]`}>{SERVICES.heading}</h2>
          <p className="max-w-[36rem] text-muted">{SERVICES.body}</p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.cards.map((c, i) => {
            const Icon = serviceIcon[c.key];
            return (
              <Reveal as="li" key={c.key} delay={i * 0.06} className="flex flex-col rounded-[24px] border border-line bg-card p-3">
                <div className="flex items-center gap-2 p-2">
                  <span className="inline-flex h-9 items-center gap-2 rounded-xl bg-accent px-3 text-[0.95rem] font-bold text-ink">
                    <Icon className="h-[18px] w-[18px]" />
                    {c.title}
                  </span>
                </div>
                <div className="mt-5 flex flex-1 flex-col rounded-[18px] bg-paper p-4 lg:mt-10">
                  <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{c.question}</h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-6 flex items-start gap-3 text-[1rem] text-muted">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green text-white">
            <IconMessage />
          </span>
          {SERVICES.footnote}
        </p>
      </div>
    </section>
  );
}

/* ---------------------------- How it works -------------------------- */

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>{HOW.heading}</h2>
        </Reveal>
        <HowItWorksSection />
      </div>
    </section>
  );
}

/* -------------------------------- Plans ----------------------------- */

function Plans() {
  return (
    <section id="plans" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={`${h2} max-w-[14ch]`}>{PLANS.heading}</h2>
          <p className="max-w-[36rem] text-muted">{PLANS.body}</p>
        </Reveal>
        <PlansSection />
      </div>
    </section>
  );
}

/* ----------------------------- Validation --------------------------- */

function Validation() {
  return (
    <section id="validation" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={`${h2} max-w-[18ch]`}>{VALIDATION.heading}</h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALIDATION.cards.map((c, i) => (
            <Reveal as="li" key={c.key} delay={i * 0.06} className="flex flex-col rounded-[24px] border border-line bg-card p-3">
              {c.photo ? (
                <Photo
                  src={c.photo.src}
                  alt={c.photo.alt}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/3] rounded-[18px]"
                />
              ) : c.key === "farmers" ? (
                <ValidationFarmerCard />
              ) : (
                <div className="flex aspect-[4/3] flex-col justify-between rounded-[18px] bg-ink p-4 text-card sm:p-5">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.78rem] font-semibold text-mint">
                    <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
                    DOST-SEI Consultation
                  </p>
                  <div>
                    <p className="text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-card">
                      ₱13 <span className="text-[1rem] font-semibold text-[#C9D0C6]">/ kg</span>
                    </p>
                    <p className="mt-1 text-[0.875rem] text-[#C9D0C6]">Typical farmgate palay price</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[0.75rem] font-medium text-card">
                      SMS-first reach
                    </span>
                    <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[0.75rem] font-medium text-card">
                      Coop channel
                    </span>
                  </div>
                </div>
              )}

              <div className="p-3 pt-5">
                <h3 className="text-[1.15rem] font-bold leading-snug tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4 grid gap-8 rounded-[28px] bg-ink p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
          {VALIDATION.quotes.map((q) => (
            <figure key={q.who} className="flex flex-col">
              <blockquote lang="fil" className="text-[1.35rem] font-medium leading-[1.4] tracking-[-0.01em] text-card sm:text-[1.6rem]">
                “{q.fil}”
              </blockquote>
              <p className="mt-3 text-[1.05rem] text-[#C9D0C6]">{q.en}</p>
              <figcaption className="mt-auto pt-5 text-[0.95rem] font-medium text-mint">{q.who}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- Partnerships -------------------------- */

function Partnerships() {
  return (
    <section id="partnerships" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={`${h2} max-w-[14ch]`}>{PARTNERS.heading}</h2>
          <p className="max-w-[36rem] text-muted">{PARTNERS.body}</p>
        </Reveal>
        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {PARTNERS.list.map((p) => (
            <li key={p.name} className="flex items-start gap-4 rounded-[20px] border border-line bg-card p-5">
              <span className="mt-1 h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-green" aria-hidden="true" />
              <div>
                <h3 className="text-[1.1rem] font-bold leading-snug tracking-[-0.015em]">{p.name}</h3>
                <p className="mt-1 text-[1rem] text-muted">{p.why}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------- Team ------------------------------ */

const MEMBER_TONES = {
  green: "border border-green/25 bg-green/12 text-green",
  ink: "bg-ink text-card",
  accent: "border border-accent/35 bg-accent/18 text-accent-text",
} as const;

function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>{TEAM.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-line">
            <Photo
              src={TEAM.photo.src}
              alt={TEAM.photo.alt}
              sizes="(min-width: 1024px) 580px, 92vw"
              className="aspect-[4/3] h-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-[340px] [&_img]:object-[50%_62%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-5 pt-14">
              <p className="text-[0.95rem] font-semibold text-card">{TEAM.photo.caption}</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {TEAM.members.map((m) => (
              <li
                key={m.name}
                className="flex min-w-0 flex-col justify-between rounded-[22px] border border-line bg-card p-4 sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-[0.95rem] font-extrabold tracking-[-0.02em] ${MEMBER_TONES[m.tone]}`}
                >
                  {m.initials}
                </span>
                <div className="mt-4 min-w-0">
                  <h3 className="text-[1rem] font-bold leading-snug tracking-[-0.015em] text-ink sm:text-[1.0625rem]">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[0.875rem] text-muted">{m.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Contact ---------------------------- */

function Contact() {
  return (
    <section id="contact" className="pb-16 pt-20 sm:pt-28">
      <div className={wrap}>
        <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <h2 className="max-w-[14ch] text-[clamp(2.4rem,5.4vw,4.4rem)] font-bold text-ink">{CONTACT.heading}</h2>
            <p className="mt-5 max-w-[34rem] text-muted">{CONTACT.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CONTACT.pills.map((pill) => (
                <li
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.875rem] font-semibold text-ink"
                >
                  <span className="h-2 w-2 rounded-full bg-green" aria-hidden="true" />
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ---------------------------- */

function Footer() {
  return (
    <footer className="pb-6">
      <div className={wrap}>
        <div className="cv-art relative h-[180px] overflow-hidden rounded-[28px] border border-line sm:h-[260px] lg:h-[320px]">
          <TerrainBanner3D />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d2415]/85 via-[#0d2415]/25 to-transparent"
          />
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.18em] left-3 text-[clamp(4.5rem,19vw,17rem)] font-extrabold leading-none tracking-[-0.06em] sm:left-6"
          >
            <span className="text-card">Coo</span>
            <span className="text-accent">PERA</span>
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="text-[0.95rem] text-muted">{FOOTER}</p>
        </div>
      </div>
    </footer>
  );
}
