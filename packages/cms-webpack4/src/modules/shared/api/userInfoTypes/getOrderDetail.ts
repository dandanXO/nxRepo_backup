import { TPayOutMethod, TPayOutStatus } from '../../constants/useEnum';

export interface GetOrderDetailRequestQuerystring {
    orderId?: number;
}

export interface GetOrderDetailResponse {
    appName?: string; // APP名称
    applyTime?: string; // 申请时间
    deviceMoney?: number; // 申请金额
    channelName?: string; // 申請渠道
    dummy?: boolean; // 空放订单
    expireTime?: string; // 到期时间
    id?: number; // 訂單ID
    isOldUser?: boolean; // 老客下单
    lendDays?: number; // 借款期限
    lendMoney?: number; // 到帐金额
    loanTime?: string; // 放款时间
    orderNo?: string; // 订单编号
    overdueDays?: number; // 逾期天数
    overdueMoney?: number; // 逾期金额
    phoneNo?: string; // 手机号
    productName?: string; // 申请产品
    receiptImage?: string; // 还款证明单据
    reviewTime?: string; // 审核时间
    status?: number; // 订单状态
    totalMoney?: number; // 应还金额
    utr?: string; // UTR
    couponUsageAmount?: number; // 使用优惠券金额
    lastUpdateTime?: string; //最后更新时间
    loanCertificate?: {
        // 放款憑證
        account: string; // 收款帐户
        amount: number; // 放款金额
        createTime: string; // 放款启动时间
        finishTime: string; // 放款确认时间
        name: string; // 收款人姓名
        orderNo: string; // 订单编号
        payoutMethod: TPayOutMethod; // 收款方式
        status: TPayOutStatus; // 状态
    };
}
