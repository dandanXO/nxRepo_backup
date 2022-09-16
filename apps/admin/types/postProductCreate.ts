export interface PostProductCreateRequestBody {
    /** 管理者密码 */
    adminPassword?: string;
    /** 管理者账号 */
    adminUsername?: string;
    /** 广告放款额度 */
    amountRange?: string;
    /** 广告放款通过率 */
    approveRate?: string;
    /** 广告放款通过时间 */
    approveTime?: string;
    /** 背景圖 */
    backgroundImg?: string;
    /** 客服信箱 */
    csEmail?: string;
    /** 客服时间 */
    csTime?: string;
    /** 日利息费率(天) */
    dailyRate?: number;
    /** 启用/停用 */
    enabled?: boolean;
    /** 是否可展期 */
    extensible?: boolean;
    /** 逾期N天内可展期 */
    extensibleOverdueDays?: number;
    /** 展期费率 */
    extensionRate?: number;
    /** 广告放款利率 */
    interestRange?: string;
    /** 借款周期 */
    loanTerm?: number;
    /** 产品logo url */
    logo?: string;
    /** 最高可借金额 */
    maxAmount?: number;
    /** 商户流水号 */
    merchantId?: number;
    /** 逾期费率(天) */
    overdueRate?: number;
    /** 后置利率 */
    postInterestRate?: number;
    /** 前置利率 */
    preInterestRate?: number;
    /** 服务利率提额配置 */
    productInterestRatePairs?: PostProductInterestRatePairs[]
    /** 产品名称 */
    productName?: string;
    /** 还款链结有效天数 */
    repayExpiryDays?: number;
    /** 是否显示借款金额 */
    showQuota?: boolean;
    /** 热门标签 */
    tags?: string;
    /** 申请详情模版类型 (1: 一般 , 2: 合同金額=到手)
        @enum {number}
    */
    templateType?: 1 | 2;
    /** 广告借款周期 */
    termRange?: string;
    /** 置顶 */
    top?: boolean;
    /** 权重 */
    weight?: number;
}


export interface PostProductInterestRatePairs {
    /** 提额次数 */
    num?: number;
    /** 后置利率 */
    postInterest?: number;
    /** 前置利率 */
    preInterest?: number;
}
