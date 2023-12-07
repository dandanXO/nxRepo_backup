import { useTranslation } from 'react-i18next';

export type TContactPerson = 'BORROWER' | 'EMERGENCY_CONTACT1' | 'EMERGENCY_CONTACT2' | 'CONTACT_LIST';
export type TFollowUpResult =
    | 'Promise'
    | 'FinancialDifficulties'
    | 'Missed'
    | 'TurnedOff'
    | 'InvalidPhoneNumber'
    | 'BadAttitude'
    | 'Other';
export type TGenerateRePayLink = 'NONE' | 'PARTIAL_REPAYMENT' | 'REPAYMENT_LINK' | 'EXTENSION_LINK';

export type TPayOutMethod = 'BANK_ACCOUNT' | 'MOBILE_WALLET';

export type TPayOutStatus = 'fail' | 'finish' | 'pending';

export const useEnum = (
    translationNameSpase?: string,
): {
    OrderLabelEnum: Record<string, { text: string; color?: string }>;
    OrderStatusEnum: any;
    CurrentDayOverDueStageEnum: any;
    OverDueStageEnum: any;
    FollowUpResultEnum: any;
    EmergencyContactEnum: any;
    GenerateRePayLinkEnum: any;
    CurrentDayOrderStatusEnum: any;
    OverDueOrderStatusEnum: any;
    TotalOverdueStageEnum: any;
    PayOutStatusEnum: Map<TPayOutStatus, { text: string; color: string }>;
    PayOutMethodEnum: Map<TPayOutMethod, string>;
} => {
    const { t } = useTranslation(translationNameSpase);

    const CurrentDayOrderStatusEnum = new Map();
    CurrentDayOrderStatusEnum.set('', { text: t('noRestriction') });
    CurrentDayOrderStatusEnum.set(0, { text: t('urgeCollection:currentDayOrderStatus.0'), color: 'blue' });
    CurrentDayOrderStatusEnum.set(1, { text: t('urgeCollection:currentDayOrderStatus.1'), color: 'green' });
    CurrentDayOrderStatusEnum.set(3, { text: t('urgeCollection:currentDayOrderStatus.3'), color: 'volcano' });

    const OverDueOrderStatusEnum = new Map();
    OverDueOrderStatusEnum.set('', { text: t('noRestriction') });
    OverDueOrderStatusEnum.set(0, { text: t('urgeCollection:overDueOrderStatus.0'), color: 'orange' });
    OverDueOrderStatusEnum.set(1, { text: t('urgeCollection:overDueOrderStatus.1'), color: 'green' });

    const OrderLabelEnum = {
        '': { text: t('noRestriction') },
        NewLoan: { text: t('common:orderLabelStatus.newLoan'), color: 'orange' },
        ReLoan: { text: t('common:orderLabelStatus.reLoan'), color: 'blue' },
        Extension: { text: t('common:orderLabelStatus.extension'), color: 'green' },
    };

    const OrderStatusEnum =
        appInfo.COUNTRY !== 'Bangladesh'
            ? {
                  '': { text: t('noRestriction') },
                  '1': { text: '机审中', color: 'default' },
                  '6': { text: '审核中', color: 'blue' },
                  '7': { text: '订单拒绝', color: 'red' },
                  '8': { text: '放款中', color: 'purple' },
                  '9': { text: '还款中', color: 'blue' },
                  '10': { text: t('common:orderStatus.completed'), color: 'green' },
                  '11': { text: '放款失败', color: 'red' },
                  '12': { text: t('common:orderStatus.overDue'), color: 'orange' },
              }
            : {
                  '': { text: t('noRestriction') },
                  '1': { text: '机审中', color: 'default' },
                  '3': { text: '复审中', color: 'cyan' },
                  '6': { text: '终审中', color: 'blue' },
                  '7': { text: '订单拒绝', color: 'red' },
                  '8': { text: '放款中', color: 'purple' },
                  '9': { text: '还款中', color: 'blue' },
                  '10': { text: t('common:orderStatus.completed'), color: 'green' },
                  '11': { text: '放款失败', color: 'red' },
                  '12': { text: t('common:orderStatus.overDue'), color: 'orange' },
              };

    const OverDueStageEnum = {
        S1: { text: 'S1' },
        S2: { text: 'S2' },
        S3: { text: 'S3' },
        S4: { text: 'S4' },
        S5: { text: 'S5' },
    };

    const CurrentDayOverDueStageEnum = {
        T0: { text: 'T0' },
        T_1: { text: 'T-1' },
    };

    const TotalOverdueStageEnum = {
        ...CurrentDayOverDueStageEnum,
        ...OverDueStageEnum,
    };

    const FollowUpResultEnum: Record<TFollowUpResult & '', { text: string; color?: string }> = {
        '': { text: t('noRestriction') },
        Promise: { text: t('common:followUpResultStatus.Promise'), color: '#1890FF' },
        FinancialDifficulties: { text: t('common:followUpResultStatus.FinancialDifficulties'), color: '#13C2C2' },
        Missed: { text: t('common:followUpResultStatus.Missed'), color: 'orange' },
        TurnedOff: { text: t('common:followUpResultStatus.TurnedOff'), color: 'orange' },
        InvalidPhoneNumber: { text: t('common:followUpResultStatus.InvalidPhoneNumber'), color: 'black' },
        BadAttitude: { text: t('common:followUpResultStatus.BadAttitude'), color: 'black' },
        Other: { text: t('common:followUpResultStatus.Other'), color: 'black' },
    };

    const EmergencyContactEnum: Record<TContactPerson, { text: string }> = {
        BORROWER: { text: t('common:contact.borrower') },
        EMERGENCY_CONTACT1: { text: t('common:contact.emergency', { count: 1 }) },
        EMERGENCY_CONTACT2: { text: t('common:contact.emergency', { count: 2 }) },
        CONTACT_LIST: { text: t('common:contact.list') },
    };

    const GenerateRePayLinkEnum: Record<TGenerateRePayLink, { text: string; copyLabel?: 'string' }> = {
        NONE: { text: t('none') },
        PARTIAL_REPAYMENT: {
            text: t('urgeCollection:partialRepay.button'),
            copyLabel: t('urgeCollection:partialRepay.copyLabel'),
        },
        REPAYMENT_LINK: {
            text: t('urgeCollection:repayLink.button'),
            copyLabel: t('urgeCollection:repayLink.copyLabel'),
        },
        EXTENSION_LINK: {
            text: t('urgeCollection:extensionLink.button'),
            copyLabel: t('urgeCollection:extensionLink.copyLabel'),
        },
    };

    const PayOutStatusEnum: Map<TPayOutStatus, { text: string; color: string }> = new Map([
        ['finish', { text: t('order:payOutSuccess'), color: 'blue' }],
        ['fail', { text: t('order:payOutFail'), color: 'red' }],
        ['pending', { text: t('order:payOutPending'), color: '' }],
    ]);

    const PayOutMethodEnum: Map<TPayOutMethod, string> = new Map([
        ['BANK_ACCOUNT', t('common:bankCard')],
        ['MOBILE_WALLET', t('common:eWallet')],
    ]);

    return {
        OverDueOrderStatusEnum,
        CurrentDayOrderStatusEnum,
        OrderLabelEnum,
        OrderStatusEnum,
        CurrentDayOverDueStageEnum,
        OverDueStageEnum,
        FollowUpResultEnum,
        EmergencyContactEnum,
        GenerateRePayLinkEnum,
        TotalOverdueStageEnum,
        PayOutStatusEnum,
        PayOutMethodEnum,
    };
};
