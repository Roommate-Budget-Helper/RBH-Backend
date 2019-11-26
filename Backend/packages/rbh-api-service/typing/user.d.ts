declare interface IUserInfo {
    user_id: string;
    password?: string;
    email?: string;
    username?: string;
    nickname?: string;
    create_time?: number;
}

declare interface IRegisterInfo {
    username: string;
    nickname?: string;
    email?: string;
    password: string;
}
