export type GetOperatorListResponse =  OperatorList[]
export interface OperatorList {
    id?:number;
    name?:string;
}
export interface GetOrderReviewRecordOperatorListResponse {
    operatorId?:number;
    operatorName?:string;
}