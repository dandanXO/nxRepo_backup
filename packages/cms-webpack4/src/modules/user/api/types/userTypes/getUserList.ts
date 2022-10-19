import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetUserListRequestQuerystring {

    addEndTime?: string;            // 註冊時間結束
    addStartTime?: string;          // 註冊時間開始
    appName?: string;               // 注册时的app名称
    channelId?: string;             // 渠道名稱
    idcardNo?: string;              // 身份证号
    nameTrue?: string;              // 姓名
    newMember?: boolean | string;   // 是否为新客
    noLoanAgain?: boolean;          // 結清未複借
    noLoanAgainEndDays?: number;    // 結清未複借終止天數
    noLoanAgainStartDays?: number;  // 結清未複借起始天數
    phoneNo?: string;               // 手機號
    riskRank?: ""
    | "REJECT"
    | "ORDINARY"
    | "NORMAL"
    | "GOOD"
    | "EXCELLENT";                   // 用户风控等级
    status?: number | string;        // 狀態
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetUserListResponse {
    records: UserListContent[];
}
export interface UserListContent {

    addTime?: number;     // 注册时间
    age?: number;         // 年龄
    appName?: string;     // 注册App名称
    channelId?: number;   // 渠道ID
    channelName?: string; // 渠道名称
    gender?: string;      // 性别
    id?: number;          // 用户ID
    idcardNo?: string;    // 证件号码
    isBlack?: number;     // 是否為黑名單
    nameTrue?: string;    // 真实姓名        
    newMember?: boolean;  // 是否为新客
    phoneNo?: string;     // 手机号
    riskRank?: string;    // 风控标签
}

export type GetUerListProps = GetUserListResponse & GetPageableResponse;
export type GetUerProps = GetUerListProps & GetUserListRequestQuerystring;