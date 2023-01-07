import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetUserReviewRecordListRequestQuerystring {

    operatorId?: string;           // 操作人
    phoneNo?: string;              // 手機號
    reviewStatus?: number | '';    // 审核状态
    reviewTimeEnd?: string;        // 审核时间迄
    reviewTimeStart?: string;      // 审核时间起
    userName?: string;             // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetUserReviewRecordListResponse {
    records: UserReviewRecordList[]
}

export interface UserReviewRecordList {
    phoneNo?: string;         // 手機號
    userName?: string;        // 姓名
    reviewStatus?: number;    // 审核状态
    reviewTime?: string;      // 审核时间
    operator?: string;        // 操作人
    remark?: string           // 备注
}

export type GetUserReviewRecordListProps = GetUserReviewRecordListResponse & GetPageableResponse;