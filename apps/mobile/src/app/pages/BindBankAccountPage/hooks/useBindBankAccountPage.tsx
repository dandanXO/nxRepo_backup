import React, {useCallback, useEffect, useState} from "react";
import type {InputValue} from "@frontend/mobile/shared/ui";
import {Modal} from "@frontend/mobile/shared/ui";
import {z} from "zod";
import {validationInfo} from "../validationInfo";
import {
  PureBindBankAccountPageProps
} from "../types/PureBindBankAccountPageProps";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {BankVendor} from "../../../api/GetBindCardDropList";

export const useBindBankAccountPage = (
    props: PureBindBankAccountPageProps
  // props: IndiaPureBindBankAccountPageProps | PKPureBindBankAccountPageProps
) => {
  const {t} = useTranslation();
    // NOTE: FormInput - ifscData
    const [ifscData, setIFSCData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

  // NOTE: 巴基斯坦多家銀行專用 - 帳號列表 Data
  const [bankDropList, setBankDropList] = useState<string[]>([]);

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableBanks && props.bindCardDropListData.availableBanks.map((wallet: BankVendor) => {
      return wallet.bankName
    });
    setBankDropList(walletList);
  }, [props.bindCardDropListData]);

  //NOTE: 巴基斯坦多家銀行專用 - 選擇的帳號
  const [bankAccountValue, setBankAccountValue] = useState(0);

  const onIFSCDropSelect = useCallback((index: number) => {
    setBankAccountValue(index);
  }, []);

    // NOTE: 印度單一銀行專用
    const validateIFSC = useCallback(() => {
        const ifscScheme = z
            .string()
            .min(1, validationInfo.min1)
            .length(11, t("IFSC must be 11 digits only.", {ns: "bank-bind"}) as string);
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

  // NOTE: 印度單一銀行專用
    const onIFSCChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^a-zA-Z0-9]/g, "");
      setIFSCData({
        ...ifscData,
        data,
      });
    }

    // NOTE: 印度單一銀行專用
    const onIFSCBlur = () => {
      validateIFSC();
    }

    // NOTE: FormInput - bankcardNoData
    const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const validateBankcardNo = useCallback(() => {
        const bankCardNoScheme = z
            .string()
            .min(1, validationInfo.min1)
            .min(9, t("Account number must be between from 9 to 18 digits only.", {ns: "bank-bind"}) as string)
            .max(
                18,
              t("Account number must be between from 9 to 18 digits only.", {ns: "bank-bind"}) as string
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

    // NOTE: FormInput - confirmedBankcardNoData
    const [confirmedBankcardNoData, setConfirmedBankcardNoData] = useState<
      InputValue<string>
      >({
      data: "",
      isValidation: false,
      errorMessage: "",
    });
    const validateConfirmedBankcardNo = useCallback(() => {
        const confirmedBankcardNo = confirmedBankcardNoData.data;
        const bankcardNo = bankcardNoData.data;
        const confirmedBankCardNoScheme = z
            .string()
            .refine(
                (confirmedBankcardNo) => confirmedBankcardNo === bankcardNo,
                {
                    message: t("Please make sure your account number match.", {ns: "bank-bind"}) as string
                  ,
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

    // NOTE: FormInput - upiData
    const [upiData, setUpiData] = useState<InputValue<string>>({
        data: "",
        // isValidation: false,
        // errorMessage: "",
    });

    const onUPIIDChange = (event: any) => {
      setUpiData({
        ...upiData,
        data: event.target.value,
      });
    }

    // NOTE: Form
    const [isFormPending, setIsFormPending] = useState<boolean>(false);

    // NOTICE: reuse me
    const confirm = useCallback(() => {
        // NOTE: Form
        setIsFormPending(true);

        // NOTE: FormInput
        if(props.postBankBindSave) {
          validateIFSC();
        }
        validateBankcardNo();
        validateConfirmedBankcardNo();


        if(props.postBankBindSave) {
          // NOTE: India
          if (
            !(
              ifscData.isValidation &&
              bankcardNoData.isValidation &&
              confirmedBankcardNoData.isValidation
            )
          )
          {
            return;
          }
        } else if(props.postBankBindSaveToPK) {
          // NOTE: Pakistan
          if (
            !(
              bankcardNoData.isValidation &&
              confirmedBankcardNoData.isValidation
            )
          )
          {
            return;
          }
        }

        // NOTE: FormRequest
        let request;
        if(props.postBankBindSave) {
          request = props
            .postBankBindSave({
              bankAccount: bankcardNoData.data,
              ifscCode: ifscData.data,
              upiId: upiData.data,
            })
        } else if(props.postBankBindSaveToPK){

          const targetBankAccount = props.bindCardDropListData && props.bindCardDropListData.availableBanks && props.bindCardDropListData.availableBanks[bankAccountValue];
          request = props
            .postBankBindSaveToPK({
              bankAccNr: bankcardNoData.data,
              mobileWallet: false,
              mobileWalletAccount: "",
              walletVendor:	"",
              // FIXME:
              bankName: targetBankAccount?.bankName || "",
              bankCode: targetBankAccount?.bankCode || "",
            })
        }

            request.unwrap()
            .then((data: any) => {
                // console.log("data:", data);
                // Notice: bind account successfully
                Modal.alert({
                    show: true,
                    mask: true,
                    title: i18next.t("Notice") as string,
                    content: i18next.t("Success") as string,
                    confirmText: i18next.t("Confirm") as string,
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
        props.bindCardDropListData?.availableBanks,
        bankAccountValue
    ]);

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

      bankDropList,
      bankAccountValue,
      onIFSCDropSelect,
    }
};
