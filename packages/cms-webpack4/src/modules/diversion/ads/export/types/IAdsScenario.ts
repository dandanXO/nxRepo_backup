export type AdsScenarioType = "DEFAULT" | "NEW_USER" | "OLD_USER" | "REPAYMENT_2TH_TIMES" | "REPAYMENT_ABOVE_2TH_TIMES";
export interface IAdsScenario {
    id: number;
    name: string;
    value: AdsScenarioType;
}
