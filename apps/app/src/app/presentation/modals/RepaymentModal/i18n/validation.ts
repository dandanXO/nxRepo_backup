import { environment } from "apps/app/src/environments/environmentModule/environment";
import i18next, { t } from "i18next";
import { z } from "zod";

export const validateBalance = (data: any) => {
    const currency = environment.currency.split('');
    currency.forEach(i => {
        data = data.replace(i, '').trim()
    })

    let errorMessage = ''

    if (data === '' || Number(data) === 0) {
        errorMessage = 'This field cannot be left blank or 0.';
    } else if (!new RegExp('^[0-9]*$').test(data)) {
        errorMessage = 'Numbers only. Please try again.';
    } else if (Number(data) > Number(10000)) {
        // NOTE: 限制數字最大值
        errorMessage = 'Amount cannot be greater than the repayment balance.';
    } else {
        errorMessage = '';
    }
    return {
        data: `${environment.currency} ${data}`,
        isValidation: errorMessage === '',
        errorMessage,
        isEdit: true
    }
};
