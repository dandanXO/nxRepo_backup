import { GetDataCommonResponse } from "../../../../types/commonReponse";
export interface GetUserListRequestQuerystring {
    // 註冊時間結束
    addEndTime?: string;

    // 註冊時間開始
    addStartTime?: string;

    // 注册时的app名称
    appName?: string;

    // 渠道名稱
    channelId?: string;

    // 是否提單
    hasOrder?: string;

    // 身份证号
    idcardNo?: string;

    // 姓名
    nameTrue?: string;

    // 是否为新客
    newMember?: boolean | string;

    // 結清未複借
    noLoanAgain?: boolean;

    // 結清未複借終止天數
    noLoanAgainEndDays?: number;

    // 結清未複借起始天數
    noLoanAgainStartDays?: number;

    // 手機號
    phoneNo?: string;

    // 用户风控等级
    riskRank?: ""|"REJECT" | "ORDINARY" | "NORMAL" | "GOOD" | "EXCELLENT";

    // 是否實名
    rnStatus?: string;

    // 狀態
    status?: string;

    // 用戶審核狀態
    userStatus?: number;

    pageNum?: number;
    pageSize?: number;

}

export interface GetUserListResponse {
    content:UserListContent[];
    
} 

export interface UserListContent {
    // 注册时间
    addTime?: number;
    // 年龄
    age?: number;
    // 注册App名称
    appName?: string;
    // 渠道ID
    channelId?: number;
    // 渠道名称
    channelName?: string;
    // 性别
    gender?: string;
    // 用户ID
    id?: number;
    // 证件号码
    idcardNo?: string;
    // 是否為黑名單
    isBlack?: number;
    // 真实姓名
    nameTrue?: string;
    // 是否为新客
    newMember?: boolean;
    // 手机号
    phoneNo?: string;
    // 风控标签
    riskRank?: string;
}

export type GetUerListProps = GetUserListResponse & GetDataCommonResponse;
export type GetUerProps = GetUerListProps & GetUserListRequestQuerystring;