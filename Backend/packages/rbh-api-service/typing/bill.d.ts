declare interface IBill {
    id: numId;
    ownerId: numId;
    homeId: numId;
    plannedSharedFlag: number;
    sharePlanid: number;
    totalAmount: number;
    isResolved: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    billName: string;
    descri:string;
}

declare interface IUser2Bill {
    id: numId;
    billId: numId;
    userId: numId;
    proportion: number;
    amount: number;
    proofFlag: number;
    isApproved: number;
    proof: any;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    billName: string;
    descri: string;
}
declare interface IBillSharePlanReturnValue{
    id:numId;
    name:string;
}
declare interface IBillShareRatioReturnValue{
    roommates: string;
    proportion: number;
}
declare interface IBillSharePlan {
    id:numId;
    name:string;
    roommates: string[];
    proportion: number[];
}

declare interface IBillCreateInfo {
    ownerId: numId;
    homeId: numId;
    plannedSharedFlag: number;
    sharePlanid: number;
    full_name:string;
    totalAmount: number;
    roommates: string[];
    amount: number[];
    proportion: number[];
    billName: string;
    descri: string;
    created_at:Date;
    created_by:string;
}

declare interface IBillCreateResponse{
    id: numId;
}
