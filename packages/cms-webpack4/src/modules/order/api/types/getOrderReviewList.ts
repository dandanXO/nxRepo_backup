import { GetPageableResponse } from "../../../shared/api/commonReponse";
import { OrderReviewTypes } from "./domain/OrderReviewTypes";

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
    merchantId?: string;
    provider?: string;                // 风控應用

    riskRank?: ""
    | "REJECT"
    | "ORDINARY"
    | "NORMAL"
    | "GOOD"
    | "EXCELLENT";                    // 风控標籤

    userName?: string;                // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetOrderReviewListResponse {
    records: OrderReviewTypes[];
}


export type GetOrderReviewListProps = GetOrderReviewListResponse & GetPageableResponse;
