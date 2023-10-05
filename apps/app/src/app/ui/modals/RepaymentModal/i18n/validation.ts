import { environment } from 'apps/app/src/environments/environmentModule/environment';
import i18next, { t } from 'i18next';
import { z } from 'zod';

export const validateBalance = (
  data: any,
  balance: string,
  showCurrency = true,
  ignoreOver = true
) => {
  const currency = environment.currency.split('');
  currency.forEach((i) => {
    data = data.replace(i, '').trim();
  });

  let errorMessage = '';

  if (data === '' || Number(data) === 0) {
    errorMessage = 'This field cannot be left blank or 0.';
  } else if (!new RegExp('^[0-9]*$').test(data)) {
    errorMessage = 'Numbers only. Please try again.';
  } else if (Number(data) > Number(balance)) {
    if (ignoreOver) {
      // NOTE: 限制數字最大值
      errorMessage = 'Amount cannot be greater than the repayment balance.';
    } else {
      errorMessage = '';
      data = `${balance}`;
    }
  } else {
    errorMessage = '';
  }
  return {
    data: showCurrency ? `${environment.currency} ${data}` : data,
    isValidation: errorMessage === '',
    errorMessage,
    isEdit: true,
  };
};
