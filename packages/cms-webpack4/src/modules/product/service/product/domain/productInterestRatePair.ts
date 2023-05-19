export type BaseRiskRank = 'EXCELLENT' | 'GOOD' | 'NORMAL' | 'ORDINARY'
export type RiskRank = BaseRiskRank | 'REJECT'

export const productInterestRatesContentKey = 'interestRates'

export interface ProductInterestRatePair {
    riskRank: RiskRank
    [productInterestRatesContentKey]: [
        {
            num: number;          // 提额次数
            postInterest: number; // 后置利率
            preInterest: number;  // 前置利率
            plusAmount: number;   // 借款額度提額
        }
    ],
}
