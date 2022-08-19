import Page from "../../core/components/Page";
import {Input} from "../../core/components/Input";
import {useState} from "react";
import styled from "styled-components";
import camera_icon from "../../core/components/Icon/SVG/camera_icon.svg";

const Section = styled.div`
      margin-bottom: 100px;
`;
const CustomPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;   
`

const Title = styled.div`
  
`;
const UploadSection = styled.div`
    height: 183px;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
`;


const StyledImg = styled.img`
    width: 50px;
    margin: 0 auto;
`
function UploadSectionICON() {
    return <StyledImg src={camera_icon}/>
}

const UploadSectionTitle = styled.div`
      
`;

const UploadPaymentReceiptPage = () => {
    const [utr, setURT] = useState<string>();
    return (
        <CustomPage>
            <Section>
                <Input
                    className="mb"
                    value={utr}
                    labelType="right"
                    label="UTR"
                    onChange={(event) => {
                        setURT(event.target.value);
                    }}
                    errorMessage="error message"
                />
            </Section>


            <Title>Upload your repayment receipt(optional)</Title>
            <UploadSection>
                <UploadSectionICON/>
                <UploadSectionTitle>Upload from Photo Album</UploadSectionTitle>
            </UploadSection>
        </CustomPage>
    )
}

export default UploadPaymentReceiptPage;
