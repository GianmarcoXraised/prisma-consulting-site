import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a call or send us a message. Prisma Consulting works with ambitious brands across the UK and USA — we reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Prisma Consulting",
    description:
      "Book a call or send us a message. We reply within one working day.",
    url: "/contact",
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
              Whether you have a brief ready or just a hunch that your
              marketing could be working harder, we&rsquo;d like to hear it.
              Write to us, or go straight to the diary and book a call.
            </p>
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
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h2 className="display-lg">Or book a call directly</h2>
              <p className="mt-4 text-bone-dim">
                Thirty minutes with Gianmarco. No pitch, no obligation — just a
                straight conversation about your growth.
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
