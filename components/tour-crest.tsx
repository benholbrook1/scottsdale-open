import { cn } from "@/lib/utils";

export function TourCrest({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("tour-crest inline-block shrink-0 bg-current", className)}
    >
      <img
        src="/tour-golfer.png"
        alt=""
        className="block h-full w-auto opacity-0"
      />
    </span>
  );
}
