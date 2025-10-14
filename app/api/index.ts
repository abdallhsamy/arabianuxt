import { createAlova } from "alova";
import NuxtHook from "alova/nuxt";
import { axiosRequestAdapter } from "@alova/adapter-axios";
import { AvailableLocales } from "~~/i18n/config";

export const api = createAlova({
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp,
  }),
  baseURL: "/api",
  requestAdapter: axiosRequestAdapter(),
  timeout: 10000,
  beforeRequest(method) {
    method.config.headers["Content-Type"] = "application/json";
    try {
      const {
        $i18n: { locale },
      } = useNuxtApp();
      method.config.headers["Accept-Language"] =
        (locale?.value as string) || AvailableLocales.English;
    } catch {
      method.config.headers["Accept-Language"] = AvailableLocales.English;
    }
  },
  responded: {
    onError: error => {
      throw error;
    },
  },
});
