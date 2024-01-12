import i18next from 'i18next';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';


import { i18nBankBindAccountPage } from '../../../translations';
import { InputValue } from 'apps/app/src/app/ui/core-components/form/InputValue';

const ValidationInfo = {
  min1: i18next.t('This field cannot be left blank', {
    ns: i18nBankBindAccountPage.namespace,
  }),
};

// NOTE: 印度單一銀行專用
export const useIndiaBankAccountForm = () => {
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  // NOTE: FormInput - IFSC
  const [ifscData, setIFSCData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  // NOTE: FormInput - IFSC
  const [confirmIFSCData, setConfirmIFSCData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  const validateIFSC = (ifscValue: string) => {
    const ifscRex = new RegExp('^[A-Za-z]{4}0[0-9]{6}$');
    const invalidErrorMessage = t(
      'The IFSC code must consist of 11 characters. Please ensure that you have entered the correct format.'
    );
    const ifscScheme = z
      .string()
      .min(1, ValidationInfo.min1)
      .length(11, invalidErrorMessage)
      .regex(ifscRex, invalidErrorMessage);

    const result = ifscScheme.safeParse(ifscValue);
    const isValidation = result.success;
    const errorMessage = !isValidation ? result.error.format()._errors[0] : '';

    return {
      data: ifscValue,
      isValidation,
      errorMessage,
      isEdit: true,
    };
  };

  const validateConfirmIFSCData = (confirmIFSCValue: string) => {

    const isValidation = confirmIFSCValue === ifscData.data

    return {
      data: confirmIFSCValue,
      isValidation,
      errorMessage: !isValidation ? t('Please make sure your IFSC code match.'): '',
      isEdit: true
    }
  }


  // NOTE: FormInput - UPI
  const [upiData, setUpiData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
    isEdit: false,
  });

  const validateUpiId = (upiIdValue: string) => {
    if (upiData.data === '') {
      return ({
        data: upiIdValue,
        isValidation: true,
        errorMessage: '',
        isEdit: false,
      });
    } else {
      const upiIdRex = new RegExp('^[\\w.-]{2,256}@[a-zA-Z]{2,64}$');
      const upiIdSchema = z
        .string()
        .regex(
          upiIdRex,
          t(
            'Invalid UPI ID format. Please retry or refer to the provided instructions and try again.'
          ) as string
        );

      const result = upiIdSchema.safeParse(upiData.data);
      const isValidation = result.success;
      const errorMessage = !isValidation
        ? result.error.format()._errors[0]
        : '';

      return ({
        data: upiIdValue,
        isValidation,
        errorMessage,
        isEdit: true,
      });
    }
  };


  // validate
  const validate = () => {
    // NOTE: FormInput
    setIFSCData(validateIFSC(ifscData.data))
    setConfirmIFSCData(validateConfirmIFSCData(confirmIFSCData.data))
    setUpiData(validateUpiId(upiData.data))
    return ifscData.isValidation && confirmIFSCData.isValidation && upiData.isValidation
  };

  return {
    // NOTE: form
    validate,

    // NOTE: IFSC
    setIFSCData,
    ifscData,
    validateIFSC,

    // NOTE: Confirm IFSC
    confirmIFSCData,
    setConfirmIFSCData,
    validateConfirmIFSCData,

    // NOTE: UPI
    setUpiData,
    upiData,
    validateUpiId
  };
};
