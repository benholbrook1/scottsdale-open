import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Apply to the Scottsdale Tour with a written letter to the Commissioner.",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
        Membership
      </p>
      <h1 className="mt-2 font-heading text-5xl">Applications</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        The Scottsdale Tour does not take phone calls, DMs, or &ldquo;I&apos;ll
        just show up.&rdquo; Write a letter. Say who you are, why the field
        should let you in, and what you intend to do with a round in Guelph.
        Letters are filed with the tour desk and forwarded to the Commissioner.
      </p>
      <div className="mt-10 rounded-xl border bg-card p-5 shadow-sm sm:p-8">
        <ApplicationForm />
      </div>
    </div>
  );
}
