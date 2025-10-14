export default defineNuxtRouteMiddleware(_to => {
  const localePath = useLocalePath();
  const user = useCookie("authUser");

  if (!user.value) {
    return navigateTo(localePath("/login"));
  }
});
