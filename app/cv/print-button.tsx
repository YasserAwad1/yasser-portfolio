"use client";

import { Printer } from "lucide-react";

/** Opens the browser print dialog — "Save as PDF" gives a downloadable CV. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-ink hover:border-ink hover:text-accent transition-colors"
    >
      <Printer size={14} aria-hidden="true" />
      Print / save as PDF
    </button>
  );
}
