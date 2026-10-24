import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CALENDLY_URL, OG_IMAGE, COMPANY_LINKEDIN } from "@/lib/site";

const CONTACT_TITLE = "Contact Prisma House — Book a 30-minute call";
const CONTACT_DESCRIPTION =
  "Tell us what you're trying to run, sell or replace. Book a 30-minute call or send a message about a custom CRM, a business system, a website or marketing strategy. We reply within one working day.";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    url: "/contact",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-24 h-[22rem] w-[22rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #E14ECA, #7C5CFF)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-16 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              Let&rsquo;s talk about{" "}
              <span className="text-prism">what&rsquo;s next.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Whether you have a spec ready or a business held together by
              spreadsheets, we&rsquo;d like to hear it. Write to us, or book a
              call directly.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href={COMPANY_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              Follow us on LinkedIn
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-shell gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <div>
              <h2 className="display-lg">Send a message</h2>
              <p className="mt-4 text-bone-dim">
                Tell us where you are and where you&rsquo;re trying to get to.
                We read every message personally and reply within one working
                day.
              </p>
              <div className="mt-10">
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h2 className="display-lg">Or book a call directly</h2>
              <p className="mt-4 text-bone-dim">
                Thirty minutes, no pitch, no obligation: a straight
                conversation about what you need to build.
              </p>
              <div className="mt-10">
                <CalendlyEmbed url={CALENDLY_URL} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
