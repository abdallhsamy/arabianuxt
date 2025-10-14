export type AuthUser = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    sessionToken: string;
    refreshToken: string;
}
