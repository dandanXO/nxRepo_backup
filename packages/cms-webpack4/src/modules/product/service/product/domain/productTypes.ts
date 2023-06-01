import { RiskRankLoanAmount } from "./riskRankLoanAmount";
import { ProductInterestRatePair } from "../domain/productInterestRatePair";

export interface ProductTypes {
    amountRange?: string;            // 广告放款额度
    approveRate?: string;            // 广告放款通过率
    approveTime?: string;            // 广告放款通过时间
    backgroundImg?: string;          // 背景圖
    csContact?: string;              // 客服電話
    csEmail?: string;                // 客服信箱
    csTime?: string;                 // 客服时间
    dailyRate?: number;              // 日利息费率(天)
    enabled?: boolean;               // 启用/停用
    extensible?: boolean;            // 是否可展期
    extensibleOverdueDays?: number;  // 逾期N天内可展期
    extensionRate?: number;          // 展期费率

    // firstLoanQuotaSwitch?: boolean;
    // NOTICE: Deprecated 初始贷款额度开关 0: 系统规则 1: 风控返回, replace by newGuestLoanQuotaSwitch

    interestRange?: string;          // 广告放款利率

    // loanAmount?: number;
    // NOTICE: Deprecated 初始贷款额度

    // loanMaxThreshold?: number;
    // NOTICE: Deprecated 新客最大放款量

    loanTerm?: number;               // 借款周期
    logo?: string;                   // 产品logo url
    maxAmount?: number;              // 最高可借金额
    merchantId?: number;             // 商户流水号

    prodRiskProvider: {             // 混和風控额度
        isOldUser: boolean,         // 初貸(新客) : false , 複貸(次新客) :true
        provider: string            // 風控選項
    } [];

    newGuestLoanAmount?: number;
    // 初始贷款额度

    newGuestLoanQuotaSwitch?: boolean;
    // 初始贷款额度开关 0: 系统规则 1: 风控返回

    newGuestMaxThreshold?: number;
    // 新客最大放款量

    newGuestProductDisplayStatus?: boolean;
    // 新客優先滿足顯示開關

    oldGuestLoanAmount?: number;
    // 复贷初始额度

    oldGuestLoanQuotaSwitch?: boolean;
    // 复贷初始额度 0: 系统规则 1: 风控返回


    overdueRate?: number;            // 逾期费率(天)
    postInterestRate?: number;       // 后置利率
    preInterestRate?: number;        // 前置利率
    productInterestRatePairs?: ProductInterestRatePair[] //服务利率提额配置
    productName?: string;            // 产品名称

    // reLoanAmount?: number;           // 老客贷款额度
    // NOTICE: Deprecated 复贷初始额度 ; replace by oldGuestLoanAmount

    // reLoanMaxThreshold?: number;     // 次新客最大放款量: 第二次借款的老客
    // NOTICE: Deprecated 次新客最大放款量: 第二次借款的老客 ; replace by renewMaxThreshold

    // reLoanQuotaSwitch?: boolean;     // 老客贷款额度开关 0: 系统规则 1: 风控返回
    // NOTICE: Deprecated 次新客最大放款量: 第二次借款的老客 ; replace by oldGuestLoanQuotaSwitch

    renewMaxThreshold?: number;
    // 次新客最大放款量: 第二次借款的老客

    renewPostInterestRate?:	number;
    // 次新客后置利率

    renewPreInterestRate?:	number;
    // 次新客前置利率

    renewProductDisplayStatus?:	boolean;
    // 次新客優先滿足顯示開關


    repayExpiryDays?: number;        // 还款链结有效天数
    riskRankLoanAmount?: RiskRankLoanAmount[]; // 依照風控等級初始贷款额度
    showQuota?: boolean;             // 是否显示借款金额
    tags?: string;                   // 热门标签
    templateType?: 1 | 2;            // 申请详情模版类型 (1: 一般 , 2: 合同金額=到手)
    termRange?: string;              // 广告借款周期
    top?: boolean;                   // 置顶
    weight?: number;                 // 权重
}
