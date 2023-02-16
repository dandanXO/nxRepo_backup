// 首贷级距
export interface MssRiskRankVo {

    balance?: number;              // 最高可借金额
    id?: number;                   // 风控评分等级流水号
    loanCount?: number;            // 最高可借笔数
    max?: number;                  // 终始阀值(exclude)
    min?: number;                  // 起始阀值(include)
    modelId?: number;              // 风控模组流水号
    overdueDaysReject?: number;    // 逾期天数超过N天拒绝
    providerRank?: string;         // 对应风控商等级
    rank?: "EXCELLENT" | "GOOD" | "NORMAL" | "ORDINARY" | "REJECT";    // 风控评分等级
    repaymentCount?: number;       // 还款笔数阀值
    sort?: number;                 // 排序
    type?: 0 | 1;                  // 级距类型 0: 首贷, 1: 复借
    autoLoan?: boolean;            // 自動放款

}
