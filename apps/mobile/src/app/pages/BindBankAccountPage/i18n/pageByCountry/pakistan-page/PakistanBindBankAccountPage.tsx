import React, {useState} from "react";
import {
  PureBindBankAccountPageProps,
} from "../../../types/PureBindBankAccountPageProps";
import {CustomPage} from "../../../components/CustomPage";
import {ChooseBindMethod} from "./ChooseBindMethod/ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";
import {BankForm} from "./BankForm";

export const PakistanBindBankAccountPage = (props: PureBindBankAccountPageProps) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(0);

  const changeOptionValue = () => {
    setChooseBindMethodValue(chooseBindMethodValue === 0 ? 1 : 0);
  }
  return (
    <CustomPage>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm/>
        ) : (
        <BankForm postBankBindSaveToPK={props.postBankBindSaveToPK} cardholderName={props.cardholderName}/>
      )}
    </CustomPage>
  );
}
