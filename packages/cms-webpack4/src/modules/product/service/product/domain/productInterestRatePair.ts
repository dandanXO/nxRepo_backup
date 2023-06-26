export type BaseRiskRank = 'EXCELLENT' | 'GOOD' | 'NORMAL' | 'ORDINARY';
export type RiskRank = BaseRiskRank | 'REJECT';

export const productInterestRatesContentKey = 'interestRates';

export type ProductInterestRatesContent = {
    num: number | string; // 提额次数
    postInterest: number | string; // 后置利率
    preInterest: number | string; // 前置利率
    plusAmount: number | string; // 借款額度提額
};

export interface ProductInterestRate {
    [productInterestRatesContentKey]: ProductInterestRatesContent[];
}

export interface ProductInterestRatePair extends ProductInterestRate {
    riskRank: RiskRank;
}
