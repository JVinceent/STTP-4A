"use client";

import { useId, useState, type FormEvent } from "react";
import { IconArrow, IconCheck } from "./Icons";
import { CONTACT } from "@/content";

const ROLES = [
  "Pilot cooperative",
  "Buyer / KADIWA",
  "Mentor / Advisor",
] as const;

type RoleOption = (typeof ROLES)[number];

type Errors = {
  name?: string;
  organization?: string;
  contact?: string;
};

type SubmittedData = {
  name: string;
  organization: string;
  contact: string;
  role: RoleOption;
  message: string;
};

function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function ContactForm() {
  const baseId = useId();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState<RoleOption>("Pilot cooperative");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);
  const [copied, setCopied] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!organization.trim()) {
      next.organization = "Please enter your cooperative or organization.";
    }
    if (!contact.trim()) {
      next.contact = "Please enter an email address or mobile number.";
    } else if (!isValidContact(contact)) {
      next.contact = "Enter a valid email (e.g. name@coop.ph) or mobile number.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted({
      name: name.trim(),
      organization: organization.trim(),
      contact: contact.trim(),
      role,
      message: message.trim(),
    });
    setCopied(false);
  }

  async function handleCopy() {
    if (!submitted) return;
    const summary = [
      "CooPERA Pilot Inquiry",
      `Inquiry type: ${submitted.role}`,
      `Name: ${submitted.name}`,
      `Cooperative / Organization: ${submitted.organization}`,
      `Contact: ${submitted.contact}`,
      submitted.message ? `Message: ${submitted.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function handleReset() {
    setSubmitted(null);
    setCopied(false);
    setName("");
    setOrganization("");
    setContact("");
    setRole("Pilot cooperative");
    setMessage("");
    setErrors({});
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[28px] border border-line bg-card p-6 shadow-soft sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-white">
            <IconCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[1.25rem] font-bold tracking-[-0.02em] text-ink">
              Pilot inquiry prepared
            </p>
            <p className="text-[0.95rem] text-muted">
              Ready to share with the Kape &amp; Paste team.
            </p>
          </div>
        </div>

        <dl className="mt-6 space-y-2.5 rounded-2xl border border-line bg-paper/70 p-4 text-[0.95rem]">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Inquiry type</dt>
            <dd className="font-bold text-ink">{submitted.role}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-dashed border-line pt-2.5">
            <dt className="text-muted">Name</dt>
            <dd className="font-bold text-ink">{submitted.name}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-dashed border-line pt-2.5">
            <dt className="text-muted">Organization</dt>
            <dd className="font-bold text-ink">{submitted.organization}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-dashed border-line pt-2.5">
            <dt className="text-muted">Contact</dt>
            <dd className="font-bold text-ink">{submitted.contact}</dd>
          </div>
          {submitted.message && (
            <div className="border-t border-dashed border-line pt-2.5">
              <dt className="text-muted">Message</dt>
              <dd className="mt-1 text-ink">{submitted.message}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[1rem] font-bold text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.98]"
          >
            {copied ? (
              <>
                <IconCheck className="h-4 w-4" />
                Copied details
              </>
            ) : (
              "Copy inquiry details"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-paper px-5 text-[1rem] font-bold text-ink transition-[border-color,transform] duration-150 hover:border-ink/40 active:scale-[0.98]"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-line bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="space-y-5">
        <fieldset>
          <legend className="block text-[0.95rem] font-bold text-ink">
            Inquiry type
          </legend>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {ROLES.map((option) => {
              const selected = role === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setRole(option)}
                  className={`flex min-h-11 items-center justify-center rounded-xl border px-3 py-2 text-center text-[0.9rem] font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                    selected
                      ? "border-ink bg-ink text-card"
                      : "border-line bg-paper text-ink hover:border-ink/40"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor={`${baseId}-name`}
            className="block text-[0.95rem] font-bold text-ink"
          >
            Your name
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
            placeholder="e.g. Maria Santos"
            className="mt-1.5 block h-12 w-full rounded-xl border border-line bg-paper px-4 text-[1rem] text-ink placeholder:text-muted/70 focus-visible:border-green"
          />
          {errors.name && (
            <p
              id={`${baseId}-name-error`}
              className="mt-1.5 text-[0.875rem] font-medium text-accent-text"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-org`}
            className="block text-[0.95rem] font-bold text-ink"
          >
            Cooperative or organization
          </label>
          <input
            id={`${baseId}-org`}
            name="organization"
            type="text"
            autoComplete="organization"
            required
            value={organization}
            onChange={(e) => {
              setOrganization(e.target.value);
              if (errors.organization) {
                setErrors((prev) => ({ ...prev, organization: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? `${baseId}-org-error` : undefined}
            placeholder="e.g. San Pedro MPC or KADIWA Region IV-A"
            className="mt-1.5 block h-12 w-full rounded-xl border border-line bg-paper px-4 text-[1rem] text-ink placeholder:text-muted/70 focus-visible:border-green"
          />
          {errors.organization && (
            <p
              id={`${baseId}-org-error`}
              className="mt-1.5 text-[0.875rem] font-medium text-accent-text"
            >
              {errors.organization}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-contact`}
            className="block text-[0.95rem] font-bold text-ink"
          >
            Email or mobile number
          </label>
          <input
            id={`${baseId}-contact`}
            name="contact"
            type="text"
            required
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              if (errors.contact) {
                setErrors((prev) => ({ ...prev, contact: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? `${baseId}-contact-error` : undefined}
            placeholder="e.g. manager@coop.ph or 0917 000 0000"
            className="mt-1.5 block h-12 w-full rounded-xl border border-line bg-paper px-4 text-[1rem] text-ink placeholder:text-muted/70 focus-visible:border-green"
          />
          {errors.contact && (
            <p
              id={`${baseId}-contact-error`}
              className="mt-1.5 text-[0.875rem] font-medium text-accent-text"
            >
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-message`}
            className="block text-[0.95rem] font-bold text-ink"
          >
            Crop, season, or notes <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id={`${baseId}-message`}
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what crop or harvest window you would like to pilot."
            className="mt-1.5 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1rem] text-ink placeholder:text-muted/70 focus-visible:border-green"
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[1rem] font-bold text-ink shadow-[0_10px_24px_-10px_rgb(20_26_22/0.55)] transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.98] sm:w-auto"
        >
          {CONTACT.cta} <IconArrow />
        </button>
      </div>
    </form>
  );
}
