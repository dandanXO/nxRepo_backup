import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
import {InputValue, Modal} from "@frontend/mobile/shared/ui";
import {i18nBankBindAccountPage} from "../../translations";
import {z} from "zod";
import i18next from "i18next";

interface IUseBengalMobileWalletForm {
  triggerPostBankBindSaveToBengalMutation: any;
}

export const useBengalMobileWalletForm = (props: IUseBengalMobileWalletForm) => {

  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  // NOTE: Mobile
  const [mobileData, setMobileData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  // Mobile - 只允許數字
  const onMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, "");
    setMobileData({
      ...mobileData,
      data,
    });
  }

  // Wallet Account  - 驗證
  const validateMobileWalletAccount = useCallback(() => {
    const message = t("Account number should be 11 digits starting with 0.");
    const scheme = z
      .string()
      .regex(/^0/, message)
      .length(11, message);
    const result = scheme.safeParse(mobileData.data);
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setMobileData({
        ...mobileData,
        isValidation: false,
        errorMessage,
      });
    } else {
      setMobileData({
        ...mobileData,
        isValidation: true,
        errorMessage: "",
      });
    }
  }, [mobileData.data]);



  // NOTE: 鎖定表單傳送
  const [isFormPending, setIsFormPending] = useState<boolean>(false);

  // NOTE: 點擊 Submit
  const confirm = useCallback(() => {

    setIsFormPending(true);

    validateMobileWalletAccount();

    if (!mobileData.isValidation) return;

    props.triggerPostBankBindSaveToBengalMutation({
      bankAccNr: "",
      mobileWallet: true,
      mobileWalletAccount: mobileData.data,
    })
      .unwrap()
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
  },[
    mobileData.isValidation,
    mobileData.data,
    props.triggerPostBankBindSaveToBengalMutation,
  ]);

  return {
    // Mobile
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    // Form
    isFormPending,
    confirm,
  }
}
