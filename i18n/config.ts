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

const IsoCodes = {
    [AvailableLocales.Arabic]: 'ar-Eg',
    [AvailableLocales.English]: 'en-US',
} as const;

export const IsoCode = (locale: AvailableLocale) => IsoCodes[locale];

export const i18nConfig = {
    defaultLocale: AvailableLocales.English,
    baseUrl: "https://arabianuxt.netlify.app/",
    locales: Object.entries(AvailableLocales).map(([key, code]) => ({
        code,
        name: key,
        file: `${code}.json`,
        language: IsoCodes[code as AvailableLocale],
        dir: LanguageDirections[code as AvailableLocale],
    })),
}
