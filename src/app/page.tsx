import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { HeroVisual } from "@/components/HeroVisual";
import { PickupMap } from "@/components/PickupMap";
import { AboutTabs } from "@/components/AboutTabs";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { FieldBanner } from "@/components/FieldArt";
import { IconArrow, IconMessage, serviceIcon } from "@/components/Icons";
import {
  ABOUT,
  CONTACT,
  FACEBOOK_URL,
  FOOTER,
  HERO,
  HOW,
  LINKEDIN_URL,
  PARTNERS,
  PLANS,
  SERVICES,
  STORY,
  TEAM,
  TEAM_EMAIL,
  VALIDATION,
} from "@/content";

const wrap = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const h2 = "text-[clamp(2.1rem,4.4vw,3.6rem)] font-bold text-ink";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-yellow focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
    primary: "bg-yellow text-ink shadow-[0_10px_24px_-10px_rgb(20_26_22/0.55)] hover:bg-[#ffdb4d]",
    secondary: "border border-line bg-card text-ink hover:border-ink/40",
    dark: "bg-ink text-card hover:bg-ink-2",
  }[variant];
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-[1rem] font-bold transition-colors ${styles}`}
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
        <div className="overflow-hidden rounded-[28px] border border-line bg-card px-5 pb-6 pt-10 sm:rounded-[36px] sm:px-10 sm:pb-10 lg:px-14 lg:pt-14">
          <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-2 pr-4 text-[0.875rem] font-medium text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-green" aria-hidden="true" />
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

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:mt-4">
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

function BannerPanel({ label, text, variant }: { label: string; text: string; variant: "terrace" | "paddy" }) {
  return (
    <div className="relative">
      <div className="cv-art h-[220px] overflow-hidden rounded-[28px] sm:h-[340px] lg:h-[420px]">
        <FieldBanner id={`banner-${variant}`} variant={variant} />
      </div>
      <div className="relative -mt-16 mx-3 rounded-[24px] bg-card p-6 shadow-soft sm:mx-6 sm:p-8 lg:absolute lg:bottom-8 lg:left-8 lg:mx-0 lg:mt-0 lg:max-w-[600px]">
        <p className="text-[0.95rem] font-bold text-green">{label}</p>
        <p className="mt-3 text-[1.25rem] font-medium leading-[1.45] tracking-[-0.01em] text-ink sm:text-[1.45rem]">{text}</p>
      </div>
    </div>
  );
}

function Story() {
  return (
    <ol className="relative">
      {STORY.map((m, i) => {
        const last = i === STORY.length - 1;
        return (
          <li key={m.title} className="relative grid grid-cols-[28px_1fr] gap-x-4 sm:gap-x-6">
            {/* rail */}
            <div className="relative flex justify-center" aria-hidden="true">
              {!last && <span className="absolute top-7 bottom-0 w-px bg-line" />}
              <span
                className={`relative mt-2 h-4 w-4 rounded-full border-[3px] ${
                  last ? "border-ink bg-yellow" : m.placeholder ? "border-line bg-card" : "border-green bg-card"
                }`}
              />
            </div>
            <div className={`grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-6 ${last ? "pb-0" : "pb-10"}`}>
              <Photo
                src={m.photo.src}
                expects={m.photo.expects}
                alt={m.photo.alt}
                sizes="(min-width: 640px) 200px, 90vw"
                className="order-2 h-28 rounded-xl sm:order-none sm:h-auto sm:aspect-[4/3] sm:rounded-2xl"
              />
              <div className="pt-0.5">
                {m.placeholder ? (
                  <p className="inline-block rounded-lg border border-dashed border-muted/50 px-3 py-1.5 text-[1rem] font-medium text-muted">
                    {m.title}
                  </p>
                ) : (
                  <>
                    <h3 className="text-[1.3rem] font-bold tracking-[-0.02em] text-ink">{m.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-[1.0625rem] text-muted">{m.body}</p>
                  </>
                )}
              </div>
            </div>
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
              { id: "mission", label: "Our mission", content: <BannerPanel label="Our mission" text={ABOUT.mission} variant="terrace" /> },
              { id: "vision", label: "Our vision", content: <BannerPanel label="Our vision" text={ABOUT.vision} variant="paddy" /> },
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
                  <span className="inline-flex h-9 items-center gap-2 rounded-xl bg-yellow px-3 text-[0.95rem] font-bold text-ink">
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
        <Reveal className="mt-10">
          <PickupMap />
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Manager */}
          <Reveal className="flex flex-col rounded-[28px] border border-line bg-card p-4 sm:p-5">
            <p className="rounded-2xl border border-line bg-paper py-3 text-center text-[1.05rem] font-bold text-ink">
              {HOW.manager.title}
            </p>
            <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line">
              {HOW.manager.stats.map((s) => (
                <div key={s.value} className="flex flex-col-reverse px-3 py-4 text-center sm:px-4">
                  <dt className="mt-1 text-[0.95rem] text-muted">{s.label}</dt>
                  <dd className="text-[1.15rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.35rem]">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-1 flex-col justify-between gap-4 rounded-2xl bg-paper p-4 sm:flex-row sm:items-center">
              <p className="text-[1.05rem] text-ink">
                Buyer offer:{" "}
                <span className="ml-1 inline-block rounded-lg bg-yellow px-2.5 py-1 font-bold">₱30 per kg</span>
              </p>
              <span className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-xl bg-ink px-5 font-bold text-card">
                {HOW.manager.action}
              </span>
            </div>
          </Reveal>

          {/* Farmer */}
          <Reveal delay={0.06} className="flex flex-col rounded-[28px] border border-line bg-card p-4 sm:p-5">
            <p className="rounded-2xl border border-line bg-paper py-3 text-center text-[1.05rem] font-bold text-ink">
              {HOW.farmer.title} ({HOW.farmer.name})
            </p>
            <dl className="mt-4 rounded-2xl border border-line px-4">
              {HOW.farmer.lines.map((l, i) => (
                <div key={l.label} className={`flex items-baseline justify-between gap-4 py-3 ${i ? "border-t border-dashed border-line" : ""}`}>
                  <dt className="text-[1.05rem] text-muted">{l.label}</dt>
                  <dd className="text-[1.05rem] font-bold tabular-nums text-ink">{l.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-1 flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink p-4 text-card">
              <p className="text-[1.05rem]">
                He receives{" "}
                <span className="ml-1 inline-block rounded-lg bg-yellow px-2.5 py-1 text-[1.35rem] font-extrabold tracking-[-0.02em] text-ink">
                  {HOW.farmer.total}
                </span>
              </p>
              <p className="inline-flex items-center gap-2 text-[1rem] text-[#D7DCD4]">
                <IconMessage className="h-4 w-4 text-mint" /> with a text receipt.
              </p>
            </div>
          </Reveal>
        </div>
        <p className="mt-4 max-w-[70ch] text-[0.95rem] text-muted">{HOW.farmer.caption}</p>
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

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.cards.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 0.06}
              className={`flex flex-col rounded-[28px] p-6 sm:p-8 ${
                p.highlight ? "bg-ink text-card shadow-soft" : "border border-line bg-card text-ink"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.5rem] font-bold">{p.name}</h3>
                {p.highlight && (
                  <span className="rounded-lg bg-yellow px-2.5 py-1 text-[0.85rem] font-bold text-ink">All four</span>
                )}
              </div>
              <p className={`mb-10 mt-3 text-[1.0625rem] ${p.highlight ? "text-[#D7DCD4]" : "text-muted"}`}>{p.body}</p>
              <div className={`mt-auto border-t pt-6 ${p.highlight ? "border-white/15" : "border-line"}`}>
                <p className="text-[1.6rem] font-extrabold tracking-[-0.02em]">{PLANS.price}</p>
                <p className={`mt-1 text-[0.95rem] ${p.highlight ? "text-mint" : "text-green"}`}>{PLANS.priceNote}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-line bg-card p-6 sm:p-8">
            <h3 className="text-[1.2rem] font-bold">{PLANS.tripFee.title}</h3>
            <p className="mt-4 text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-0.04em]">8–12%</p>
            <p className="mt-3 text-muted">of the pooled freight, about ₱1,120–₱1,680 on a ₱14,000 truck.</p>
          </div>
          <div className="flex flex-col rounded-[28px] bg-yellow p-6 text-ink sm:p-8">
            <h3 className="text-[1.2rem] font-bold">{PLANS.pilot.title}</h3>
            <p className="mt-4 max-w-[22ch] text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              {PLANS.pilot.body}
            </p>
            <div className="mt-6">
              <Button href="#contact" variant="dark">
                {PLANS.pilot.cta} <IconArrow />
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-[70ch] text-[1rem] text-muted">{PLANS.line}</p>
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
            <Reveal as="li" key={c.title} delay={i * 0.06} className="flex flex-col rounded-[24px] border border-line bg-card p-3">
              <Photo
                src={c.photo.src}
                expects={c.photo.expects}
                alt={c.photo.alt}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                className="aspect-[4/3] rounded-[18px]"
              />
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

