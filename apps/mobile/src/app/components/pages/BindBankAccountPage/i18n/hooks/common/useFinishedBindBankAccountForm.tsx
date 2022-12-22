import {useCallback, useState} from "react";
import {InputValue, Modal} from "@frontend/mobile/shared/ui";
import {GetBindCardDropListResponse} from "../../../../../../api/GetBindCardDropList";
import {useTranslation} from "react-i18next";
import {i18nBankBindAccountPage} from "../../translations";
import * as Sentry from "@sentry/react";
import {CustomAxiosError} from "../../../../../../api/base/axiosBaseQuery";

type IUseFinishedBindBankAccountPage =  {
  // NOTICE: Common
  bankcardNoData: InputValue<string>;

  // NOTICE: India
  postBankBindSave?: any;
  ifscData?: InputValue<string>;
  upiData?: InputValue<string>;

  // NOTICE: Pakistan
  postBankBindSaveToPK?: any;
  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
  // NOTE: 設定電子錢包列表
  bankAccountValue?: number;
}

export const useFinishedBindBankAccountForm = (props: IUseFinishedBindBankAccountPage) => {
  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  // NOTE: Form
  const [isFormPending, setIsFormPending] = useState<boolean>(false);

  const navigateToAPP = useCallback(() => window.location.href = "innerh5://127.0.0.1", []);

  const confirm = useCallback(() => {
    console.log("confirm")
    setIsFormPending(true);

    // NOTE: FormRequest
    let request;

    // NOTICE: India
    let requestName = ""
    if (props.postBankBindSave) {
      requestName = "postBankBindSave"
      request = props
        .postBankBindSave({
          bankAccount: props.bankcardNoData.data,
          ifscCode: props.ifscData && props.ifscData.data,
          upiId: props.upiData && props.upiData.data,
        })
    } else if (props.postBankBindSaveToPK) {
      requestName = "postBankBindSaveToPK"
      // NOTICE: Pakistan
      let targetBankAccount
      if(props.bindCardDropListData && props.bindCardDropListData.availableBanks) {
        // NOTICE: bankAccountValue 可能為 0
        if(typeof props.bankAccountValue === "number") {
          targetBankAccount = props.bindCardDropListData.availableBanks[props.bankAccountValue];
        }
      }
      const requestBody = {
        bankAccNr: props.bankcardNoData.data,
        mobileWallet: false,
        mobileWalletAccount: "",
        walletVendor: "",
        // FIXME:
        bankName: targetBankAccount && targetBankAccount?.bankName || "",
        bankCode: targetBankAccount && targetBankAccount?.bankCode || "",
      }
      // console.log("requestBody", requestBody);
      request = props
        .postBankBindSaveToPK(requestBody)
    }

    console.log("data!!!!");
    request.unwrap()
      .then((data: any) => {
        console.log("data:", data);
        // Notice: bind account successfully
        Modal.alert({
          show: true,
          mask: true,
          title: t("modal.Notice", {ns: "common"}) as string,
          content: t("modal.Success", {ns: "common"}) as string,
          confirmText: t("modal.Confirm", {ns: "common"}) as string,
          maskClosable: true,
          enableClose: false,
          enableIcon: false,
          onConfirm: () => {
            navigateToAPP();
          },
        });
      })
      .catch((err: CustomAxiosError) => {
        const error = new Error();
        error.name = requestName
        if(err) error.message = JSON.stringify(err)
        Sentry.captureException(error);
      })
      .finally(() => {
        console.log("bind-finally")
        setIsFormPending(false);
      });

  }, [
    props.postBankBindSave,
    props.postBankBindSaveToPK,
    props.ifscData && props.ifscData.data,
    props.bankcardNoData.data,
    props.upiData && props.upiData.data,
    props.bindCardDropListData?.availableBanks,
    props.bankAccountValue
  ]);

  return {
    isFormPending,
    confirm,
  }

}
