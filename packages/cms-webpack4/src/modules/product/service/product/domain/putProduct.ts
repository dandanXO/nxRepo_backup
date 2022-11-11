export interface PutProductRequestParams {
    productId: number
}
export interface PutProductRequestBody {
    /** 管理者密码 */
    adminPassword?: string;
    /** 广告放款额度 */
    amountRange?: string;
    /** 广告放款通过率 */
    approveRate?: string;
    /** 广告放款通过时间 */
    approveTime?: string;
    /** 背景圖 */
    backgroundImg?: string;
    /** 客服電話 */
    csContact?: string;
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

    // 初始贷款额度开关 0: 系统规则 1: 风控返回
    firstLoanQuotaSwitch?: boolean;

    /** 广告放款利率 */
    interestRange?: string;

    // 初始贷款额度
    loanAmount?: number;

    /** 借款周期 */
    loanTerm?: number;
    /** 产品logo url */
    logo?: string;
    /** 最高可借金额 */
    maxAmount?: number;
    /** 逾期费率(天) */
    overdueRate?: number;
    /** 后置利率 */
    postInterestRate?: number;
    /** 前置利率 */
    preInterestRate?: number;
    /** 服务利率提额配置 */
    productInterestRatePairs?: PutProductInterestRatePairs[];
    /** 产品名称 */
    productName?: string;

    // 老客贷款额度
    reLoanAmount?: number;


    // 老客贷款额度开关 0: 系统规则 1: 风控返回
    reLoanQuotaSwitch?: boolean;


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

export interface PutProductInterestRatePairs {
    /** 提额次数 */
    num?: number;
    /** 后置利率 */
    postInterest?: number;
    /** 前置利率 */
    preInterest?: number;
    /** 借款額度提額 */
    plusAmount?: number;
}

