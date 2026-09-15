import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
        Out of bounds
      </p>
      <h1 className="mt-3 font-heading text-5xl">This hole does not exist</h1>
      <p className="mt-4 text-muted-foreground">
        Take a drop, add a stroke, and return to the clubhouse.
      </p>
      <Button nativeButton={false} render={<Link href="/" />} className="mt-8">
        Back to the Open
      </Button>
    </div>
  );
}
