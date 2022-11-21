import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
import {GetBindCardDropListResponse, WalletVendor} from "../../../../../../api/GetBindCardDropList";
import {InputValue, Modal} from "@frontend/mobile/shared/ui";
import {i18nBankBindPageKey} from "../../translations";
import {z} from "zod";
import i18next from "i18next";

interface IUsePakistanMobileWalletForm {
  triggerPostBankBindSaveToPKMutation: any;
  bindCardDropListData?: GetBindCardDropListResponse;
}

export const usePakistanMobileWalletForm = (props: IUsePakistanMobileWalletForm) => {

  const {t} = useTranslation();

  // NOTE: Wallet List
  // Wallet List - 電子錢包列表 Data
  const [walletDropList, setWalletDropList] = useState<string[]>([]);

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors && props.bindCardDropListData.availableWalletVendors.map((wallet: WalletVendor) => {
      return wallet.displayName
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
    const message = t("Account number should be 11 digits starting with 0.", {ns: i18nBankBindPageKey.PakistanKey});
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

    if (
      !(
        mobileData.isValidation
      )
    )
      return;

    const mobileWalletAccount = props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors[walletValue];
    // console.log("mobileWalletAccount", mobileWalletAccount);

    props.triggerPostBankBindSaveToPKMutation({
      bankAccNr: "",
      mobileWallet: true,
      mobileWalletAccount: mobileData.data,
      walletVendor: mobileWalletAccount && mobileWalletAccount.code || "",
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
    props.bindCardDropListData,
    props.triggerPostBankBindSaveToPKMutation,
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
    isFormPending,
    confirm,
  }
}
