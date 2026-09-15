export function TourCrest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path
        d="M32 50V22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M32 14.5 48 22.5 32 22.5Z" fill="currentColor" />
      <path
        d="M18 48.5c4.2-3.2 9-5 14-5s9.8 1.8 14 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
