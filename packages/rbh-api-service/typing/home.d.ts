declare interface IHomeInfo {
    full_name: string;
    admin_name: string;
    admin_id: numId;
    created_at: Date;
    created_by: string;
    updated_at: number;
    updated_by: string;
}

declare interface IUser2Home {
    id: numId;
    full_name: string;
    admin_name: string;
    admin_id: numId;
    house_id: numId;
    roommates: string;
}

declare interface IUserBalanceResponse {
    balance: number;
}
