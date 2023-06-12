import {useTranslation} from "react-i18next";

export const useOrderStatusEnum = () => {
    const { t } = useTranslation();

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

    return { OrderStatusEnum }
}
