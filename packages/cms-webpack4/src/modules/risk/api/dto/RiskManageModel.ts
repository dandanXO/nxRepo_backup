import {MssRiskRankVo} from "../vo/MssRiskRankVo";

export interface RiskManageModel {
    enabled: boolean;
    // 状态

    firstLoan: Array<MssRiskRankVo>;
    modelName: string;
    // 风控名称

    remark: string;
    // 备注

    repeatLoan: Array<MssRiskRankVo>;
    riskModelName: string;
    // 风控模型名称
    useRcQuota: boolean;
    // 借款额度使用风控返回结果


}
