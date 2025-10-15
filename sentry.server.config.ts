import * as Sentry from "@sentry/nuxt";

// Check if Sentry is enabled via environment variable
const isSentryEnabled = process.env.SENTRY_ENABLED === "true";
const sentryDsn = process.env.SENTRY_DSN;

if (isSentryEnabled && sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Enable sending of user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Filter out all 4xx client errors from being reported as errors
    beforeSend(event, hint) {
      // Check if this is an error with 4xx status code
      if (hint.originalException) {
        const error = hint.originalException as any;

        // Handle AxiosError specifically
        if (
          error.isAxiosError &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        ) {
          // This is a client error (4xx), not a real application error - don't send to Sentry
          return null;
        }

        // Handle other HTTP errors with 4xx status
        if (
          (error.status >= 400 && error.status < 500) ||
          (error.statusCode >= 400 && error.statusCode < 500)
        ) {
          return null;
        }
      }

      // Check if the event itself contains 4xx status information
      if (event.exception) {
        const exception = event.exception.values?.[0];
        if (
          exception?.value?.match(/Request failed with status code (4\d{2})/)
        ) {
          return null;
        }
      }

      return event;
    },
  });
}
