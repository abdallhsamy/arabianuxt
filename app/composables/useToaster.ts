import type { Toast } from "~/components/Ui/Common/Toaster.vue";

export const useToaster = () => {
  const show = (toast: Toast) => {
    const el = document.querySelector("#global-toaster") as HTMLElement & {
      __vueParentComponent?: {
        exposed?: {
          push: (toast: Toast) => void;
        };
      };
    };
    el?.__vueParentComponent?.exposed?.push(toast);
  };

  const success = (
    title: string,
    message?: string,
    options: Partial<Toast> = {}
  ) => show({ title, message, type: "success", ...options });
  const error = (
    title: string,
    message?: string,
    options: Partial<Toast> = {}
  ) => show({ title, message, type: "error", ...options });
  const warning = (
    title: string,
    message?: string,
    options: Partial<Toast> = {}
  ) => show({ title, message, type: "warning", ...options });
  const info = (
    title: string,
    message?: string,
    options: Partial<Toast> = {}
  ) => show({ title, message, type: "info", ...options });

  return { show, success, error, warning, info };
};
