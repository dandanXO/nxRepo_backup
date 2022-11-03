import React from "react";
import { usePostBankBindSaveMutation } from "../../api";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import {environment} from "../../../environments/environment";
import {IndiaCountry} from "../../../environments/countries/IndiaCountry";
import {PakistanCountry} from "../../../environments/countries/PakistanCountry";
import {IndiaBindBankAccountPage} from "./i18n/pageByCountry/IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "./i18n/pageByCountry/PakistanBindBankAccountPage";

const BindBankAccountPage = () => {
    const [postBankBindSave] = usePostBankBindSaveMutation();
    const pageQueryString = useLocationOrderQueryString();
    const cardholderName = pageQueryString.cardholderName;

    // NOTICE:
    if(environment.country === IndiaCountry.country) {
      return (
        <IndiaBindBankAccountPage postBankBindSave={postBankBindSave} cardholderName={cardholderName ?? ""}/>
      );
    } else if(environment.country === PakistanCountry.country){
      return (
        <PakistanBindBankAccountPage postBankBindSave={postBankBindSave} cardholderName={cardholderName ?? ""}/>
      );
    } else {
      return (
        <IndiaBindBankAccountPage postBankBindSave={postBankBindSave} cardholderName={cardholderName ?? ""}/>
      );
    }
};

export default BindBankAccountPage;
