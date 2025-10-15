import en from "./locales/en.json";
import ar from "./locales/ar.json";
import type { AvailableLocale } from "./config";

const dictionaries: Record<AvailableLocale, Record<string, unknown>> = {
  en,
  ar,
};

function getByPath(object: Record<string, unknown>, path: string): unknown {
  return path
    .split(".")
    .reduce(
      (acc: Record<string, unknown> | undefined, key: string) =>
        acc && acc[key] !== undefined
          ? (acc[key] as Record<string, unknown>)
          : undefined,
      object
    );
}

export function translate(
  locale: AvailableLocale,
  key: string,
  fallback?: string
): string {
  const dict = dictionaries[locale] ?? dictionaries.en;
  const value = getByPath(dict, key);
  if (typeof value === "string") {
    return value;
  }
  return fallback ?? key;
}

export function detectLocale(
  acceptLanguageHeader: string | undefined
): AvailableLocale {
  const header = (acceptLanguageHeader || "").toLowerCase();
  return header.startsWith("ar") ? "ar" : "en";
}
