// postRepayReceipt
export interface PostRepayReceiptRequestBody {
    /** 照片(optional) */
    file?: any;
    /** 訂單號 */
    orderNo?: string;
    /** 明細 */
    receipt?: string;
}

export interface PostRepayReceiptResponse {
    /** 預覽連結 (optional) */
    previewUrl?: string;
    /** 付款明細 */
    receipt?: string;
}

export const mockPostRepayReceiptResponse: PostRepayReceiptResponse = {
    "receipt": null,
    "previewUrl": null
}
