import React, {useState} from "react";
import {
  IUseBindBankAccountPage,
} from "../types/IUseBindBankAccountPage";
import {CustomPage} from "../../components/CustomPage";
import {ChooseBindMethod} from "./ChooseBindMethod";
import {MobileWalletForm} from "./MobileWalletForm";
import {BankAccountForm} from "./BankAccountForm";

export const PakistanBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  // NOTE: 選擇支付方式
  const [chooseBindMethodValue, setChooseBindMethodValue] = useState<0|1>(0);

  const changeOptionValue = (value: 0|1) => {
    setChooseBindMethodValue(value);
  }
  return (
    <CustomPage>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue} disable={props.bindCardDropListData?.showBankOption || false}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm bindCardDropListData={props.bindCardDropListData} triggerPostBankBindSaveToPKMutation={props.triggerPostBankBindSaveToPKMutation}/>
        ) : (
        <BankAccountForm
          postBankBindSaveToPK={props.postBankBindSaveToPK}
          cardholderName={props.cardholderName}
          bindCardDropListData={props.bindCardDropListData}
          disable={!props.bindCardDropListData?.showBankOption}
        />
      )}
    </CustomPage>
  );
}
