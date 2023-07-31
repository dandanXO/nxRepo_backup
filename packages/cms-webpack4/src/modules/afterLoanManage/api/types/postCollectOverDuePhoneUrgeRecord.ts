import { TContactPerson, TFollowUpResult, TGenerateRePayLink } from '../../../shared/constants/useEnum';

export interface PostCollectOverDuePhoneUrgeRecordResponse {
    remark?: string;
}

export interface PostCollectOverDuePhoneUrgeRecordRequest {
    collectId: number;
    userId: number;
    contactPerson: TContactPerson;
    followUpResult: TFollowUpResult;
    generateLink?: TGenerateRePayLink;
    partialMoney?: string;
    ptpTime?: string;
    trackingRecord: string;
}
