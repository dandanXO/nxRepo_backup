export interface GetCouponApplicableListRequest {
    isFullRepay: boolean;     // 是否全款還款
    orderNo: string;          // 是否為電子錢包
    paymentAmount: number;    // 付款金額
    paymentMethod: 'BANK_ACCOUNT' | 'MOBILE_WALLET'; // 還款方式
}
