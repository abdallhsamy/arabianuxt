import type { LoginForm } from "~/api/schemas/auth.schema";
import type { AuthUser } from "~~/types/global";
import type { AxiosResponse } from "axios";
import { api } from "~/api";

export const authApi = {
  login: (data: LoginForm) =>
    api.Post<AxiosResponse<AuthUser>, never>("/auth/login", data),
  logout: () =>
    api.Get<AxiosResponse<{ message: string }>, never>("/auth/logout"),
};
