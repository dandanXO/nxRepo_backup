// export default () => {
//     return <div>LoanDetailsPage</div>
// }

import styled from "styled-components";
import React from "react";
import Card from "../../core/components/Card";
import CardContent from "../../core/components/CardContent";
import LoanInfo from "../components/LoanInfo";

import LoanDetail from "../components/LoanDetail";
import Advertisment from "../components/Advertisment"
import { mockGetLoanDetailResponse, GetLoanDetailResponse } from "../../api/getLoanDetail";



const LoanDetailsPageStyled = styled.div`
    padding: 18px;
    background: ${({ theme }) => theme.color.gray100};
`;

type LoanInfoProps = GetLoanDetailResponse;


   

const LoanDetailsPage = () => {
 
    return (
        <LoanDetailsPageStyled>


            <LoanInfo {...mockGetLoanDetailResponse}/>
            <LoanDetail {...mockGetLoanDetailResponse}/>
            <Advertisment/>
        </LoanDetailsPageStyled>
    );
}

export default LoanDetailsPage;
