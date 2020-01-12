declare interface IBill {
    id: numId;
    ownerId: numId;
    homeId:numId;
    internalFlag: number;
    plannedSharedFlag: number;
    sharePlanid: number;
    proportion: number;
    proofFlag: number;
    totalAmount: number;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
}

declare interface IUser2Bill {
    id:numId;
    billId:numId;
    userId:numId;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
}