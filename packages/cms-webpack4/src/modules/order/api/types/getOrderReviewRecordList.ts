import { GetPageableResponse } from "../../../../types/commonReponse";
export interface GetOrderReviewRecordListRequestQuerystring {
    appName?: string;	          // APP名称
    merchantId?: number | "";	  // 商戶ID
    operatorId?: number | "";	  // 操作人ID
    orderNo?: string;	          // 订单编号
    phoneNo?: string;	          // 手机号
    productName?: string;	      // 产品名称
    reviewStatus?: number | "";   // 審核状态
    reviewTimeEnd?: string;       // 審核时间迄
    reviewTimeStart?: string;     // 審核时间起
    userName?: string;	          // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetOrderReviewRecordListResponse {
    records: OrderReviewRecordListResponse[]
}

export interface OrderReviewRecordListResponse {
    appName?: string;        // APP名称
    merchantName?: string;   // 商戶名
    operator?: string;       // 操作人
    orderNo?: string;        // 订单编号
    phoneNo?: string;        // 手机号
    productName?: string;    // 产品名称
    remark?: string;         // 備註
    reviewStatus?: number;   // 審核状态
    reviewTime?: string;     // 審核時間
    userName?: string;       // 姓名
}

export type GetOrderReviewRecordListProps = GetOrderReviewRecordListResponse & GetPageableResponse;
