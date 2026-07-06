"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-ink-line bg-ink-card px-4 py-3.5 text-sm text-bone placeholder:text-bone-faint outline-none transition-colors duration-300 focus:border-prism-violet";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = "Please tell us your name.";
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!data.message?.trim() || data.message.trim().length < 10) {
      errors.message = "Please give us a little more detail (10+ characters).";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-ink-line bg-ink-card p-10 text-center"
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-prism-violet to-prism-cyan">
          <svg
            className="h-6 w-6 text-ink"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-bone">
          Message received.
        </h3>
        <p className="mt-3 max-w-sm text-sm text-bone-dim">
          Thank you for getting in touch. We read every message personally and
          will reply within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-bone-dim"
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClasses}
            aria-invalid={!!fieldErrors.name}
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs text-prism-magenta">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-bone-dim"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClasses}
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-prism-magenta">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-bone-dim"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company Ltd"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-bone-dim"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your goals, your timeline, and what's getting in the way."
          className={`${inputClasses} resize-y`}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-prism-magenta">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          className="rounded-xl border border-prism-magenta/40 bg-prism-magenta/10 px-4 py-3 text-sm text-bone"
          role="alert"
        >
          {errorMsg}{" "}
          <span className="text-bone-dim">
            You can also email us directly at info@prisma-house.com.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative w-full overflow-hidden rounded-full bg-bone px-7 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-bone">
          {status === "sending" ? "Sending…" : "Send message"}
        </span>
        <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-prism-violet via-prism-magenta to-prism-amber transition-transform duration-300 group-hover:translate-y-0" />
      </button>
    </form>
  );
}
