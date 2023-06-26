import { AdsScenarioType } from '../types/IAdsScenario';

export type ActivityBanner<T1, T2> = {
    action: 'APPLY_LOAN' | 'POP_URL';
    actionUrl: string;
    // payload: AdsTemplate1Payload1 | AdsTemplate1Payload2;
    payload: T1 | T2;
};

export interface ActivityBannerResponse<T1, T2> {
    contents?: ActivityBanner<T1, T2>[];
    name: string;
    templateType: 1 | 2 | 3;
    enabled: boolean;
    sort: number;
    scenario: AdsScenarioType;
}
