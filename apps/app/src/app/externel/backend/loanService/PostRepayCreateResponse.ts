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
  /** 代收平台名稱 */
  payPlatName?: string;
  /** 支付方式 */
  payTypeName?: string;
  /** 上游支付通道 */
  upstreamChannel?: string;
  /** 業務參數 */
  payload: {
    /** 共用 */
    orderAmount?: string | number;

    /** 墨西哥 */
    beneficiario?: string;
    clabe?: string;
    referencia?: string;
    barcodeUrl?: string;

    /** 菲律賓 */
    referenceNo?: string;
    qrCode?: string;
    barcode?: string;
  };
}
