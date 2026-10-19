/**
 * Animated gradient mesh behind the whole page: three blurred blobs that
 * drift slowly. Sits at -z inside the isolated page wrapper so it paints
 * above the canvas colour and below every section. Static under
 * prefers-reduced-motion (the keyframes are disabled globally).
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="aurora-blob absolute -top-[10%] left-[5%] h-[55vh] w-[55vw] rounded-full bg-accent/15 dark:bg-accent/20 blur-[140px]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora-blob absolute top-[35%] -right-[10%] h-[50vh] w-[45vw] rounded-full bg-accent-2/10 dark:bg-accent-2/15 blur-[150px]"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="aurora-blob absolute -bottom-[15%] left-[25%] h-[50vh] w-[50vw] rounded-full bg-accent/10 dark:bg-accent/15 blur-[160px]"
        style={{ animationDelay: "-16s" }}
      />
    </div>
  );
}
