export interface GetCouponApplicableListRequest {
  isFullRepay: boolean; // 是否全款還款
  orderNo: string; // 訂單號
  paymentAmount: number; // 付款金額
}
