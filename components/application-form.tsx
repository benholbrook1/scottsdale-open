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

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [last, setLast] = useState<FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

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
        throw new Error(payload.error ?? "The tour desk declined this letter.");
      }

      setLast(form);
      setSent(true);
      setForm(empty);
      toast.success(
        payload.emailed
          ? "Letter received. The Commissioner has been notified."
          : "Letter filed with the tour desk."
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not file the application. Try again in a minute."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-[color:var(--pine)]/20 bg-card p-8 text-center shadow-sm">
        <p className="font-heading text-3xl">Letter received</p>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The Commissioner will read it when he is done pretending to work on
          his putting. If you are admitted, you will hear by group chat.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {mailtoHref ? (
            <Button nativeButton={false} render={<a href={mailtoHref} />} size="lg">
              Also send from your email
            </Button>
          ) : null}
          <Button variant="outline" onClick={() => setSent(false)}>
            File another letter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="As it should appear on a bag tag"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="Where we send the bad news"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="handicap">Handicap index (optional)</Label>
        <Input
          id="handicap"
          value={form.handicap}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              handicap: event.target.value,
            }))
          }
          placeholder="Honesty is a selection criterion"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="letter">Letter of application</Label>
        <Textarea
          id="letter"
          required
          minLength={80}
          value={form.letter}
          onChange={(event) =>
            setForm((current) => ({ ...current, letter: event.target.value }))
          }
          placeholder="Dear Commissioner, I wish to join the Scottsdale Tour because..."
          className="min-h-48 font-serif"
        />
        <p className="text-xs text-muted-foreground">
          Minimum 80 characters. Make it a real letter. Résumés, swing thoughts,
          and excuses for last summer&apos;s 94 are all admissible evidence.
        </p>
      </div>
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Submitting to the desk…" : "Submit letter"}
      </Button>
    </form>
  );
}
