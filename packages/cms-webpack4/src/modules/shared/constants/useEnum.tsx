import {useTranslation} from "react-i18next";

export type TContactPerson = 'BORROWER' | 'EMERGENCY_CONTACT1' | 'EMERGENCY_CONTACT2' | 'CONTACT_LIST'
export type TFollowUpResult = 'Promise' | 'FinancialDifficulties' | 'Missed' | 'TurnedOff' | 'InvalidPhoneNumber' | 'BadAttitude' | 'Other'
export type TGenerateRePayLink = 'NONE' | 'PARTIAL_REPAYMENT' | 'REPAYMENT_LINK' | 'EXTENSION_LINK'

export const useEnum = (translationNameSpase?:string) => {
    const { t }  = useTranslation(translationNameSpase)

    const OrderLabelEnum = {
        '': { text: t('noRestriction')  },
        'NewLoan': { text: t('orderLabelStatus.newLoan'), color:'orange'},
        'ReLoan': { text: t('orderLabelStatus.reLoan'), color: 'blue'},
        'Extension': { text: t('orderLabelStatus.extension'), color: 'green'}
    }

    const OrderStatusEnum = appInfo.COUNTRY !== 'Bangladesh' ? {
        '': { text: t('noRestriction') },
        '1': { text: '机审中', color: 'default' },
        '6': { text: '审核中', color: 'blue' },
        '7': { text: '订单拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: t('orderStatus.completed'), color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: t('orderStatus.overDue'), color: 'orange' },
    } : {
        '': { text: t('noRestriction') },
        '1': { text: '机审中', color: 'default' },
        '3': { text: '复审中', color: 'cyan' },
        '6': { text: '终审中', color: 'blue' },
        '7': { text: '订单拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: t('orderStatus.completed'), color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: t('orderStatus.overDue'), color: 'orange' },
    }

    const OverDueStageEnum = {
        S1: { text: 'S1'},
        S2: { text: 'S2'},
        S3: { text: 'S3'},
        S4: { text: 'S4'},
        S5: { text: 'S5'},
    }

    const CurrentDayOverDueStageEnum = {
        T0: { text: 'T0'},
        T_1: { text: 'T-1'}
    }

    const FollowUpResultEnum : Record<TFollowUpResult & '', { text: string, color?: string }> = {
        '': { text: t('noRestriction') },
        Promise: { text: t('followUpResultStatus.Promise'), color: '#1890FF'},
        FinancialDifficulties: { text: t('followUpResultStatus.FinancialDifficulties'), color: '#13C2C2'},
        Missed: { text: t('followUpResultStatus.Missed'), color: 'orange'},
        TurnedOff: { text: t('followUpResultStatus.TurnedOff'), color: 'orange'},
        InvalidPhoneNumber: { text: t('followUpResultStatus.InvalidPhoneNumber'), color: 'black'},
        BadAttitude: { text: t('followUpResultStatus.BadAttitude'), color: 'black'},
        Other: { text: t('followUpResultStatus.Other'), color: 'black'},
    }

    const EmergencyContactEnum: Record<TContactPerson, { text: string }> = {
        BORROWER: { text : t('contact.borrower') },
        EMERGENCY_CONTACT1: { text: t('contact.emergency', { count: 1 }) },
        EMERGENCY_CONTACT2: { text: t('contact.emergency', { count: 2 }) },
        CONTACT_LIST: { text: t('contact.list') },
    }

    const GenerateRePayLinkEnum: Record<TGenerateRePayLink, { text: string, copyLabel?: 'string' }> = {
        NONE: { text : t('none') },
        PARTIAL_REPAYMENT: { text : t('partialRepay.button'), copyLabel: t('partialRepay.copyLabel') },
        REPAYMENT_LINK: { text : t('repayLink.button'), copyLabel: t('repayLink.copyLabel') },
        EXTENSION_LINK: { text : t('extensionLink.button'), copyLabel: t('extensionLink.copyLabel') },
    }

    return {
        OrderLabelEnum,
        OrderStatusEnum,
        CurrentDayOverDueStageEnum,
        OverDueStageEnum,
        FollowUpResultEnum,
        EmergencyContactEnum,
        GenerateRePayLinkEnum
    }
}
