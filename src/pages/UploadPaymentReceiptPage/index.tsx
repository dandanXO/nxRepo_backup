import Page from "../../core/components/Page";
import {Input} from "../../core/components/Input";
import {useCallback, useState} from "react";
import styled from "styled-components";
import CameraSvgIcon from "./CameraSvgIcon";
import Button from "../../core/components/Button";
import ExampleUploadedImage from "../../core/components/images/banner.jpg"
import {usePostRepayReceiptMutation} from "../../api";
import {PostRepayReceiptResponse} from "../../api/postRepayReceipt";
const Section = styled.div`
      margin-bottom: 100px;
`;
const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;   
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 400;
  text-align: center;
`;
const UploadSection = styled.label.attrs<{ for: string; }>(props => ({
    htmlFor: 'file'
}))`
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

interface UploadPaymentReceiptPageProps {
    // orderNo: string;
}

const UploadPaymentReceiptPage = (props: UploadPaymentReceiptPageProps) => {
    const [utr, setURT] = useState<string>("888888888888");
    const [formFile, setFormFile] = useState<string>();
    // const [isUploaded, setIsUploaded] = useState(false);

    const [postRepayReceipt, { isLoading } ] = usePostRepayReceiptMutation();

    const confirm = useCallback(() => {
        postRepayReceipt({
            file: formFile,
            orderNo: "no-3632791101642108", //props.orderNo,
            receipt: utr,
        }).then((response: { data: PostRepayReceiptResponse }) => {
            console.log(response.data.receipt)
            console.log(response.data.previewUrl)
        }).catch(({ error }) => {
            console.log(error)
        })
    }, []);

    const [imageSrc, setImageSrc] = useState();
    // const fileUploadInputChange = useCallback((e) =>{
    //     let reader = new FileReader();
    //     reader.onload = function(e) {
    //         setImageSrc({uploadedImage: e.target.result});
    //     };
    //
    // }, []);
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
                {!formFile ? (
                    <div>
                        <CameraSvgIconWrapper>
                            <CameraSvgIcon fill="#f58b10"/>
                        </CameraSvgIconWrapper>
                        <UploadSectionTitle>Upload from Photo Album</UploadSectionTitle>
                        {/*<input id="file" type="file" style={{ display: "none" }} />*/}
                        <Input type="file" id="file" style={{ display: "none" }} value={formFile} onChange={(event) => {
                            console.log("event: ", event);
                            const formFileValue = event.target.value;
                            console.log("formFileValue: ", formFileValue);
                            setFormFile(formFileValue);


                            // let reader = new FileReader();
                            // reader.onload = function(e) {
                            //     setImageSrc({formFileValue});
                            // };
                            // reader.readAsDataURL(formFileValue);
                        }} />
                    </div>
                ): (
                    <UploadSectionImg src={imageSrc}/>
                )}
            </UploadSection>

            <Button onClick={() => confirm()}>Confirm</Button>
        </CustomPage>
    )
}

export default UploadPaymentReceiptPage;
