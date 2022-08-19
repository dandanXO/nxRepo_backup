import Page from "../../core/components/Page";
import {Input} from "../../core/components/Input";
import {useState} from "react";
import styled from "styled-components";
import CameraSvgIcon from "./CameraSvgIcon";
import Button from "../../core/components/Button";
import ExampleUploadedImage from "../../core/components/images/banner.jpg"
const Section = styled.div`
      margin-bottom: 100px;
`;
const CustomPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;   
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 400;
  text-align: center;
`;
const UploadSection = styled.div`
    height: 183px;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    border-radius: 8px;
    border: 2px solid #101010;   
    margin-bottom: 20px;
`;

const UploadSectionImg = styled.img`
    width: 100%;   
`

const UploadSectionTitle = styled.div`
    
`;

const CameraSvgIconWrapper = styled.div`
    margin: 0 auto 10px;
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;   
`

const UploadPaymentReceiptPage = () => {
    const [utr, setURT] = useState<string>();
    const [isUploaded, setIsUploaded] = useState(false);
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
                {!isUploaded ? (
                    <div>
                        <CameraSvgIconWrapper>
                            <CameraSvgIcon fill="#f58b10"/>
                        </CameraSvgIconWrapper>
                        <UploadSectionTitle>Upload from Photo Album</UploadSectionTitle>
                    </div>
                ): (
                    <UploadSectionImg src={ExampleUploadedImage}/>
                )}
            </UploadSection>

            <Button>Confirm</Button>
        </CustomPage>
    )
}

export default UploadPaymentReceiptPage;
