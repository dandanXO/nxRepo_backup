import Page from "../../core/components/Page";
import styled from "styled-components";
import {SuccessICON} from "../../core/components/Icon/Icon";
import Button from "../../core/components/Button";
import {useNavigate} from "react-router-dom";
import useLocationOrderQueryString from "../../core/useLocationOrderQueryString";
const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: calc(100vh - 18px);
`
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
`
const Description = styled.div`
    font-size: 14px;
    font-weight: 300;
    color: #aaaaaa;
    text-align: center;   
`
const ControlSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const UploadedPaymentReceiptPage = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    return (
        <CustomPage>
            <Content>
                <SuccessICON/>
                <Title>Upload payment receipt</Title>
                <Description>Thank you. Your receipt has been uploaded successfully.</Description>
            </Content>
            <ControlSection>
                <Button onClick={() => {
                    navigate(`/loan-details?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`);
                }}>Done</Button>
            </ControlSection>
        </CustomPage>
    )
}

export default UploadedPaymentReceiptPage;
