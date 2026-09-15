"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { tour } from "@/lib/tour";

type FormState = {
  name: string;
  email: string;
  handicap: string;
  letter: string;
};

const empty: FormState = {
  name: "",
  email: "",
  handicap: "",
  letter: "",
};

const minLetterLength = 80;

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [last, setLast] = useState<FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const letterLength = form.letter.trim().length;

  const mailtoHref = useMemo(() => {
    if (!last) return null;
    const subject = `Scottsdale Tour application — ${last.name}`;
    const body = [
      `Name: ${last.name}`,
      `Email: ${last.email}`,
      `Handicap: ${last.handicap || "Not given"}`,
      "",
      last.letter,
    ].join("\n");
    return `mailto:${tour.inboxEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [last]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        emailed?: boolean;
      };

      if (!response.ok) {
        throw new Error(
          payload.error ?? "The application could not be submitted."
        );
      }

      setLast(form);
      setSent(true);
      setForm(empty);
      toast.success(
        payload.emailed
          ? "Application received. The Commissioner has been notified."
          : "Application received."
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "The application could not be submitted. Please try again shortly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="py-6 text-center sm:py-10">
        <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
          Tour desk
        </p>
        <p className="mt-2 font-heading text-3xl">Application received</p>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thank you. Your letter has been filed with the Commissioner. If a
          place in the field is offered, you will hear at the email address you
          provided.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {mailtoHref ? (
            <Button nativeButton={false} render={<a href={mailtoHref} />} size="lg">
              Send a copy from your email
            </Button>
          ) : null}
          <Button variant="outline" onClick={() => setSent(false)}>
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl">Application</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Required fields must be completed before the application can be filed.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="First and last name"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="name@example.com"
            className="h-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="handicap">Handicap index</Label>
        <Input
          id="handicap"
          value={form.handicap}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              handicap: event.target.value,
            }))
          }
          placeholder="Optional"
          className="h-10"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="letter">Letter of application</Label>
        <Textarea
          id="letter"
          required
          minLength={minLetterLength}
          value={form.letter}
          onChange={(event) =>
            setForm((current) => ({ ...current, letter: event.target.value }))
          }
          placeholder="Playing background, competitive record, and why you are seeking a place in the field."
          className="min-h-52 font-serif"
        />
        <p className="text-xs text-muted-foreground">
          Minimum {minLetterLength} characters. {letterLength} entered.
        </p>
      </div>
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
