import styled from "styled-components";
import React, { useState } from "react";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisment"
import AmountPaidModal from "../components/modal/AmountPaidModal/AmountPaidModal";
import ExtendModal from "../components/modal/ExtendModal/ExtendModal";
import { useGetLoanDetailQuery } from "../../api";
import ExtensionDetailModal from "./modal/ExtensionDetailModal";
import Page from "../../core/components/Page";


const LoanDetailsPage = () => {
    // const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: "no-3632791101642108"});
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: "no-7864747613693247"});

    const [showExtendModal, setShowExtendModal] = useState(false);
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    const [showAmountPaidModal, setShowAmountPaidModal] = useState(false);

    // console.log("currentData", currentData);
    // if(isLoading) return <div>isLoading</div>
    // if(isFetching) return <div>isFetching</div>
    return (
        <Page>
            {showExtendModal&&<ExtendModal setShowExtendModal={setShowExtendModal} {...currentData} />}
            {showExtensionModal && <ExtensionDetailModal setShowExtensionModal={setShowExtensionModal}/>}
            {currentData && showAmountPaidModal && <AmountPaidModal {...currentData} setShowAmountPaidModal={setShowAmountPaidModal}/>}
            <LoanInfo {...currentData} setShowExtensionModal={setShowExtensionModal} setShowAmountPaidModal={setShowAmountPaidModal}/>
            <LoanDetail {...currentData} setShowExtendModal={setShowExtendModal}/>
            <Advertisment />
        </Page>
    );
}

export default LoanDetailsPage;
