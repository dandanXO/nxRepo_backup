import {useTranslation} from "react-i18next";

export const useOrderLabelEnum = () => {
    const { t }  = useTranslation()

    const OrderLabelEnum = {
        '': { text: t('noRestriction')  },
        'NewLoan': { text: t('orderLabelStatus.newLoan'), color:'orange'},
        'ReLoan': { text: t('orderLabelStatus.reLoan'), color: 'blue'},
        'Extension': { text: t('orderLabelStatus.extension'), color: 'green'}
    }
    return { OrderLabelEnum }
}
