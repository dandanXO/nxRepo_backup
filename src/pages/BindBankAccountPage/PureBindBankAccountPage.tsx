import React, {useCallback, useState} from "react";
import {Input} from "../../core/components/Input";
import styled from "styled-components";
import Page from "../../core/components/Page";
import Button from "../../core/components/Button";
import type {InputValue} from "../../core/types/InputValue";
import {PostBankBindSaveRequest} from "../../api/postBankBindSave";
import Modal from "../../core/components/Modal";
import {z} from "zod";

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
}
export const PureBindBankAccountPage = (
    props: PureBindBankAccountPageProps
) => {
    const [value, setValue] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });
    const [value2, setValue2] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });
    const validateIFSC = useCallback(() => {
        const ifscScheme = z.string()
            .min(1, validationInfo.min1)
            .length(11, "Please enter the correct IFSC code.")
        const result = ifscScheme.safeParse(value2.data);
        if(!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setValue2({
                ...value2,
                isValidation: false,
                errorMessage,
            })
        }else {
            setValue2({
                ...value2,
                isValidation: true,
                errorMessage: ""
            })
        }
    }, [value2.data]);

    const [value3, setValue3] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const [value4, setValue4] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const validateBankcardNo = useCallback(() => {
        const bankCardNoScheme = z.string()
            .min(1, validationInfo.min1)
            .min(9, "Account number must be between from 9 to 18 digits only.")
            .max(18, "Account number must be between from 9 to 18 digits only.")
        const result = bankCardNoScheme.safeParse(value3.data);
        if(!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setValue3({
                ...value3,
                isValidation: false,
                errorMessage,
            })
        }else {
            setValue3({
                ...value3,
                isValidation: true,
                errorMessage: ""
            })
        }
    }, [value3.data])

    const validateConfirmedBankcardNo = useCallback(() => {
        const confirmedBankcardNo = value4.data;
        const bankcardNo = value3.data;
        const confirmedBankCardNoScheme = z.string()
            .refine((confirmedBankcardNo) => confirmedBankcardNo === bankcardNo, {
                message: "Please make sure your account number match.",
            })
        const result = confirmedBankCardNoScheme.safeParse(confirmedBankcardNo);
        if(!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setValue4({
                ...value4,
                isValidation: false,
                errorMessage,
            })
        }else {
            setValue4({
                ...value4,
                isValidation: true,
                errorMessage: ""
            })
        }
    }, [value4.data, value3.data])

    const [value5, setValue5] = useState<InputValue<string>>({
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
                value2.isValidation &&
                value3.isValidation &&
                value4.isValidation
            )
        )
            return;

        props
            .postBankBindSave({
                bankAccount: value3.data,
                ifscCode: value2.data,
                upiId: value5.data,
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
        value2.data,
        value3.data,
        value4.data,
        value5.data,
        ,
        value2.isValidation,
        value3.isValidation,
        value4.isValidation,
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
                    value={value2.data}
                    onChange={(event) => {
                        setValue2({
                            ...value2,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateIFSC();
                    }}
                    errorMessage={value2.errorMessage}
                />
                <Input
                    className="mb"
                    label="Account Number"
                    value={value3.data}
                    onChange={(event) => {
                        setValue3({
                            ...value3,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateBankcardNo();
                        if(String(value4.data).length > 0) {
                            validateConfirmedBankcardNo();
                        }
                    }}
                    errorMessage={value3.errorMessage}
                />
                <Input
                    className="mb"
                    label="Confirm Account Number"
                    value={value4.data}
                    onChange={(event) => {
                        setValue4({
                            ...value4,
                            data: event.target.value,
                        });
                    }}
                    onBlur={() => {
                        validateConfirmedBankcardNo();
                    }}
                    errorMessage={value4.errorMessage}
                />
                <Input
                    className="mb"
                    label="UPI ID"
                    value={value5.data}
                    onChange={(event) => {
                        setValue5({
                            ...value,
                            data: event.target.value,
                        });
                    }}
                />
            </Form>

            <Button onClick={() => confirm()}>Submit</Button>
        </CustomPage>
    );
};
