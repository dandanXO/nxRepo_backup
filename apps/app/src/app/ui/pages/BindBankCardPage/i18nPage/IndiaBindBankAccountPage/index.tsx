import React from 'react';
import { useNavigate } from 'react-router';

import { useBindBankAccountForm } from '../../hooks/common/useBindBankAccountForm';
import { useFinishedBindBankAccountForm } from '../../hooks/common/useFinishedBindBankAccountForm';
import { useIndiaBankAccountForm } from '../../hooks/i18n/india/useIndiaBankAccountForm';
import { IUseBindBankAccountPage } from '../types/IUseBindBankAccountPage';
import { BankAccountForm } from './BankAccountForm';

export const IndiaBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  const navigate = useNavigate();
  const {
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    validate: validateCommonForm,
  } = useBindBankAccountForm();
  const {
    // NOTE: form
    validate: validateIndiaForm,
    // NOTE: IFSC
    ifscData,
    setIFSCData,
    validateIFSC,
    // NOTE: confirm IFSC
    confirmIFSCData,
    setConfirmIFSCData,
    validateConfirmIFSCData,
    // NOTE: UPI
    upiData,
    setUpiData,
    validateUpiId
  } = useIndiaBankAccountForm();

  const { isFormPending, confirm } = useFinishedBindBankAccountForm({
    // NOTICE: Common
    bankcardNoData,
    // NOTICE: India
    isLoadingPostBankBindSave: props.isLoadingPostBankBindSave || false,
    postBankBindSave: props.postBankBindSave,
    ifscData,
    upiData,
  });

  return (
    <BankAccountForm
      cardholderName={props.cardholderName}
      ifscData={ifscData}
      setIFSCData={setIFSCData}
      validateIFSC={validateIFSC}
      confirmIFSCData={confirmIFSCData}
      setConfirmIFSCData={setConfirmIFSCData}
      validateConfirmIFSCData={validateConfirmIFSCData}
      bankcardNoData={bankcardNoData}
      onAccountNumberChange={onAccountNumberChange}
      onAccountNumberBlur={onAccountNumberBlur}
      confirmedBankcardNoData={confirmedBankcardNoData}
      onConfirmAccountNumberChange={onConfirmAccountNumberChange}
      onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
      upiData={upiData}
      setUpiData={setUpiData}
      validateUpiId={validateUpiId}
      isFormPending={isFormPending || false}
      confirm={() => {
        // NOTE: validate and display errors
        const validation = validateCommonForm();
        const validation2 = validateIndiaForm();
        if (validation && validation2) confirm();
      }}
    />
  );
};
