export type PostReservationSubmitRequest = {
  details: ReservationDetail[]; // 预约详情
  reserveOrderNo: string; // 预约来源订单号
};

export interface ReservationDetail {
  applyAmount: number; // 借款申請金額
  productId: number; // 產品編號
}
