import {useAuthStore} from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const localePath = useLocalePath()
    if (!authStore.isAuthenticated) {
        return navigateTo(localePath('/login'))
    }
})