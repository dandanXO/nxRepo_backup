import React from "react";
import {PureBindBankAccountPageProps} from "../../types/PureBindBankAccountPageProps";
import {PureBindBankAccountPage} from "../../PureBindBankAccountPage";
import {PageLayoutTemplate2} from "../pageByLayout/PageLayoutTemplate2";
import {CustomPage} from "../../components/CustomPage";

export const PakistanBindBankAccountPage = (props: Omit<PureBindBankAccountPageProps, "layout">) => {
  return (
    <CustomPage>
      <PureBindBankAccountPage
        postBankBindSave={props.postBankBindSave}
        cardholderName={props.cardholderName ? props.cardholderName : ""}
        layout={PageLayoutTemplate2}
      />
    </CustomPage>
  );
}
