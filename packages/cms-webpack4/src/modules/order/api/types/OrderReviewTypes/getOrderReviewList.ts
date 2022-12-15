import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetOrderReviewListRequestQuerystring {
    addEndTime?: string;              // 申請時間結束
    addStartTime?: string;            // 申請時間開始
    appName?: string;                 // APP名稱
    applyChannel?: string;            // 申請渠道
    oldMember?: boolean | "";         // 是否为老客
    orderNo?: string;                 // 訂單編號
    phoneNo?: string;                 // 手机号
    productName?: string;             // 產品名稱
    merchantName?:string;             // 商户名
    provider?: ""
    | "BLUE_RAY"
    | "DESTINY"
    | "MERCURY"
    | "DUMMY"
    | "BATEI"
    | "HX"
    | "WU_PIAN"
    | "BLUE_RAY_API"
    | "BLUE_RAY_V4"
    | "SEA_CORE"
    | "BLUE_RAY_PK"
    | "WU_PIAN_PK";                    // 风控應用

    riskRank?: ""
    | "REJECT"
    | "ORDINARY"
    | "NORMAL"
    | "GOOD"
    | "EXCELLENT";                     // 风控標籤

    userName?: string;                // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetOrderReviewListResponse {
    records: OrderReviewListResponse[];
}

export interface OrderReviewListResponse {
    addTime?: string;           // 申請時間
    appName?: string;           // APP名稱
    applyChannel?: string;      // 申請渠道
    deviceMoney?: number;       // 申請金額
    dummy?: boolean;            // 空放訂單
    id?: number;                // 訂單ID
    lendMoney?: number;         // 到帳金額
    oldMember?: boolean;        // 老客下單
    orderNo?: string;           // 訂單號
    phoneNo?: string;           // 手機號
    productName?: string;       // 產品名稱
    merchantName?:string;       // 商户名
    provider?: string;          // 風控應用
    riskRank?: string;          // 風控標籤
    userName?: string;          // 姓名
    userId?: number;            // userid
}

export type GetOrderReviewListProps = GetOrderReviewListResponse & GetPageableResponse;