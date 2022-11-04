import React, {useState} from "react";
import {PureBindBankAccountPageProps} from "../../../types/PureBindBankAccountPageProps";
import {useBindBankAccountPage} from "../../../useBindBankAccountPage";
import {BankAccountTemplate2} from "../../bankAccountByLayout/BankAccountTemplate2";
import {CustomPage} from "../../../components/CustomPage";
import {ChooseBindMethod} from "./ChooseBindMethod/ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";

export const PakistanBindBankAccountPage = (props: Omit<PureBindBankAccountPageProps, "layout">) => {
  const {
    ifscData,
    onIFSCChange,
    onIFSCBlur,
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    upiData,
    onUPIIDChange,
    isFormPending,
    confirm
  } = useBindBankAccountPage(props);

  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(0);

  const changeOptionValue = () => {
    setChooseBindMethodValue(chooseBindMethodValue === 0 ? 1 : 0);
  }

  return (
    <CustomPage>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm confirm={confirm} isFormPending={isFormPending}/>
        ) : (
        <BankAccountTemplate2 cardholderName={props.cardholderName}
                              ifscData={ifscData}
                              onIFSCChange={onIFSCChange}
                              onIFSCBlur={onIFSCBlur}
                              bankcardNoData={bankcardNoData}
                              onAccountNumberChange={onAccountNumberChange}
                              onAccountNumberBlur={onAccountNumberBlur}
                              confirmedBankcardNoData={confirmedBankcardNoData}
                              onConfirmAccountNumberChange={onConfirmAccountNumberChange}
                              onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
                              upiData={upiData} onUPIIDChange={onUPIIDChange}
                              isFormPending={isFormPending}
                              confirm={confirm}
        />
      )}


    </CustomPage>
  );
}
