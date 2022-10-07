import { GetDataCommonResponse } from "../../../../types/commonReponse";
export interface GetUserInfoRequestQuerystring {

    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
    unpaged?: boolean;
    userId?: number;

}

export interface GetUserSmsResponse{
    content:GetUserSms[]
}
export interface GetUserSms {
    content?: string;
    direction?: string;
    phone?: string;
    time?: number;
    userId?: number;
}

export interface GetUserContactsResponse {
    content:GetUserContacts[]
}
export interface GetUserContacts {
    lastUpdateTime?: string;
    name?: string;
    phone?: string;
}


export interface GetUserOrdersResponse {
    content:GetUserOrders[]
}
export interface GetUserOrders {
    applyTime?: number;	    // 申请时间
    deviceMoney?: number;	// 申请金额
    expireTime?: number;	// 到期時間
    lendDays?: number;	    //
    lendMoney?: number	    // 到帳金額
    loanTime?: number;	    // 放款時間
    orderNo?: string;	    // 订单号
    payTime?: number;	    // 還款時間
    productName?: string;	// 借款產品
    status?: number;	    // 狀態
}

export type GetUserSmsProps = GetUserSmsResponse & GetDataCommonResponse;
export type GetUserContactsProps = GetUserContactsResponse & GetDataCommonResponse;
export type GetUserOrdersProps = GetUserOrdersResponse & GetDataCommonResponse;