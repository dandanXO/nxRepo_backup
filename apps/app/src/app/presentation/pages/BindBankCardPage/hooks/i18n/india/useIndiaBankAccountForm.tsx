import React, { useCallback, useState } from 'react';
import type { InputValue } from '@frontend/mobile/shared/ui';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
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
    let isValidation = false;
    const ifscScheme = z
      .string()
      .min(1, ValidationInfo.min1)
      .length(11, t('IFSC must be 11 digits only.') as string);
    const result = ifscScheme.safeParse(ifscData.data);
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setIFSCData({
        ...ifscData,
        isValidation: false,
        errorMessage,
      });
      isValidation = false;
    } else {
      setIFSCData({
        ...ifscData,
        isValidation: true,
        errorMessage: '',
      });
      isValidation = true;
    }
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
    // isValidation: false,
    // errorMessage: "",
  });

  // onUPIIDChange
  const onUPIIDChange = (event: any) => {
    setUpiData({
      ...upiData,
      data: event.target.value,
    });
  };

  // validate
  const validate = useCallback(() => {
    // NOTE: FormInput
    const isValidation = validateIFSC();
    // console.log("isValidation", isValidation);
    return isValidation;
  }, [ifscData.data]);

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
  };
};