function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>{TEAM.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <Photo
            src={TEAM.photo.src}
            expects="team.jpg"
            alt={TEAM.photo.alt}
            sizes="(min-width: 1024px) 560px, 92vw"
            className="aspect-[4/3] rounded-[28px] sm:aspect-[3/2] lg:aspect-auto lg:min-h-full [&_img]:object-[50%_62%]"
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TEAM.members.map((m) => (
              <li key={m.name} className="flex flex-col rounded-[22px] border border-line bg-card p-2.5">
                <Photo
                  src={null}
                  expects={m.file}
                  alt=""
                  sizes="200px"
                  className="aspect-square rounded-[16px] [&>span]:text-[0.7rem]"
                />
                <div className="px-1.5 pb-1.5 pt-3">
                  <h3 className="text-[1.02rem] font-bold leading-snug tracking-[-0.015em]">{m.name}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-muted">[role]</p>
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
        <div className="grid gap-8 border-t border-line pt-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-bold text-ink">{CONTACT.heading}</h2>
          </Reveal>
          <div>
            <p className="max-w-[34rem] text-muted">{CONTACT.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${TEAM_EMAIL}`}>
                {CONTACT.cta} <IconArrow />
              </Button>
              <span className="inline-flex h-12 items-center rounded-xl border border-dashed border-muted/50 px-4 font-medium text-muted">
                {FACEBOOK_URL}
              </span>
              <span className="inline-flex h-12 items-center rounded-xl border border-dashed border-muted/50 px-4 font-medium text-muted">
                {LINKEDIN_URL}
              </span>
            </div>
          </div>
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
        <div className="cv-art relative h-[180px] overflow-hidden rounded-[28px] sm:h-[260px] lg:h-[320px]">
          <FieldBanner id="footer-banner" variant="terrace" />
          <p
            aria-hidden="true"
            className="absolute -bottom-[0.18em] left-3 text-[clamp(4.5rem,19vw,17rem)] font-extrabold leading-none tracking-[-0.06em] sm:left-6"
          >
            <span className="text-card">Coo</span>
            <span className="text-yellow">PERA</span>
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
