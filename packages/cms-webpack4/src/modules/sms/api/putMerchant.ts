export interface PutMerchantRequestParams {
    merchantId: number;
}
export interface PutMerchantRequestBody {
    /** 联络电话 */
    contact?: string;
    /** 信箱 */
    email?: string;
    /** 启用状态 */
    enabled?: boolean;
    /** 商户号 */
    mchNo?: string;
    /** 商户名称 */
    name?: string;
}

export type PutMerchantProps = PutMerchantRequestParams & PutMerchantRequestBody;
