import Link from "next/link";
import { ButtonPrimary } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display-xl max-w-2xl">
        This page refracted into <span className="text-prism">nothing.</span>
      </h1>
      <p className="mt-6 max-w-md text-bone-dim">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        Let&rsquo;s get you back on course.
      </p>
      <div className="mt-10 flex items-center gap-6">
        <ButtonPrimary href="/">Back to home</ButtonPrimary>
        <Link
          href="/contact"
          className="text-sm font-semibold text-bone-dim transition-colors hover:text-bone"
        >
          Or contact us
        </Link>
      </div>
    </section>
  );
}
