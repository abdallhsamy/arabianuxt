export type LanguageDirection = "rtl" | "ltr";

export const AvailableLocales = {
    Arabic: 'ar',
    English: 'en',
} as const;

export type AvailableLocale = (typeof AvailableLocales)[keyof typeof AvailableLocales];

export const LanguageDirections: Record<AvailableLocale, LanguageDirection> = {
    [AvailableLocales.Arabic]: 'rtl',
    [AvailableLocales.English]: 'ltr',
}

export const i18nConfig = {
    defaultLocale: AvailableLocales.English,
    locales: Object.entries(AvailableLocales).map(([key, code]) => ({
        code,
        name: key,
        file: `${code}.json`,
        // iso:
        dir: LanguageDirections[code as AvailableLocale],
    })),
}
