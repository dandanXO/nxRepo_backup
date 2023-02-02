import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
import {GetBindCardDropListResponse, WalletVendor} from "../../../../../../api/GetBindCardDropList";
import {InputValue, Modal} from "@frontend/mobile/shared/ui";
import {i18nBankBindAccountPage} from "../../translations";
import {z} from "zod";
import i18next from "i18next";
import * as Sentry from "@sentry/react";
import {CustomAxiosError} from "../../../../../../api/base/axiosBaseQuery";
import {processWalletDisplayName} from "./customization/processWalletDisplayName";

interface IUsePakistanMobileWalletForm {
  isPostBankBindSaveToPKMutationLoading: boolean;
  triggerPostBankBindSaveToPKMutation: any;
  bindCardDropListData?: GetBindCardDropListResponse;
}

export const usePakistanMobileWalletForm = (props: IUsePakistanMobileWalletForm) => {

  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  // NOTE: Wallet List
  // Wallet List - 電子錢包列表 Data
  const [walletDropList, setWalletDropList] = useState<(string| React.ReactNode)[]>([]);

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors && props.bindCardDropListData.availableWalletVendors.map((wallet: WalletVendor) => {
      return processWalletDisplayName(wallet);
    });
    setWalletDropList(walletList);
  }, [props.bindCardDropListData]);

  // Wallet Selected - 選擇的電子錢包
  const [walletValue, setWalletValue] = useState(0);

  // Wallet Account
  const [mobileData, setMobileData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  // NOTE: Wallet Account
  // Wallet Account - 只允許數字
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


  // NOTE: 點擊 Submit
  const confirm = useCallback(() => {

    validateMobileWalletAccount();
    if (!mobileData.isValidation) return;

    const mobileWalletAccount = props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors[walletValue];
    if(props.isPostBankBindSaveToPKMutationLoading) return;

    props.triggerPostBankBindSaveToPKMutation({
      bankAccNr: "",
      mobileWallet: true,
      mobileWalletAccount: mobileData.data,
      walletVendor: mobileWalletAccount && mobileWalletAccount.code || "",
    })
      .unwrap()
      .then((data: any) => {
        console.log("data:", data);

        // Notice: bind account successfully
        Modal.alert({
          show: true,
          mask: true,
          title: i18next.t("modal.Notice", {ns: "common"}) as string,
          content: i18next.t("modal.Success", {ns: "common"}) as string,
          confirmText: i18next.t("modal.Confirm", {ns: "common"}) as string,
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
        error.name = "triggerPostBankBindSaveToPKMutation"
        if(err) error.message = JSON.stringify(err)
        Sentry.captureException(error);
      })
  },[
    mobileData.isValidation,
    mobileData.data,
    props.bindCardDropListData,
    props.triggerPostBankBindSaveToPKMutation,
    props.isPostBankBindSaveToPKMutationLoading,
  ]);

  return {
    // Wallet List
    walletDropList,
    walletValue,
    setWalletValue,
    // Wallet Account
    mobileData,
    onMobileDataChange,
    validateMobileWalletAccount,
    // Form
    confirm,
  }
}
