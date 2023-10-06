import {z} from 'zod';

export const validationPHMobileNumber = (data: string) => {
  const mobileNumberSchema = z
    .string()
    .refine(
      (value) => value.length === 11,
      'Account number should be 11 digits'
    )
    .refine(
      (value) => value.startsWith('0'),
      'Account number should be 11 digits starting with 0'
    )
    .refine((value) => value !== '', 'This field cannot be left blank.');
  const result = mobileNumberSchema.safeParse(data);
  const isValidation = result.success;
  const errorMessage = !isValidation
    ? result.error.errors[result.error.errors.length - 1].message
    : '';
  return {
    data,
    isValidation,
    errorMessage: errorMessage,
    isEdit: true,
  };
};
