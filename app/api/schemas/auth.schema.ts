import { z } from "zod";

// Schema definition for type inference only - using direct type definition
export type LoginForm = {
  email: string;
  password: string;
};

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("api.auth.emailRequired")),
    password: z.string().min(1, t("api.auth.passwordRequired")),
  });

export const getLoginSchema = () => {
  const {
    $i18n: { t },
  } = useNuxtApp();
  return createLoginSchema((key: string) => t(key));
};
