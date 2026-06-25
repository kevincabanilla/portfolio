export default function SectionLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 min-h-[30vh]"
      role="status"
      aria-live="polite"
      aria-label="Loading Content"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />

        <div className="relative h-10 w-10 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
      </div>

      <p className="text-sm text-secondary/60 mt-3">Loading...</p>
    </div>
  );
}
