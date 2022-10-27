// NOTE: Put
import {RiskManageModel} from "../../domain/vo/RiskManageModel";

export type PutRiskManageCreateRequest = RiskManageModel & {
    modelId: number;
};
