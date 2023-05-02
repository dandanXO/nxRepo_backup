import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
import {InputValue, Modal} from "@frontend/mobile/shared/ui";
import {i18nBankBindAccountPage} from "../../../translations";
import {z} from "zod";
import i18next from "i18next";
import * as Sentry from "@sentry/react";
import {CustomAxiosError} from "../../../../../../api/rtk/axiosBaseQuery";
import {AppFlag} from "../../../../../../../main";


interface IUseBangladeshMobileWalletForm {
  triggerPostBankBindSaveToBangladeshMutation: any;
}

export const useBangladeshMobileWalletForm = (props: IUseBangladeshMobileWalletForm) => {

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

  // Mobile  - 驗證
  const validateMobileWalletAccount = useCallback(() => {
    const message = t("Phone number should be 10 digits.");
    const scheme = z
      .string()
      .length(10, message);
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


  // NOTE: FormInput - confirmedMobileData
  const [confirmedMobileData, setConfirmedMobileData] = useState<
    InputValue<string>
    >({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  const validateConfirmedMobileData = useCallback(() => {
    const confirmedMobile = confirmedMobileData.data;
    const mobile = mobileData.data;
    const confirmedMobileDataScheme = z
      .string()
      .refine(
        (confirmedBankcardNo) => confirmedMobile === mobile,
        {
          message: t("Please make sure your mobile number match.") as string
          ,
        }
      );
    const result = confirmedMobileDataScheme.safeParse(confirmedMobile);
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setConfirmedMobileData({
        ...confirmedMobileData,
        isValidation: false,
        errorMessage,
      });
    } else {
      setConfirmedMobileData({
        ...confirmedMobileData,
        isValidation: true,
        errorMessage: "",
      });
    }
  }, [confirmedMobileData.data, mobileData.data]);

  const onConfirmedMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, "");
    setConfirmedMobileData({
      ...confirmedMobileData,
      data,
    });
  }

  const onConfirmedMobileDataBlur = () => {
    validateConfirmedMobileData();
  }



  // NOTE: 鎖定表單傳送
  const [isFormPending, setIsFormPending] = useState<boolean>(false);

  // NOTE: 點擊 Submit
  const confirm = useCallback(() => {

    validateMobileWalletAccount();
    validateConfirmedMobileData();

    if (!mobileData.isValidation || !confirmedMobileData.isValidation) return;

    setIsFormPending(true);

    props.triggerPostBankBindSaveToBangladeshMutation({
      bankAccNr: "",
      mobileWallet: true,
      mobileWalletAccount: mobileData.data,
      walletVendor: "",
    })
      .unwrap()
      .then((data: any) => {
        // console.log("data:", data);
        // Notice: bind account successfully
        Modal.alert({
          show: true,
          mask: true,
          title: i18next.t("modal.Notice", {ns: "common"}) as string,
          content: i18next.t("modal.Success") as string,
          confirmText: i18next.t("modal.Confirm") as string,
          maskClosable: true,
          enableClose: false,
          enableIcon: false,
          onConfirm: () => {
            window.location.href = "innerh5://127.0.0.1";
          },
        });
      })
      .catch((err: CustomAxiosError) => {
        const error = new Error();
        error.name = "triggerPostBankBindSaveToBangladeshMutation"
        if(err) error.message = JSON.stringify(err)
        if(AppFlag.enableSentry) {
          Sentry.captureException(error);
        }
      })
      .finally(() => {
        setIsFormPending(false);
      });
  },[
    mobileData.isValidation,
    mobileData.data,
    confirmedMobileData.isValidation,
    confirmedMobileData.data,
    props.triggerPostBankBindSaveToBangladeshMutation,
  ]);

  return {
    // Mobile
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,

    // ConfirmedMobile
    confirmedMobileData,
    onConfirmedMobileDataChange,
    onConfirmedMobileDataBlur,

    // Form
    isFormPending,
    confirm,
  }
}
