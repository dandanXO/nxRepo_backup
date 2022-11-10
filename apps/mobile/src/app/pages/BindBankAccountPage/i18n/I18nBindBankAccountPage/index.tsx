import React from "react";
import {environment} from "../../../../../environments/environment";
import {IndiaCountry} from "../../../../../environments/countries/IndiaCountry";
import {IndiaBindBankAccountPage} from "./india/IndiaBindBankAccountPage";
import {PakistanCountry} from "../../../../../environments/countries/PakistanCountry";
import {PakistanBindBankAccountPage} from "./pakistan/PakistanBindBankAccountPage";
import {PureBindBankAccountPageProps} from "../../types/PureBindBankAccountPageProps";

export const I18nBindBankAccountPage = (props: PureBindBankAccountPageProps) => {
  // NOTICE:
  if(environment.country === IndiaCountry.country) {
    // NOTICE: India
    return (
      <IndiaBindBankAccountPage
        postBankBindSave={props.postBankBindSave}
        cardholderName={props.cardholderName ?? ""}
      />
    );
  } else if(environment.country === PakistanCountry.country){
    // NOTICE: Pakistan
    return (
      <PakistanBindBankAccountPage
        postBankBindSaveToPK={props.postBankBindSaveToPK}
        triggerPostBankBindSaveToPKMutation={props.triggerPostBankBindSaveToPKMutation}
        bindCardDropListData={props.bindCardDropListData}
        cardholderName={props.cardholderName ?? ""}

      />
    );
  } else {
    // NOTICE: India
    return (
      <IndiaBindBankAccountPage
        postBankBindSave={props.postBankBindSave}
        cardholderName={props.cardholderName ?? ""}
      />
    );
  }
}
