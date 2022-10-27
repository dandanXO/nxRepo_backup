// 首贷级距
export interface MssRiskRankVo {
    loanCount: number;
    // 可借笔数

    id?: number;
    // 风控评分等级流水号

    max?: number;
    // 终始阀值(exclude)

    min?: number;
    // 起始阀值(include)

    modelId?: number;
    // 风控模组流水号

    providerRank: string;
    // 风控商等级

    rank: "EXCELLENT" | "GOOD" | "NORMAL" | "ORDINARY" | "REJECT";
    // 风控评分等级

    sort: number;
    // 排序

    type: 0 | 1
    // 级距类型 0: 首贷, 1: 复借
}
