import { z } from 'zod';

export const validationPHMobileNumber = (data: string) => {
  const mobileNumberSchema = z
    .string()
    .min(11, 'Account number should be 11 digits starting with 0')
    .refine(
      (value) => value.startsWith('0'),
      'Account number should be 11 digits starting with 0'
    );
  const result = mobileNumberSchema.safeParse(data);
  const isValidation = result.success;
  console.log(isValidation);
  const errorMessage = !isValidation ? result.error.format()._errors[0] : '';
  return {
    data,
    isValidation,
    errorMessage: errorMessage,
    isEdit: true,
  };
};
