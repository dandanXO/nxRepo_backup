export interface GetCouponListResponse {
  currentPage?: number;
  pageSize?: number;
  records: CouponList[];
  totalPage?: number;
  totalRecords?: number;
}
export interface CouponList {
  couponCode?: string; // 领券代码
  couponContent?: string; // 优惠券内容
  couponId?: number; // 優惠券Id
  couponName?: string; // 优惠券名称
  couponType?: string; // 优惠券種類
  discountAmount?: number; // 折價金額
  expiredTime?: string; // 過期時間
  redeemed?: boolean; // 是否已使用
  redeemedTime?: string; // 使用時間
}
