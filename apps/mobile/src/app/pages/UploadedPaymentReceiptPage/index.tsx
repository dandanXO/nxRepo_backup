import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import { useCallback } from "react";
import { Page, Button } from "@frontend/mobile/shared/ui";
import { SuccessICON } from "./i18n/SuccessICON";

const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: calc(100vh - 18px);
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin: 30px 0;
`;
const Description = styled.div`
    font-size: 14px;
    font-weight: 300;
    color: #aaaaaa;
    text-align: center;
`;
const ControlSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
interface UploadedPaymentReceiptPage {
    navigateToLoanDetails: () => void;
}

export const PureUploadedPaymentReceiptPage = (
    props: UploadedPaymentReceiptPage
) => {
    return (
        <CustomPage>
            <Content>
                <SuccessICON />
                <Title>Upload payment receipt</Title>
                <Description>
                    Thank you. Your receipt has been uploaded successfully.
                </Description>
            </Content>
            <ControlSection>
                <Button onClick={() => props.navigateToLoanDetails()}>
                    Done
                </Button>
            </ControlSection>
        </CustomPage>
    );
};

const UploadedPaymentReceiptPage = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const navigateToLoanDetails = useCallback(() => {
        navigate(
            `/loan-details?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`
        );
    }, [pageQueryString.token, pageQueryString.orderNo]);

    return (
        <PureUploadedPaymentReceiptPage
            navigateToLoanDetails={navigateToLoanDetails}
        />
    );
};

export default UploadedPaymentReceiptPage;
