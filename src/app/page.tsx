import type { ReactNode } from "react";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { HeroVisual } from "@/components/HeroVisual";
import { HeroSilkBackground } from "@/components/HeroSilkBackground";
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-none focus:bg-[#bef648] focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
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
  variant?: "primary" | "secondary" | "dark" | "lime";
}) {
  const styles = {
    primary:
      "bg-[#0b130e] text-card hover:bg-[#182a1d]",
    secondary: "border border-line bg-card text-ink hover:border-ink hover:bg-neutral-50",
    dark: "bg-ink text-card hover:bg-ink-2",
    lime: "bg-[#bef648] text-ink hover:bg-[#ade634]",
  }[variant];
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-none px-6 text-[0.98rem] font-bold tracking-tight transition-[background-color,border-color,filter,transform] duration-150 active:scale-[0.98] ${styles}`}
    >
      {children}
    </a>
  );
}

/* ---------------------------- Home (hero) --------------------------- */

function Hero() {
  const leadPhrase = "Fair prices";
  const hasLead = HERO.heading.startsWith(leadPhrase);

  return (
    <section id="home" className="pt-2 sm:pt-4">
      <div className={wrap}>
        <div className="surface-hero relative overflow-hidden rounded-none border border-line px-5 pb-6 pt-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          {/* Top homepage 3D green silk & floating spheres background (Pinterest inspired) */}
          <HeroSilkBackground />

          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-none border border-line bg-white/90 py-1.5 pl-3 pr-4 text-[0.85rem] font-bold tracking-wide uppercase text-muted backdrop-blur-sm">
                <span className="h-2 w-2 shrink-0 rounded-none bg-green" aria-hidden="true" />
                {HERO.eyebrow}
              </p>
              <h1 className="mt-6 max-w-[15ch] text-[clamp(2.5rem,5.4vw,4.6rem)] font-extrabold tracking-[-0.04em] text-ink">
                {hasLead ? (
                  <>
                    <span className="text-gradient-luxury">{leadPhrase}</span>
                    {HERO.heading.slice(leadPhrase.length)}
                  </>
                ) : (
                  HERO.heading
                )}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.0625rem] text-muted sm:text-[1.125rem] leading-relaxed">
                {HERO.body}
              </p>
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

          <ul className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3 lg:mt-6">
            {HERO.figures.map((f) => (
              <li
                key={f.value}
                className="flex flex-col rounded-none border border-line/90 bg-white/90 p-5 backdrop-blur-md transition-[border-color,transform] hover:border-ink/50"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-none bg-[#bef648]" aria-hidden="true" />
                  <span className="text-[1.95rem] font-extrabold leading-none tracking-[-0.04em] text-ink">
                    {f.value}
                  </span>
                </div>
                <span className="mt-3 text-[0.98rem] font-medium leading-snug text-ink">{f.label}</span>
                <span className="mt-auto pt-3 text-[0.82rem] uppercase tracking-wider text-muted">{f.source}</span>
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
                className={`relative mt-2 h-3.5 w-3.5 rounded-none border-2 ${
                  last ? "border-ink bg-[#bef648]" : "border-green bg-card"
                }`}
              />
            </div>

            {m.photo ? (
              <div className={`grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-6 ${last ? "pb-0" : "pb-10"}`}>
                <Photo
                  src={m.photo.src}
                  alt={m.photo.alt}
                  sizes="(min-width: 640px) 220px, 90vw"
                  className="order-2 aspect-[4/3] rounded-none sm:order-none"
                />
                <div className="pt-0.5">
                  <span className="inline-flex rounded-none border border-line bg-paper px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-wider text-green">
                    {m.tag}
                  </span>
                  <h3 className="mt-2 text-[1.3rem] font-bold tracking-[-0.02em] text-ink">{m.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[1.0625rem] text-muted">{m.body}</p>
                </div>
              </div>
            ) : (
              <div className={`pt-0.5 ${last ? "pb-0" : "pb-8"}`}>
                <span className="inline-flex rounded-none border border-line bg-paper px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-wider text-green">
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
    <section id="about" className="py-12 sm:py-16">
      <div className={wrap}>
        <Reveal>
          <h2 className={`${h2} max-w-[20ch]`}>
            <span className="text-gradient-luxury">Rooted in field research</span> across Batangas and Quezon
          </h2>
        </Reveal>
        <div className="mt-8">
          <AboutTabs
            tabs={[
              { id: "mission", label: "Our mission", content: <MissionPanel text={ABOUT.mission} /> },
              { id: "vision", label: "Our vision", content: <VisionPanel text={ABOUT.vision} /> },
              {
                id: "story",
                label: "Our story",
                content: (
                  <div className="rounded-none border border-line bg-card p-5 sm:p-10">
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
    <section id="services" className="relative overflow-hidden py-12 sm:py-16">
      <div className={`${wrap} relative z-10`}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={`${h2} max-w-[14ch]`}>
            Four steps. <span className="text-gradient-luxury">One connected workflow.</span>
          </h2>
          <p className="max-w-[36rem] text-muted text-[1.0625rem] leading-relaxed">{SERVICES.body}</p>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.cards.map((c, i) => {
            const Icon = serviceIcon[c.key];
            const num = String(i + 1).padStart(2, "0");

            if (c.key === "forecast") {
              return (
                <Reveal
                  as="li"
                  key={c.key}
                  delay={i * 0.06}
                  className="relative flex flex-col overflow-hidden rounded-none border border-line bg-white p-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-2 text-[3.2rem] font-extrabold leading-none tracking-[-0.04em] text-green/10"
                  >
                    {num}
                  </span>
                  <div className="relative mb-3 h-28 overflow-hidden rounded-none border border-line">
                    <Image
                      src="/stock/tomato-harvest.jpg"
                      alt="Ripe and green tomatoes growing on the vine"
                      fill
                      sizes="(min-width: 1024px) 280px, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="inline-flex h-8 items-center gap-2 rounded-none bg-[#0b130e] px-3 text-[0.88rem] font-bold text-white">
                      <Icon className="h-4 w-4 text-[#bef648]" />
                      {c.title}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-1 flex-col rounded-none bg-paper p-4 border border-line/60">
                    <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{c.question}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </Reveal>
              );
            }

            if (c.key === "truck") {
              return (
                <Reveal
                  as="li"
                  key={c.key}
                  delay={i * 0.06}
                  className="relative flex flex-col overflow-hidden rounded-none border border-line bg-[#f4faf2] p-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-3 text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-green/12"
                  >
                    {num}
                  </span>
                  <div className="flex items-center gap-2 p-1">
                    <span className="inline-flex h-8 items-center gap-2 rounded-none bg-[#0b130e] px-3 text-[0.88rem] font-bold text-white">
                      <Icon className="h-4 w-4 text-[#bef648]" />
                      {c.title}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col rounded-none bg-white p-4 border border-line/80 lg:mt-12">
                    <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{c.question}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </Reveal>
              );
            }

            if (c.key === "buyer") {
              return (
                <Reveal
                  as="li"
                  key={c.key}
                  delay={i * 0.06}
                  className="relative flex flex-col overflow-hidden rounded-none border border-ink/20 bg-[#bef648] p-3.5 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-3 text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-ink/12"
                  >
                    {num}
                  </span>
                  <div className="flex items-center gap-2 p-1">
                    <span className="inline-flex h-8 items-center gap-2 rounded-none bg-ink px-3 text-[0.88rem] font-bold text-card">
                      <Icon className="h-4 w-4 text-[#bef648]" />
                      {c.title}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col rounded-none bg-white/80 p-4 border border-ink/10 lg:mt-12">
                    <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{c.question}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/90">{c.body}</p>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal
                as="li"
                key={c.key}
                delay={i * 0.06}
                className="relative flex flex-col overflow-hidden rounded-none border border-white/10 bg-[#0b130e] p-3.5 text-card"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-white/10"
                >
                  {num}
                </span>
                <div className="relative z-10 flex items-center gap-2 p-1">
                  <span className="inline-flex h-8 items-center gap-2 rounded-none bg-[#bef648] px-3 text-[0.88rem] font-bold text-ink">
                    <Icon className="h-4 w-4" />
                    {c.title}
                  </span>
                </div>
                <div className="relative z-10 mt-6 flex flex-1 flex-col rounded-none border border-white/10 bg-white/5 p-4 lg:mt-12">
                  <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-card">{c.question}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-[#d7e5d9]">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-6 flex items-start gap-3 text-[1rem] text-muted">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-[#0b130e] text-[#bef648]">
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
    <section id="how-it-works" className="relative overflow-hidden py-12 sm:py-16">
      <span
        aria-hidden="true"
        className="orb-ambient absolute -left-24 top-16 h-80 w-80 rounded-full opacity-70"
      />
      <div className={`${wrap} relative z-10`}>
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
    <section id="plans" className="py-12 sm:py-16">
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
    <section id="validation" className="py-12 sm:py-16">
      <div className={wrap}>
        <Reveal>
          <h2 className={`${h2} max-w-[18ch]`}>
            Tested with the people <span className="text-gradient-luxury">who live the problem</span>.
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALIDATION.cards.map((c, i) => (
            <Reveal as="li" key={c.key} delay={i * 0.06} className="flex flex-col rounded-none border border-line bg-card p-3">
              {c.photo ? (
                <Photo
                  src={c.photo.src}
                  alt={c.photo.alt}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/3] rounded-none border border-line"
                />
              ) : c.key === "farmers" ? (
                <ValidationFarmerCard />
              ) : (
                <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-none border border-white/10 bg-[#0e2a18] p-4 text-card sm:p-5">
                  <p className="relative z-10 inline-flex w-fit items-center gap-2 rounded-none border border-white/20 bg-white/10 px-3 py-1 text-[0.78rem] font-bold tracking-wider uppercase text-[#bef648]">
                    <span className="h-1.5 w-1.5 rounded-none bg-[#bef648]" aria-hidden="true" />
                    DOST-SEI Consultation
                  </p>
                  <div className="relative z-10">
                    <p className="text-[2.2rem] font-extrabold leading-none tracking-[-0.04em] text-card">
                      ₱13 <span className="text-[1rem] font-semibold text-[#C9D0C6]">/ kg</span>
                    </p>
                    <p className="mt-1 text-[0.875rem] text-[#C9D0C6]">Typical farmgate palay price</p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-1.5">
                    <span className="rounded-none bg-white/15 px-2.5 py-1 text-[0.75rem] font-bold text-card">
                      SMS-first reach
                    </span>
                    <span className="rounded-none bg-white/15 px-2.5 py-1 text-[0.75rem] font-bold text-card">
                      Coop channel
                    </span>
                  </div>
                </div>
              )}

              <div className="p-3 pt-5">
                <h3 className="text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="relative mt-4 grid gap-8 overflow-hidden rounded-none border border-white/10 bg-[#0b130e] p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
          {VALIDATION.quotes.map((q) => (
            <figure key={q.who} className="relative z-10 flex flex-col">
              <blockquote lang="fil" className="text-[1.35rem] font-medium leading-[1.4] tracking-[-0.01em] text-card sm:text-[1.6rem]">
                “{q.fil}”
              </blockquote>
              <p className="mt-3 text-[1.02rem] text-[#C9D0C6]">{q.en}</p>
              <figcaption className="mt-auto pt-5 text-[0.92rem] tracking-wider uppercase text-[#bef648]">
                {q.who}
              </figcaption>
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
    <section id="partnerships" className="relative overflow-hidden py-12 sm:py-16">
      <div className={`${wrap} relative z-10`}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={`${h2} max-w-[14ch]`}>
            Partners in <span className="text-gradient-luxury">cooperative growth</span>.
          </h2>
          <p className="max-w-[36rem] text-muted text-[1.0625rem] leading-relaxed">{PARTNERS.body}</p>
        </Reveal>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {PARTNERS.list.map((p) => (
            <li key={p.name} className="flex items-start gap-4 rounded-none border border-line bg-white/95 p-5">
              <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-none border-2 border-green bg-[#bef648]" aria-hidden="true" />
              <div>
                <h3 className="text-[1.12rem] font-bold leading-snug tracking-[-0.015em] text-ink">{p.name}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{p.why}</p>
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
  green: "border border-green/30 bg-green/10 text-green",
  ink: "bg-[#0b130e] text-card",
  accent: "bg-[#bef648] border border-ink/20 text-ink",
} as const;

function Team() {
  return (
    <section id="team" className="py-12 sm:py-16">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>
            The team behind <span className="text-gradient-luxury">CooPERA</span>.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative overflow-hidden rounded-none border border-line bg-line">
            <Photo
              src={TEAM.photo.src}
              alt={TEAM.photo.alt}
              sizes="(min-width: 1024px) 580px, 92vw"
              className="aspect-[4/3] h-full sm:aspect-[3/2] lg:aspect-auto lg:min-h-[340px] [&_img]:object-[50%_62%] rounded-none"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 pt-14">
              <p className="text-[0.95rem] font-bold text-card">{TEAM.photo.caption}</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {TEAM.members.map((m) => (
              <li
                key={m.name}
                className="flex min-w-0 flex-col justify-between rounded-none border border-line bg-card p-4 sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-none text-[0.92rem] font-bold tracking-wider ${MEMBER_TONES[m.tone]}`}
                >
                  {m.initials}
                </span>
                <div className="mt-4 min-w-0">
                  <h3 className="text-[1.02rem] font-bold leading-snug tracking-[-0.015em] text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[0.85rem] text-muted">{m.subtitle}</p>
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
    <section id="contact" className="relative overflow-hidden pb-12 pt-12 sm:pt-16">
      <div className={`${wrap} relative z-10`}>
        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <h2 className="max-w-[14ch] text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold tracking-[-0.035em] text-ink">
              Ready to <span className="text-gradient-luxury">start a pilot</span>?
            </h2>
            <p className="mt-5 max-w-[34rem] text-[1.08rem] leading-relaxed text-muted">{CONTACT.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CONTACT.pills.map((pill) => (
                <li
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-none border border-line bg-white/95 px-3.5 py-1.5 text-[0.84rem] font-bold uppercase tracking-wider text-ink backdrop-blur-sm"
                >
                  <span className="h-2 w-2 rounded-none bg-green" aria-hidden="true" />
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
    <footer className="pb-8">
      <div className={wrap}>
        <div className="cv-art relative h-[180px] overflow-hidden rounded-none border border-line sm:h-[260px] lg:h-[320px]">
          <TerrainBanner3D />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d2415]/85 via-[#0d2415]/25 to-transparent"
          />
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.18em] left-3 text-[clamp(4.5rem,19vw,17rem)] font-extrabold leading-none tracking-[-0.06em] sm:left-6"
          >
            <span className="text-white">Coo</span>
            <span className="text-gradient-lime">PERA</span>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-line/60 pt-6">
          <Logo />
          <p className="text-[0.92rem] uppercase tracking-wider text-muted">{FOOTER}</p>
        </div>
      </div>
    </footer>
  );
}
