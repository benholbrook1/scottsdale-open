import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";
import { tour } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Apply for a place in the Scottsdale Tour field. Applications are reviewed by the Commissioner.",
};

const steps = [
  {
    title: "Submit an application",
    body: "Provide your details and a written statement of interest addressed to the Commissioner.",
  },
  {
    title: "Commissioner review",
    body: "Every application is read in full. The field is kept small, and admission is not automatic.",
  },
  {
    title: "Decision",
    body: "If a place is offered, you will be contacted at the email address you provide.",
  },
];

export default function ApplyPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[color:var(--pine)] text-[color:var(--cream)]">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_top,oklch(0.72_0.08_85)_0,transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-[color:var(--crest-gold)] uppercase">
            Membership · {tour.year}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.95] sm:text-6xl">
            Apply to the field
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--cream)]/80">
            Admission to {tour.name} is by written application. The standard is
            high, the field is small, and selection rests with the Commissioner.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <aside className="lg:col-span-2">
            <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
              How selection works
            </p>
            <h2 className="mt-2 font-heading text-3xl">
              A place in the field is earned
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tell us who you are, the standard of your game, and why you belong
              in this championship. Letters should be considered, not hurried.
            </p>
            <ol className="mt-8 space-y-6">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-heading text-2xl text-[color:var(--crest-gold-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-8 lg:col-span-3">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
