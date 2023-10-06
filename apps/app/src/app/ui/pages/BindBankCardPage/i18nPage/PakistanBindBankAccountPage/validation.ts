import i18next, { t } from 'i18next';
import { z } from 'zod';

const ValidationInfo = {
  min1: i18next.t('This field cannot be left blank'),
};
export const validateBankcardNo = (data: any) => {
  const bankCardNoScheme = z
    .string()
    .min(1, ValidationInfo.min1)
    .min(
      9,
      t('Account number must be between from 9 to 18 digits only.') as string
    )
    .max(
      18,
      t('Account number must be between from 9 to 18 digits only.') as string
    );
  const result = bankCardNoScheme.safeParse(data);
  const isValidation = result.success;
  const errorMessage = !isValidation ? result.error.format()._errors[0] : '';
  return {
    data,
    isValidation,
    errorMessage,
    isEdit: true,
  };
};

export const validateMobile = (data: string) => {
  const message = t(
    'Account number should be 10 or 10 digits starting with 0.'
  );
  const scheme = z.string().regex(/^0/, message).length(11, message);
  const scheme2 = z.string().length(10, message);
  const result = z.union([scheme, scheme2]).safeParse(data);

  const isValidation = result.success;
  const errorMessage = !isValidation ? result.error.format()._errors[0] : '';
  return {
    data,
    isValidation,
    errorMessage,
    isEdit: true,
  };
};
