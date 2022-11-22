import React from "react";
import {IUseBindBankAccountPageForBengal,} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {MobileWalletForm} from "./MobileWalletForm";
import {useBengalMobileWalletForm} from "../../hooks/bengal/useBengalMobileWalletForm";
import {ChooseBindMethod} from "../PakistanBindBankAccountPage/ChooseBindMethod";

export const BengalBindBankAccountPage = (props: IUseBindBankAccountPageForBengal) => {

  const {
    // mobile
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    // confirmedMobile
    confirmedMobileData,
    onConfirmedMobileDataChange,
    onConfirmedMobileDataBlur,
    // Form
    isFormPending,
    confirm,
  } = useBengalMobileWalletForm({
    triggerPostBankBindSaveToBengalMutation: props.triggerPostBankBindSaveToBengalMutation,
  })

  return (
    <CustomPage>
      <ChooseBindMethod
        value={0}
        changeOptionValueCallback={() => {
          //
        }}
        disable={true}
      />
      <MobileWalletForm
        mobileData={mobileData}
        onMobileDataChange={onMobileDataChange}
        validateMobileWalletAccount={validateMobileWalletAccount}
        confirmedMobileData={confirmedMobileData}
        onConfirmedMobileDataChange={onConfirmedMobileDataChange}
        onConfirmedMobileDataBlur={onConfirmedMobileDataBlur}
        isFormPending={isFormPending}
        confirm={confirm}
      />
    </CustomPage>
  );
}
