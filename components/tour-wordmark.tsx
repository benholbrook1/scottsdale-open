import { EstablishedMark } from "@/components/established-mark";
import { cn } from "@/lib/utils";

export function TourWordmark({
  size = "sm",
  established = false,
  className,
}: {
  size?: "sm" | "lg";
  established?: boolean;
  className?: string;
}) {
  const large = size === "lg";

  return (
    <span className={cn("flex flex-col items-start leading-none", className)}>
      <span
        className={cn(
          "font-heading",
          large ? "text-3xl sm:text-4xl" : "text-[13px] tracking-[0.08em]"
        )}
      >
        The
      </span>
      <span
        className={cn(
          "font-script",
          large
            ? "mt-1 text-6xl leading-[0.9] sm:text-8xl"
            : "text-[1.7rem] leading-none"
        )}
      >
        Scottsdale
      </span>
      <span
        className={cn(
          "font-heading",
          large ? "mt-1 text-3xl sm:text-4xl" : "mt-0.5 text-[13px] tracking-[0.08em]"
        )}
      >
        Tour
      </span>
      {established ? (
        <EstablishedMark className="mt-1.5 text-[color:var(--crest-gold)]" />
      ) : null}
    </span>
  );
}
