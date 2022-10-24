import React, { useCallback, useState } from "react";

import { Input, Button, Page, Modal } from "@frontend/mobile/shared/ui";
import type { InputValue } from "@frontend/mobile/shared/ui";
import styled from "styled-components";
import { PostBankBindSaveRequest } from "../../api/postBankBindSave";
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

    const [isFormPending, setIsFormPending] = useState<boolean>(false);

    // NOTICE: reuse me
    const confirm = useCallback(() => {
        setIsFormPending(true);
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
            .finally(() => {
                setIsFormPending(false);
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
                      let data = event.target.value;
                      data = data.replace(/[^a-zA-Z0-9]/g, "");
                      setIFSCData({
                          ...ifscData,
                          data,
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
                      let data = event.target.value;
                      data = data.replace(/[^0-9]/g, "");
                      setBankcardNoData({
                          ...bankcardNoData,
                          data,
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
                      let data = event.target.value;
                      data = data.replace(/[^0-9]/g, "");
                      setConfirmedBankcardNoData({
                          ...confirmedBankcardNoData,
                          data,
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

            <Button onClick={() => !isFormPending && confirm()}>Submit</Button>
        </CustomPage>
    );
};
