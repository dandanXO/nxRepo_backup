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

  const changeOptionValue = (value: 0|1) => {
    setChooseBindMethodValue(value);
  }
  return (
    <CustomPage>
      <ChooseBindMethod value={chooseBindMethodValue} changeOptionValueCallback={changeOptionValue} disable={props.bindCardDropListData?.showBankOption || false}/>
      {chooseBindMethodValue === 0 ? (
        <MobileWalletForm bindCardDropListData={props.bindCardDropListData} triggerPostBankBindSaveToPKMutation={props.triggerPostBankBindSaveToPKMutation}/>
        ) : (
        <BankForm
          postBankBindSaveToPK={props.postBankBindSaveToPK}
          cardholderName={props.cardholderName}
          bindCardDropListData={props.bindCardDropListData}
          disable={!props.bindCardDropListData?.showBankOption}
        />
      )}
    </CustomPage>
  );
}
