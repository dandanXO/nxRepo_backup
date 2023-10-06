import i18next from 'i18next';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import type { InputValue } from '@frontend/mobile/shared/ui';

import { i18nBankBindAccountPage } from '../../../translations';

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
  });

  // validateIFSC
  const validateIFSC = useCallback(() => {
    const ifscRex = new RegExp('^[A-Za-z]{4}0[A-Za-z0-9]{6}$');
    const invalidErrorMessage = t(
      'The IFSC code must consist of 11 characters. Please ensure that you have entered the correct format.'
    );
    const ifscScheme = z
      .string()
      .min(1, ValidationInfo.min1)
      .length(11, invalidErrorMessage)
      .regex(ifscRex, invalidErrorMessage);

    const result = ifscScheme.safeParse(ifscData.data);
    const isValidation = result.success;
    const errorMessage = !isValidation ? result.error.format()._errors[0] : '';

    setIFSCData({
      ...ifscData,
      isValidation,
      errorMessage,
    });
    return isValidation;
  }, [ifscData.data]);

  // onIFSCChange
  const onIFSCChange = (event: any) => {
    const data = event.target.value;
    // data = data.replace(/[^a-zA-Z0-9]/g, "");
    setIFSCData({
      ...ifscData,
      data,
    });
  };

  // onIFSCBlur
  const onIFSCBlur = () => {
    validateIFSC();
  };

  // NOTE: FormInput - UPI
  const [upiData, setUpiData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const validateUPIID = useCallback(() => {
    if (upiData.data === '') {
      return true;
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

      setUpiData({
        ...upiData,
        isValidation,
        errorMessage,
      });

      return isValidation;
    }
  }, [upiData.data]);

  // onUPIIDChange
  const onUPIIDChange = (event: any) => {
    setUpiData({
      ...upiData,
      data: event.target.value,
      errorMessage: event.target.value === '' ? '' : upiData.errorMessage,
    });
  };

  const onUPIIDChangBlur = () => {
    validateUPIID();
  };

  // validate
  const validate = useCallback(() => {
    // NOTE: FormInput
    return validateIFSC() && validateUPIID();
  }, [ifscData.data, upiData.data]);

  return {
    // NOTE: form
    validate,
    // NOTE: IFSC
    ifscData,
    onIFSCChange,
    onIFSCBlur,
    // NOTE: UPI
    upiData,
    onUPIIDChange,
    onUPIIDChangBlur,
  };
};
