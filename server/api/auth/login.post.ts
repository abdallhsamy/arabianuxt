import { readBody, setResponseStatus, getHeader } from "h3";
import { detectLocale, translate } from "~~/i18n/i18n.util";

export default defineEventHandler(async event => {
  const locale = detectLocale(getHeader(event, "accept-language"));
  const t = (key: string) => translate(locale, key);

  try {
    const body = await readBody(event);

    if (!body.email || !body.password) {
      setResponseStatus(event, 422);
      return {
        message: t("api.auth.invalidData"),
        errors: {
          email: body.email ? [] : [t("api.auth.emailRequired")],
          password: body.password ? [] : [t("api.auth.passwordRequired")],
        },
      };
    }

    if (body.email === "admin@example.com" && body.password === "password") {
      setResponseStatus(event, 200);
      return {
        id: 1,
        name: "Abdallah Samy",
        email: "admin@example.com",
        avatar: "https://i.pravatar.cc/150?img=11",
        sessionToken: crypto.randomUUID(),
        refreshToken: crypto.randomUUID(),
        role: "admin",
      };
    }

    setResponseStatus(event, 401);
    return {
      message: t("api.auth.invalidCredentials"),
      errors: {
        email: [],
        password: [t("api.auth.invalidEmailOrPassword")],
      },
    };
  } catch (err) {
    console.error("Auth login error:", err);
    setResponseStatus(event, 500);
    return {
      message: t("api.common.serverError"),
    };
  }
});
