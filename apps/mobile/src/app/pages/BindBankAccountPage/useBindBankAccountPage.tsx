import React, {useCallback, useState} from "react";
import type {InputValue} from "@frontend/mobile/shared/ui";
import {Modal} from "@frontend/mobile/shared/ui";
import {z} from "zod";
import {validationInfo} from "./validationInfo";
import {PureBindBankAccountPageProps} from "./types/PureBindBankAccountPageProps";

export const useBindBankAccountPage = (
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
                        window.location.href = "innerh5://127.0.0.1";
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

    const onIFSCChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^a-zA-Z0-9]/g, "");
      setIFSCData({
        ...ifscData,
        data,
      });
    }

    const onIFSCBlur = () => {
      validateIFSC();
    }

    const onAccountNumberChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^0-9]/g, "");
      setBankcardNoData({
        ...bankcardNoData,
        data,
      });
    }

    const onAccountNumberBlur = () => {
      validateBankcardNo();
      if (String(confirmedBankcardNoData.data).length > 0) {
        validateConfirmedBankcardNo();
      }
    }

    const onConfirmAccountNumberChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^0-9]/g, "");
      setConfirmedBankcardNoData({
        ...confirmedBankcardNoData,
        data,
      });
    }

    const onConfirmAccountNumberBlur = () => {
      validateConfirmedBankcardNo();
    }

    const onUPIIDChange = (event: any) => {
      setUpiData({
        ...upiData,
        data: event.target.value,
      });
    }

    return {
      ifscData,
      onIFSCChange,
      onIFSCBlur,
      bankcardNoData,
      onAccountNumberChange,
      onAccountNumberBlur,
      confirmedBankcardNoData,
      onConfirmAccountNumberChange,
      onConfirmAccountNumberBlur,
      upiData,
      onUPIIDChange,
      isFormPending,
      confirm,
    }
    // NOTICE:
    // const PageLayoutType = props.layout as any
    // return <PageLayoutType cardholderName={props.cardholderName}
    //                        ifscData={ifscData}
    //                        onIFSCChange={onIFSCChange}
    //                        onIFSCBlur={onIFSCBlur}
    //                        bankcardNoData={bankcardNoData}
    //                        onAccountNumberChange={onAccountNumberChange}
    //                        onAccountNumberBlur={onAccountNumberBlur}
    //                        confirmedBankcardNoData={confirmedBankcardNoData}
    //                        onConfirmAccountNumberChange={onConfirmAccountNumberChange}
    //                        onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
    //                        upiData={upiData} onUPIIDChange={onUPIIDChange}
    //                        isFormPending={isFormPending}
    //                        confirm={confirm}
    // />
};
