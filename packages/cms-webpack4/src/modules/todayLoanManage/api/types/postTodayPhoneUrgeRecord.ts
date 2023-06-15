import {TContactPerson, TFollowUpResult, TGenerateRePayLink} from "../../../shared/constants/useEnum";


export interface PostTodayPhoneUrgeRecordRequest {
    collectId: number,
    userId: number,
    contactPerson: TContactPerson,
    followUpResult: TFollowUpResult,
    generateLink?: TGenerateRePayLink,
    partialMoney?: string,
    ptpTime?: string,
    trackingRecord: string
}
