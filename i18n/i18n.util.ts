import en from "./locales/en.json";
import ar from "./locales/ar.json";
import type { AvailableLocale } from "./config";

const dictionaries: Record<AvailableLocale, any> = {
  en,
  ar,
};

function getByPath(object: any, path: string): unknown {
  return path
    .split(".")
    .reduce(
      (acc: any, key: string) =>
        acc && acc[key] !== undefined ? acc[key] : undefined,
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
