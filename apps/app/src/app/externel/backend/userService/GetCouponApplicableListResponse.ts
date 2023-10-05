export type GetCouponApplicableListResponse = GetCouponApplicableList[];
export interface GetCouponApplicableList {
  applicable?: boolean; // 是否可用
  couponContent?: string; // 优惠券内容
  couponName?: string; // 优惠券名称
  couponNo?: string; // 领券代码
  couponType?: string; // 优惠券種類
  discountAmount?: number | ''; // 优惠券金额
  expireTime?: string; // 优惠券结束时间
  id?: number; // coupon redeem id
}
