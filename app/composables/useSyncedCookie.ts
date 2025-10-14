export const useSyncedCookie = <T>(key: string, defaultValue: T) => {
  const cookie = useCookie<T>(key, {
    default: () => defaultValue,
    watch: true,
  });

  // Hydration-safe state seeded from SSR cookie value
  const state = useState<T | undefined>(
    `cookie:${key}`,
    () => cookie.value ?? defaultValue
  );

  watch(state, value => {
    cookie.value = value as T;
  });

  return state;
};
