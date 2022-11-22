import React from "react";
import {IUseBindBankAccountPageForBengal,} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {MobileWalletForm} from "./MobileWalletForm";
import {useBengalMobileWalletForm} from "../../hooks/bengal/useBengalMobileWalletForm";

export const BengalBindBankAccountPage = (props: IUseBindBankAccountPageForBengal) => {

  const {
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    // Form
    isFormPending,
    confirm,
  } = useBengalMobileWalletForm({
    triggerPostBankBindSaveToBengalMutation: props.triggerPostBankBindSaveToBengalMutation,
  })

  return (
    <CustomPage>
      <MobileWalletForm
        mobileData={mobileData}
        onMobileDataChange={onMobileDataChange}
        validateMobileWalletAccount={validateMobileWalletAccount}
        isFormPending={isFormPending}
        confirm={confirm}
      />
    </CustomPage>
  );
}
