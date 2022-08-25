import React, { useCallback, useState } from "react";
import { Input } from "../../core/components/Input";
import styled from "styled-components";
import Page from "../../core/components/Page";
import Button from "../../core/components/Button";
import type { InputValue } from "../../core/types/InputValue";
import { PostBankBindSaveRequest } from "../../api/postBankBindSave";
import Modal from "../../core/components/Modal";
import { z } from "zod";

const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
`;
const Form = styled.div`
    .mb {
        margin-bottom: 10px;
    }
    margin-bottom: 30px;
`;
const Paragraph = styled.p`
    color: #101010;
`;

interface PureBindBankAccountPageProps {
    postBankBindSave: (requestBody: PostBankBindSaveRequest) => any;
    cardholderName: string;
}

export const validationInfo = {
    min1: "This field cannot be left blank",
};
export const PureBindBankAccountPage = (
    props: PureBindBankAccountPageProps
) => {
    const [ifscData, setIFSCData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });
    const validateIFSC = useCallback(() => {
        const ifscScheme = z
            .string()
            .min(1, validationInfo.min1)
            .length(11, "IFSC must be 11 digits only.");
        const result = ifscScheme.safeParse(ifscData.data);
        if (!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setIFSCData({
                ...ifscData,
                isValidation: false,
                errorMessage,
            });
        } else {
            setIFSCData({
                ...ifscData,
                isValidation: true,
                errorMessage: "",
            });
        }
    }, [ifscData.data]);

    const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const [confirmedBankcardNoData, setConfirmedBankcardNoData] = useState<
        InputValue<string>
    >({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const validateBankcardNo = useCallback(() => {
        const bankCardNoScheme = z
            .string()
            .min(1, validationInfo.min1)
            .min(9, "Account number must be between from 9 to 18 digits only.")
            .max(
                18,
                "Account number must be between from 9 to 18 digits only."
            );
        const result = bankCardNoScheme.safeParse(bankcardNoData.data);
        if (!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setBankcardNoData({
                ...bankcardNoData,
                isValidation: false,
                errorMessage,
            });
        } else {
            setBankcardNoData({
                ...bankcardNoData,
                isValidation: true,
                errorMessage: "",
            });
        }
    }, [bankcardNoData.data]);

    const validateConfirmedBankcardNo = useCallback(() => {
        const confirmedBankcardNo = confirmedBankcardNoData.data;
        const bankcardNo = bankcardNoData.data;
        const confirmedBankCardNoScheme = z
            .string()
            .refine(
                (confirmedBankcardNo) => confirmedBankcardNo === bankcardNo,
                {
                    message: "Please make sure your account number match.",
                }
            );
        const result = confirmedBankCardNoScheme.safeParse(confirmedBankcardNo);
        if (!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setConfirmedBankcardNoData({
                ...confirmedBankcardNoData,
                isValidation: false,
                errorMessage,
            });
        } else {
            setConfirmedBankcardNoData({
                ...confirmedBankcardNoData,
                isValidation: true,
                errorMessage: "",
            });
        }
    }, [confirmedBankcardNoData.data, bankcardNoData.data]);

    const [upiData, setUpiData] = useState<InputValue<string>>({
        data: "",
        // isValidation: false,
        // errorMessage: "",
    });

    // NOTICE: reuse me
    const confirm = useCallback(() => {
        validateIFSC();
        validateBankcardNo();
        validateConfirmedBankcardNo();
        if (
            !(
                ifscData.isValidation &&
                bankcardNoData.isValidation &&
                confirmedBankcardNoData.isValidation
            )
        )
            return;

        props
            .postBankBindSave({
                bankAccount: bankcardNoData.data,
                ifscCode: ifscData.data,
                upiId: upiData.data,
            })
            .unwrap()
            .then((data: any) => {
                console.log("data:", data);
                // Notice: bind account successfully
                Modal.alert({
                    show: true,
                    mask: true,
                    title: "Notice",
                    content: "Success!",
                    confirmText: "Confirm",
                    maskClosable: true,
                    enableClose: false,
                    enableIcon: false,
                    onConfirm: () => {
                        location.href = "innerh5://127.0.0.1";
                    },
                });
            })
            .catch((error: any) => {
                console.log("error:", error);
                Modal.alert({
                    show: true,
                    mask: true,
                    title: "Error",
                    content: error.data,
                    confirmText: "Confirm",
                    maskClosable: true,
                    enableClose: false,
                    enableIcon: false,
                });
            });
    }, [
        ifscData.data,
        bankcardNoData.data,
        confirmedBankcardNoData.data,
        upiData.data,
        ifscData.isValidation,
        bankcardNoData.isValidation,
        confirmedBankcardNoData.isValidation,
    ]);

    return (
        <CustomPage>
            <Form>
                <Input
                    label="Cardholder Name"
                    value={props.cardholderName}
                    disabled
                />

                <Paragraph>
                    For KYC, your Cardholder name and Aadhaar name should be
                    match.
                </Paragraph>

                <Input
                    className="mb"
                    label="IFSC Code"
                    value={ifscData.data}
                    onChange={(event) => {
                        setIFSCData({
                            ...ifscData,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateIFSC();
                    }}
                    errorMessage={ifscData.errorMessage}
                />
                <Input
                    className="mb"
                    label="Account Number"
                    value={bankcardNoData.data}
                    onChange={(event) => {
                        setBankcardNoData({
                            ...bankcardNoData,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateBankcardNo();
                        if (String(confirmedBankcardNoData.data).length > 0) {
                            validateConfirmedBankcardNo();
                        }
                    }}
                    errorMessage={bankcardNoData.errorMessage}
                />
                <Input
                    className="mb"
                    label="Confirm Account Number"
                    value={confirmedBankcardNoData.data}
                    onChange={(event) => {
                        setConfirmedBankcardNoData({
                            ...confirmedBankcardNoData,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateConfirmedBankcardNo();
                    }}
                    errorMessage={confirmedBankcardNoData.errorMessage}
                />
                <Input
                    className="mb"
                    label="UPI ID"
                    value={upiData.data}
                    onChange={(event) => {
                        setUpiData({
                            ...upiData,
                            data: event.target.value,
                        });
                    }}
                />
            </Form>

            <Button onClick={() => confirm()}>Submit</Button>
        </CustomPage>
    );
};
