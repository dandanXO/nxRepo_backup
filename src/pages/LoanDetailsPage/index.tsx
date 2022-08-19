import styled from "styled-components";
import React, { useState } from "react";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisment"
import AmountPaidModal from "../components/modal/AmountPaidModal";
import { useGetLoanDetailQuery } from "../../api";
import ExtensionDetailModal from "./modal/ExtensionDetailModal";
import Page from "../../core/components/Page";


const LoanDetailsPage = () => {
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: "no-3632791101642108"});
    const [showExtensionModal, setShowExtensionModal] = useState(false);

    console.log("currentData", currentData);
    // if(isLoading) return <div>isLoading</div>
    // if(isFetching) return <div>isFetching</div>
    return (
        <Page>
            {showExtensionModal && <ExtensionDetailModal />}
            {currentData && <AmountPaidModal {...currentData}/>}
            <LoanInfo {...currentData} setShowExtensionModal={setShowExtensionModal} />
            <LoanDetail {...currentData} />
            <Advertisment />
        </Page>
    );
}

export default LoanDetailsPage;
