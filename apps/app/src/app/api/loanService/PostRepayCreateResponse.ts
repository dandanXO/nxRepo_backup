export interface PostRepayCreateResponse {
  /** 訂單號 */
  orderNo?: string;
  /** 支付中心單號 */
  pcOrderNo: string;
  /** 支付商平台流水号 */
  platOrderId: string;
  /** 用户姓名 */
  username: string;
  /** 手機號 */
  phoneNo: string;
  /** 支付类型 */
  payType?: string;
  /** 支付訂單金額 */
  repayAmount: number;
  /** 下一步跳轉方式 */
  nextStep: 'html' | 'jumpUrl';
  /** 下一步跳轉網址 */
  nextUrl: string;
  /** 業務參數 */
  payload: {
    orderAmount?: string;
  };
}
