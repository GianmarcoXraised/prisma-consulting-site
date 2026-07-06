import Link from "next/link";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { ButtonPrimary } from "./Button";
import { NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line">
      {/* Big CTA */}
      <div className="relative">
        <div
          className="prism-orb left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 120deg, #7C5CFF, #E14ECA, #FFB347, #4ED9E1, #7C5CFF)",
          }}
        />
        <div className="mx-auto max-w-shell px-6 py-28 text-center md:py-40 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Ready when you are</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mx-auto max-w-4xl">
              Let&rsquo;s make your marketing{" "}
              <span className="text-prism">impossible to ignore.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-bone-dim">
              A 30-minute call. No pitch deck, no pressure — just a straight
              conversation about where your growth is hiding.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <ButtonPrimary href="/contact">Book a call</ButtonPrimary>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-ink-line">
        <div className="mx-auto grid max-w-shell gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
              A UK-based marketing consultancy for ambitious brands in the UK
              and USA. Strategy first, vanity metrics never.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-5">Get in touch</p>
            <ul className="space-y-3 text-sm text-bone-dim">
              <li>
                <a
                  href="mailto:hello@prismaconsulting.co.uk"
                  className="transition-colors hover:text-bone"
                >
                  hello@prismaconsulting.co.uk
                </a>
              </li>
              <li>London, United Kingdom</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-bone-faint md:flex-row lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} Prisma Consulting Ltd. All rights
            reserved.
          </p>
          <p>Registered in England &amp; Wales.</p>
        </div>
      </div>

      {/* Bottom prism beam */}
      <div className="beam h-px w-full" aria-hidden="true" />
    </footer>
  );
}
