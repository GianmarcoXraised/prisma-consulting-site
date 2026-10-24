import Link from "next/link";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { ButtonPrimary, ButtonGhost } from "./Button";
import { NAV_LINKS, SITE_DESCRIPTION, COMPANY_LINKEDIN } from "@/lib/site";

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
              Let&rsquo;s build the system{" "}
              <span className="text-prism">your business runs on.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-bone-dim">
              A 30-minute call. Tell us what you&rsquo;re trying to run, sell
              or replace, and we&rsquo;ll tell you honestly whether it&rsquo;s
              a website, a system, or both.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonPrimary href="/contact?need=full-system">
                Build the whole system
              </ButtonPrimary>
              <ButtonGhost href="/contact?need=system">
                I need a CRM or system
              </ButtonGhost>
              <ButtonGhost href="/contact?need=website">
                I need a website
              </ButtonGhost>
            </div>
            <p className="mt-6 text-sm text-bone-dim">
              <Link
                href="/marketing-consulting"
                className="underline decoration-ink-line underline-offset-4 transition-colors hover:text-bone hover:decoration-prism-violet"
              >
                Looking for marketing strategy? Start here
              </Link>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-ink-line">
        <div className="mx-auto grid max-w-shell gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
              {SITE_DESCRIPTION}
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
                  href="mailto:info@prisma-house.com"
                  className="transition-colors hover:text-bone"
                >
                  info@prisma-house.com
                </a>
              </li>
              <li>
                London, UK
                <br />
                Rome, Italy
              </li>
            </ul>
            <a
              href={COMPANY_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prisma House on LinkedIn"
              className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-bone-dim transition-all duration-300 hover:border-prism-violet hover:text-prism-violet"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-bone-faint md:flex-row lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} Prisma House. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Bottom prism beam */}
      <div className="beam h-px w-full" aria-hidden="true" />
    </footer>
  );
}
