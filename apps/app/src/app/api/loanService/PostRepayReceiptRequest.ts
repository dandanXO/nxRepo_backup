// postRepayReceipt
export interface PostRepayReceiptRequest {
  /** 照片(optional) */
  file?: string;
  /** 訂單號 */
  orderNo?: string;
  /** 明細 */
  receipt?: string;
}
