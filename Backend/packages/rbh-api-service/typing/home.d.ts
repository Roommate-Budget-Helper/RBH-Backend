declare interface IHomeInfo {
    full_name: string;
    admin_name: string;
    admin_id: id;
    created_at: Date;
    created_by: string;
    updated_at: number;
    updated_by: string;
}

declare interface IUser2Home {
    id: id;
    full_name: string;
    admin_name: string;
    admin_id: id;
    house_id: id;
    roommates: string;
}
