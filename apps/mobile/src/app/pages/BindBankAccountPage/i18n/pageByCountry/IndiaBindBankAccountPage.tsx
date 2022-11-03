import {PureBindBankAccountPage} from "../../PureBindBankAccountPage";
import {PageLayoutTemplate1} from "../pageByLayout/PageLayoutTemplate1";
import React from "react";
import {PureBindBankAccountPageProps} from "../../types/PureBindBankAccountPageProps";
import {CustomPage} from "../../components/CustomPage";

export const IndiaBindBankAccountPage = (props: Omit<PureBindBankAccountPageProps, "layout">) => {
  return (
    <CustomPage>
      <PureBindBankAccountPage
        postBankBindSave={props.postBankBindSave}
        cardholderName={props.cardholderName ? props.cardholderName : ""}
        layout={PageLayoutTemplate1}
      />
    </CustomPage>
  );
}
