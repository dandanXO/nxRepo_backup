import styled from "styled-components";
import React from "react";
import LoanInfo from "../components/LoanInfo";
import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisment"

import {useGetLoanDetailQuery} from "../../api";

const LoanDetailsPageStyled = styled.div`
    padding: 18px;
    background: ${({ theme }) => theme.color.gray100};
`;

const LoanDetailsPage = () => {
    const { currentData, isSuccess } = useGetLoanDetailQuery("no-3632791101642108");
    console.log("currentData", currentData);
    return (
        <LoanDetailsPageStyled>
            <LoanInfo {...currentData}/>
            <LoanDetail {...currentData}/>
            <Advertisment/>
        </LoanDetailsPageStyled>
    );
}

export default LoanDetailsPage;
