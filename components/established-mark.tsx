import { tour } from "@/lib/tour";
import { cn } from "@/lib/utils";

export function EstablishedMark({
  year = tour.year,
  className,
}: {
  year?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.28em] uppercase",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-2.5 bg-current opacity-70" />
      Est. {year}
      <span aria-hidden="true" className="h-px w-2.5 bg-current opacity-70" />
    </span>
  );
}
