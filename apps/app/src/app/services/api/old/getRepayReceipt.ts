// GetRepayReceipt
export interface GetRepayReceiptRequestQuerystring {
    /** 訂單號 */
    orderNo?: string;
}

export interface GetRepayReceiptResponse {
    /** 預覽連結 (optional) */
    previewUrl?: string;
    /** 付款明細 */
    receipt?: string;
}

export const mockGetRepayReceiptResponse: GetRepayReceiptResponse = {
    receipt: "",
    previewUrl: "",
};
