import styled from "styled-components";
import React, { useState } from "react";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisment"
import { useGetLoanDetailQuery } from "../../api";
import ExtensionDetailModal from "../ExtensionDetailModal";

const LoanDetailsPageStyled = styled.div`
    padding: 18px;
    background: ${({ theme }) => theme.color.gray100};
`;

const LoanDetailsPage = () => {
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({ orderNo: "no-3632791101642108"});
    const [showExtensionModal, setShowExtensionModal] = useState(false);
    console.log("currentData", currentData);
    // if(isLoading) return <div>isLoading</div>
    // if(isFetching) return <div>isFetching</div>
    return (
        <LoanDetailsPageStyled>
            {showExtensionModal && <ExtensionDetailModal />}
            <LoanInfo {...currentData} setShowExtensionModal={setShowExtensionModal} />
            <LoanDetail {...currentData} />
            <Advertisment />
        </LoanDetailsPageStyled>
    );
}

export default LoanDetailsPage;
