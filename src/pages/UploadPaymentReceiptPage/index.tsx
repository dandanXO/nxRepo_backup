import Page from "../../core/components/Page";
import {Input} from "../../core/components/Input";
import {useCallback, useState} from "react";
import styled from "styled-components";
import CameraSvgIcon from "./CameraSvgIcon";
import Button from "../../core/components/Button";
import {usePostRepayReceiptMutation} from "../../api";
import {PostRepayReceiptResponse} from "../../api/postRepayReceipt";
import {useNavigate} from "react-router-dom";
import UploadingFileModal from "./modal/UploadingFileModal";
import useLocationOrderQueryString from "../../core/hooks/useLocationOrderQueryString";
import {InputValue} from "../../core/types/InputValue";

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
    background-color: #919191;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    border-radius: 8px;
    border: 2px solid #555;   
    margin-bottom: 20px;
    width: 100%;
`;

const UploadSectionImg = styled.div<{
    imageURL: string;
}>`
  width: 100%;   
  background-image: ${(props) => `url(${props.imageURL})`};
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: contain;
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

interface PureUploadPaymentReceiptPageProps {
    postRepayReceiptRequest: (props: PostRepayReceiptRequestProps) => void;
    token: string;
    orderNo: string;
}
export const PureUploadPaymentReceiptPage = (props: PureUploadPaymentReceiptPageProps) => {

    // NOTE: input 1/2
    const [utr, setURT] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });
    // const [isUtrValidated, setIsUtrValidated] = useState<boolean>(false);
    // const [utrErrorMessage, setUtrErrorMessage] = useState<string>("");


    // NOTE: input 2/2 (optional)
    const [formFile, setFormFile] = useState<string>();
    const onFileChange = useCallback((event:any) => {
        const formFileValue = event.target.files[0];
        // console.log("formFileValue: ", formFileValue);
        setFormFile(formFileValue as any);

        let reader = new FileReader();
        reader.onload = function(event) {
            setImageSrc(event.target.result as any);
        };
        reader.readAsDataURL(formFileValue as any);
    }, []);

    const [imageSrc, setImageSrc] = useState<string>();

    const confirm = useCallback(() => {
        if (!utr.isValidation) return;
        setIsUploading(true);
        props.postRepayReceiptRequest({
            orderNo: props.orderNo,
            receipt: utr.data,
            formFile: formFile,
            setIsUploading,
        });
    }, [utr.isValidation, utr, formFile]);

    const [isUploading, setIsUploading] = useState(false);

    return (
        <CustomPage>
            {isUploading && <UploadingFileModal/>}
            <Section>
                <Input
                    className="mb"
                    value={utr}
                    labelType="right"
                    label="UTR"
                    onChange={(event) => {
                        setURT({
                            ...utr,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        if(String(utr).length > 0) {
                            if(String(utr).length > 12) {
                                setURT({
                                    ...utr,
                                    isValidation: false,
                                    errorMessage: "digits only, 12 numbers max",
                                })
                            } else {
                                setURT({
                                    ...utr,
                                    isValidation: true,
                                    errorMessage: "",
                                })
                            }
                        } else {
                            setURT({
                                ...utr,
                                isValidation: false,
                                errorMessage: "This field cannot be left blank",
                            })
                        }
                    }}
                    errorMessage={utr.errorMessage}
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
                        <Input type="file" id="file" style={{ display: "none" }} value={formFile} onChange={(event) => onFileChange(event)} />
                    </div>
                ): (
                    <UploadSectionImg imageURL={imageSrc}/>
                )}
            </UploadSection>
            <Button onClick={() => confirm()}>Confirm</Button>
        </CustomPage>
    )
}

interface PostRepayReceiptRequestProps {
    formFile: any;
    orderNo: string;
    receipt: string;
    setIsUploading: any;
}
const UploadPaymentReceiptPage = () => {
    const [postRepayReceipt, { isLoading } ] = usePostRepayReceiptMutation();
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const goToUploadedPaymentReceiptPage = useCallback(() => {
        navigate(`/uploaded-payment-receipt?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`);
    }, [pageQueryString.token, pageQueryString.orderNo]);
    const postRepayReceiptRequest = useCallback((props: PostRepayReceiptRequestProps) => {
        // NOTICE: impure
        const formData = new FormData();
        formData.append("file", props.formFile);
        formData.append("orderNo", props.orderNo);
        formData.append("receipt", props.receipt);

        postRepayReceipt(formData).unwrap().then((data: PostRepayReceiptResponse) => {
            goToUploadedPaymentReceiptPage();
        }).catch(({ error }) => {
            console.log(error)
        }).finally(() => {
            props.setIsUploading(false);
        });
    }, []);

    return (
        <PureUploadPaymentReceiptPage postRepayReceiptRequest={postRepayReceiptRequest} token={pageQueryString.token} orderNo={pageQueryString.orderNo}/>
    )
}
export default UploadPaymentReceiptPage;
