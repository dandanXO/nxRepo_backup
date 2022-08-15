// export default () => {
//     return <div>LoanDetailsPage</div>
// }

import styled from "styled-components";
import React from "react";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import LoanInfo from "../components/LoanInfo";
import { mockGetLoanDetailResponse, GetLoanDetailResponse } from "../../api/getLoanDetail";

const LoanDetailsPageStyled = styled.div`
    padding: 18px;
    background: ${({ theme }) => theme.color.gray100};;
`;

type LoanInfoProps = GetLoanDetailResponse;

const LoanDetailsPage = () => {
 
    return (
        <LoanDetailsPageStyled>
            <Card isHot={true}>
                <CardContent />
            </Card>
            <LoanInfo {...mockGetLoanDetailResponse}/>
        </LoanDetailsPageStyled>
    );
}

export default LoanDetailsPage;
