import { GetPageableResponse } from "../../../../../types/commonReponse";
export interface GetOrderListRequestQuerystring {
    appName?: string;                 // APP名稱
    applyTimeEnd?: string;            // 申请时间迄
    applyTimeStart?: string;          // 申請時間開始
    channelId?: number;               // 申请渠道
    expireTimeEnd?: string;           // 到期日迄
    expireTimeStart?: string;         // 到期日起
    isLeng?: boolean;                 // 是否展期
    isOldUser?: boolean | "";         // 老客下单
    loanTimeEnd?: string;             // 放款时间迄
    loanTimeStart?: string;           // 放款时间起
    merchantName?:string;             // 商户名
    orderNo?: string;                 // 訂單編號
    productName?: string;             // 產品名稱
    rcProvider?: ""
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
    status?: number;                   // 订单状态
    userPhone?: string;                // 手机号
    userTrueName?: string;             // 姓名
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
}

export interface GetOrderListResponse {
    records: OrderListResponse[];
}

export interface OrderListResponse {
    appName?:string;          // APP名称
    applyTime?:string;        // 申请时间
    channelName?:string;      // 申请渠道
    deviceMoney?:number;      // 申请金额
    dummy?:boolean;           // 空放訂單
    expireDate?:string;       // 到期日
    id?:number;               // id
    isLeng?:boolean;          // 是否展期
    isOldUser?:boolean;       // 老客下单
    lendDays?:number;         // 借款期限
    lendMoney?:number;        // 到帐金额
    loanTime?:string;         // 放款时间
    merchantName?:string;     // 商户名
    orderNo?:string;          // 订单编号
    phoneNo?:string;          // 手机号
    productName?:string;      // 产品名称         
    riskModelName?:string;    // 风控应用         
    status?:number;           // 订单状态         
    userId?:number;           // 客戶Id
    userName?:string;         // 姓名
}

export type GetOrderListProps = GetOrderListResponse & GetPageableResponse;