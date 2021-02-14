export interface AuthUser {
    user: {
        id: string;
        userName: string;
        avatar: string | null;
        phone: string;
    },
    token: string;
}