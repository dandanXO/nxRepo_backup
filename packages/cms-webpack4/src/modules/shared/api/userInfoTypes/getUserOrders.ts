import { GetPageableResponse} from "../commonReponse";

export interface GetUserOrdersResponse {
    records:GetUserOrders[]
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

export type GetUserOrdersProps = GetUserOrdersResponse & GetPageableResponse;
