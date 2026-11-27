"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/content/i18n";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

const labels: Record<Locale, Record<Theme, string>> = {
  fr: { dark: "Passer en mode sombre", light: "Passer en mode clair" },
  en: { dark: "Switch to dark mode", light: "Switch to light mode" },
  nl: {
    dark: "Overschakelen naar donkere modus",
    light: "Overschakelen naar lichte modus",
  },
};

const listeners = new Set<() => void>();
const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
};
const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export function ThemeToggle({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  // The server cannot know the visitor's theme: render "light" there and
  // let the inline head script plus this store correct it on the client.
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light");
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={className}
      aria-label={labels[locale][next]}
      title={labels[locale][next]}
      aria-pressed={theme === "dark"}
      data-theme-toggle=""
      onClick={() => {
        const root = document.documentElement;
        root.dataset.theme = next;
        root.style.colorScheme = next;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          // Private browsing can refuse storage: the choice still applies to this page.
        }
        listeners.forEach((listener) => listener());
      }}
    >
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <circle
          cx="10"
          cy="10"
          r="7.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
