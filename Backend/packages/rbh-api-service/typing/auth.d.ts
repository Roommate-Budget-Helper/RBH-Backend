interface IAuthResponse {
    userId: string;
    username: string;
    avatarUrl: string;
    accessToken: string;
}

interface IAuthCookie {
    sessionId: string;
}
