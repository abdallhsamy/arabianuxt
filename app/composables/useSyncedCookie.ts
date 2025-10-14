export const useSyncedCookie = <T>(key: string, defaultValue: T) => {
    const cookie = useCookie<T>(key, {
        default: () => defaultValue,
        watch: true,
    })

    const state = ref<T>(cookie.value ?? defaultValue)

    watch(state, (value) => {
        cookie.value = value
    })

    return state;
}