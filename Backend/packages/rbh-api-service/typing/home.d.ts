declare interface IHomeInfo {
    full_name: string;
    admin_name: string;
    admin_id: Number;
    created_at: Date;
    created_by: string;
    updated_at: Number;
    updated_by: string;
}

declare interface IUser2Home {
    id:Number;
    full_name: string;
    admin_name: string;
    admin_id: Number;
    house_id: Number;
    roommates:string;
}
