declare interface ILoginResponse {
    userInfo: IUserInfo;
    token: string;
}

interface IAuthResponse {
    isRegistered: boolean;
}
