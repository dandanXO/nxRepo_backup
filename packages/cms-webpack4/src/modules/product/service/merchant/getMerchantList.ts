export interface GetMerchantListResponseData extends Array<GetMerchantListResponse> {
    data: GetMerchantListResponse[];
}
export interface GetMerchantListResponse {
    /** 联络电话 */
    contact?: string;
    /** 创建时间 */
    createTime?: string;
    /** 信箱 */
    email?: string;
    /** 启用状态 */
    enabled?: boolean;
    /** 商户号 */
    mchNo?: string;
    /** 商户编号 */
    merchantId?: number;
    /** 商户名称 */
    name?: string;
    /** 修改時間 */
    updateTime?: string;
}
