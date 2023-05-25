// NOTE: Put
import { RiskManageModel } from "../../domain/vo/RiskManageModel";

export type PutRiskManageCreateRequest = Omit<RiskManageModel, "modelName"> & {
    modelId: number;
};
