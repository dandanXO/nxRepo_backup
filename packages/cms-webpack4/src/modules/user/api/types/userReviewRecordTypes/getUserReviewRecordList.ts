import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetUserReviewRecordListRequestQuerystring {
    userPhone?: string;                  // 手機號
    userName?: string;                 // 姓名
    reviewStatus?:string;
    startTime?:string;
    endTime?:string;
    operatorId?:string;   
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetUserReviewRecordListResponse {
    records: UserReviewRecordListResponse[]
}

export interface UserReviewRecordListResponse {
    userPhone?: string;                  // 手機號
    userName?: string;                 // 姓名
    reviewStatus?:string;
    reviewTime?:string;
    operatorName?: string;             //操作人姓名
    remark?:string
}

export type GetUserReviewRecordListProps = GetUserReviewRecordListResponse & GetPageableResponse;