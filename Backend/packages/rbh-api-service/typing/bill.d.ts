declare interface IBill {
    id: numId;
    ownerId: numId;
    homeId:numId;
    plannedSharedFlag: number;
    sharePlanid: number;
    totalAmount: number;
    isResolved: number;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
}

declare interface IUser2Bill {
    id:numId;
    billId:numId;
    userId:numId;
    proportion:number;
    amount:number;
    proofFlag:number;
    isApproved:number;
    proof:any;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
}