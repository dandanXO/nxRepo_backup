// postRepayCreate
export interface PostRepayCreateRequest {
  /** 訂單號 */
  orderNo?: string;
  /** 支付类型 */
  payType?: string;
  /** 是否展期 */
  extend?: boolean;
  /** 客戶選擇的還款金額 */
  repayAmount?: number;
  /** 还款结清后是否自动下单 */
  forceApplyAfterRepay?: boolean;
  /** 优惠券编号 */
  couponRedeemNo?: string;
}
