import { GetPageableResponse } from "../../../../shared/api/commonReponse";
export interface GetUserReviewListRequestQuerystring {
    phoneNo?: string;                  // 手機號
    regChannelId?: string | number;    // 注册通道
    registerEndTime?: string;          // 註冊時間結束
    registerStartTime?: string;        // 註冊時間開始
    riskRank?: ""
    | "REJECT"
    | "ORDINARY"
    | "NORMAL"
    | "GOOD"
    | "EXCELLENT";                     // 用户风控等级
    userName?: string;                 // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetUserReviewListResponse {
    records: UserReviewListResponse[]
}

export interface UserReviewListResponse {
    phoneNo?: string;        // 手机号
    regChannelName?: string; // 注册通道
    registerTime?: string;   // 注册时间
    riskRank?: string;       // 风控标签
    userId?: number;         // 用户流水号
    userName?: string;       // 姓名
}

export type GetUserReviewListProps = GetUserReviewListResponse & GetPageableResponse;
