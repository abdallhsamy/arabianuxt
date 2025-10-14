import { defineStore } from "pinia";
import { useSyncedCookie } from "~/composables/useSyncedCookie";
import type { AuthUser } from "~~/types/global";

export const useAuthStore = defineStore("auth", () => {
  const userCookie = useSyncedCookie<AuthUser | undefined>(
    "authUser",
    undefined
  );

  const user = computed(() => userCookie.value);

  const userInitials = computed(() => {
    if (!user.value) return "";
    return user.value.name
      .split(" ")
      .map(name => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  });

  const isAuthenticated = computed(() => !!user.value);

  const login = (user: AuthUser) => {
    userCookie.value = user;
  };

  const logout = () => {
    userCookie.value = undefined;
  };

  return {
    user,
    userInitials,
    isAuthenticated,
    login,
    logout,
  };
});
