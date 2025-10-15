export type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  sessionToken: string;
  refreshToken: string;
};

// i18n type definitions
declare module "#app" {
  interface NuxtApp {
    $t: (key: string, ...args: unknown[]) => string;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: unknown[]) => string;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: unknown[]) => string;
  }
}
