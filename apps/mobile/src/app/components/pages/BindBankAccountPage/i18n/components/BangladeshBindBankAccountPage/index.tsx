import React from "react";
import {IUseBindBankAccountPageForBangladesh,} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {MobileWalletForm} from "./MobileWalletForm";
import {useBangladeshMobileWalletForm} from "../../hooks/bangladesh/useBangladeshMobileWalletForm";
import {ChooseBindMethod} from "../PakistanBindBankAccountPage/ChooseBindMethod";

export const BangladeshBindBankAccountPage = (props: IUseBindBankAccountPageForBangladesh) => {

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
  } = useBangladeshMobileWalletForm({
    triggerPostBankBindSaveToBangladeshMutation: props.triggerPostBankBindSaveToBangladeshMutation,
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
