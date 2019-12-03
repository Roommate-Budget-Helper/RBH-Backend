declare interface IUserInfo {
    id: number,
    full_name: string,
    balance: 0,
    userName: string,
    hashedPassword: string,
    created_at?: number,
    created_by?: number,
    updated_at?: number,
    updated_by?: number
}

declare interface IRegisterInfo {
    username: string;
    nickname?: string;
    email?: string;
    password: string;
}
