
export interface GetLoanRecommendRequestQuerystring {
    /** 推荐笔数 */
    count?: string;
}

export interface GetLoanRecommendProductsResponse extends Array<GetLoanRecommendProducts> {
    data: GetLoanRecommendProducts[];
}

export interface GetLoanRecommendProducts {
    /** @description 借款合約書 */
    agreementUrl?: string;
    /** @description 广告通过率 */
    approvedRate?: string;
    /** @description 广告通过时间 */
    approvedTime?: string;
    /** @description background image */
    backgroundUrl?: string;
    /** @description 產品客服郵件 */
    csEmail?: string;
    /** @description 產品客服時間 */
    csTime?: string;
    /** @description 揭露聲明 */
    disclosureUrl?: string;
    /** @description 广告借款服务费率 */
    interestRate?: string;
    /** @description 广告额度 */
    loanQuota?: string;
    /** @description Logo icon */
    logoUrl?: string;
    /** @description 隱私權 */
    privacyUrl?: string;
    /** @description 產品流水號 */
    productId?: number;
    /** @description 產品名稱 */
    productName?: string;
    /** @description 排序 (预设从小到大) */
    sort?: number;
    /** @description [...] */
    tags?: string[];
    /** @description 广告借款周期 */
    term?: string;
    /** @description 置顶 */
    top?: boolean;
}
