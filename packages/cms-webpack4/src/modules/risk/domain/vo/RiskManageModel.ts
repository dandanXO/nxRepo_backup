import { MssRiskRankVo } from './MssRiskRankVo';

export interface RiskManageModel {
    enabled?: boolean; // 状态
    firstLoan: Array<MssRiskRankVo>;
    modelName?: string; // 风控名称
    oldRankStrategy?: 'KEY_VALUE' | 'REPAY_COUNT' | 'SCORE'; // (老客)风控等级决策方式
    oldUseRcQuota?: boolean; // (老客)借款额度使用风控返回结果
    rankStrategy?: 'KEY_VALUE' | 'REPAY_COUNT' | 'SCORE'; // 风控等级决策方式
    remark?: string; // 备注
    repeatLoan: Array<MssRiskRankVo>;
    riskModelName?: string; // 风控模型名称
    useRcQuota?: boolean; // 借款额度使用风控返回结果
}
