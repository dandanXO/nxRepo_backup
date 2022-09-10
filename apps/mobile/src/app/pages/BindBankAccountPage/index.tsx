import React from "react";
import { usePostBankBindSaveMutation } from "../../api";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import { PureBindBankAccountPage } from "./PureBindBankAccountPage";

const BindBankAccountPage = () => {
    const [postBankBindSave] = usePostBankBindSaveMutation();
    const pageQueryString = useLocationOrderQueryString();
    const cardholderName = pageQueryString.cardholderName;
    return (
        <PureBindBankAccountPage
            postBankBindSave={postBankBindSave}
            cardholderName={cardholderName ? cardholderName : ""}
        />
    );
};
export default BindBankAccountPage;
