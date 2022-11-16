import React, {useState} from "react";
import {
  IUseBindBankAccountPage,
} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {ChooseBindMethod} from "./ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";
import {BankAccountForm} from "./BankAccountForm";
import {useBindBankAccountPage} from "../../hooks/useBindBankAccountPage";

export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(0);

  const changeOptionValue = (value: 0|1) => {
    setChooseBindMethodValue(value);
  }

  // NOTICE: REFACTOR ME
  const {
    // ifscData,
    // onIFSCChange,
    // onIFSCBlur,
    bankcardNoData,
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    // upiData,
    // onUPIIDChange,
    isFormPending,
    confirm
  } = useBindBankAccountPage(props);

  return (
    <CustomPage>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue} disable={props.bindCardDropListData?.showBankOption || false}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm bindCardDropListData={props.bindCardDropListData} triggerPostBankBindSaveToPKMutation={props.triggerPostBankBindSaveToPKMutation}/>
        ) : (
          <BankAccountForm
            isFormPending={isFormPending}
            cardholderName={props.cardholderName}
            bankcardNoData={bankcardNoData}
            onAccountNumberChange={onAccountNumberChange}
            onAccountNumberBlur={onAccountNumberBlur}
            confirmedBankcardNoData={confirmedBankcardNoData}
            onConfirmAccountNumberChange={onConfirmAccountNumberChange}
            onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
            bankDropList={bankDropList}
            bankAccountValue={bankAccountValue}
            bindCardDropListData={props.bindCardDropListData}
            onIFSCDropSelect={onIFSCDropSelect}
            confirm={confirm}
          />
        )}
    </CustomPage>
  );
}
