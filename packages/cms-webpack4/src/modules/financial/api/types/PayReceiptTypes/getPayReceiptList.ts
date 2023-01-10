import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetPayReceiptListRequestQuerystring {
    createTimeEnd?: string;     // 建立時間迄
    createTimeStart?: string;   // 建立時間起
    merchantId?: number| '';        // 商戶ID
    orderNo?: string;           // 订单编号
    phoneNo?: string;           // 手机号
    status?: number | '';            // 确认状态
    userName?: string;          // 姓名
    utr?: string;               // UTR
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetPayReceiptListResponse {
    records: PayReceiptList[];
}

export interface PayReceiptList {
    appName?: string;         // APP名称
    createTime?: string;      // 建立时间
    deviceMoney?: number;     // 应还金额
    merchantName?: string;    // 商户名
    operator?: string;        // 操作人
    orderNo?: string;         // 订单编号
    phoneNo?: string;         // 手机号
    productName?: string;     // 产品名称
    status?: number;          // 确认状态
    updateTime?: string;      // 更新时间
    userName?: string;        // 姓名
    utr?: string;             // UTR
}

export type GetPayReceiptListProps = GetPayReceiptListResponse & GetPageableResponse;
