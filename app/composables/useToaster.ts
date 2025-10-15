import type { UiToast } from "~/components/Ui/Common/UiToaster/UiToaster.type";

export const useToaster = () => {
  const show = (toast: UiToast) => {
    const el = document.querySelector("#global-toaster") as HTMLElement & {
      __vueParentComponent?: {
        exposed?: {
          push: (toast: UiToast) => void;
        };
      };
    };
    el?.__vueParentComponent?.exposed?.push(toast);
  };

  const success = (
    title: string,
    message?: string,
    options: Partial<UiToast> = {}
  ) => show({ title, message, type: "success", ...options });
  const error = (
    title: string,
    message?: string,
    options: Partial<UiToast> = {}
  ) => show({ title, message, type: "error", ...options });
  const warning = (
    title: string,
    message?: string,
    options: Partial<UiToast> = {}
  ) => show({ title, message, type: "warning", ...options });
  const info = (
    title: string,
    message?: string,
    options: Partial<UiToast> = {}
  ) => show({ title, message, type: "info", ...options });

  return { show, success, error, warning, info };
};
