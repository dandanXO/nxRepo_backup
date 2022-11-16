import {Form} from "../../../components/Form";
import {Button, Input, InputValue, Modal, Select} from "@frontend/mobile/shared/ui";
import React, {useCallback, useEffect, useState} from "react";
import {Label} from "../../../components/Label";
import {z} from "zod";
import {WalletVendor} from "../../../../../api/GetBindCardDropList";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {i18nBankBindPageKey} from "../../i18nTranslations";

interface IMobileWalletFormProps {
  triggerPostBankBindSaveToPKMutation: any;
  bindCardDropListData: any;
}

export const MobileWalletForm = (props: IMobileWalletFormProps) => {

  const {t} = useTranslation();

  // NOTE: 電子錢包列表 Data
  const [walletDropList, setWalletDropList] = useState<string[]>([]);

  useEffect(() => {
    if(!props.bindCardDropListData) return;
    const walletList = props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors && props.bindCardDropListData.availableWalletVendors.map((wallet: WalletVendor) => {
      return wallet.displayName
    });
    setWalletDropList(walletList);
  }, [props.bindCardDropListData]);


  //NOTE: 選擇的電子錢包
  const [walletValue, setWalletValue] = useState(0);

  // NOTE: 電子錢包帳戶
  const [mobileData, setMobileData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  // NOTE: 電子錢包帳戶 - 只允許數字
  const onMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, "");
    setMobileData({
      ...mobileData,
      data,
    });
  }

  // NOTE: 電子錢包帳戶 - 驗證
  const validateMobileWalletAccount = useCallback(() => {
    const message = t("Account number should be 11 digits starting with 0.", {ns: i18nBankBindPageKey.CommonKey});
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
  const confirmMobileWalletCallback = () => {
    setIsFormPending(true);
    validateMobileWalletAccount();
    // validateBankcardNo();
    // validateConfirmedBankcardNo();
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

  };

  return (
    <Form>
      <Label>{t("Please select the of your mobile wallet", { ns: i18nBankBindPageKey.CommonKey })}</Label>
      <Select
        className="mb"
        fixButtonWidth={"calc(100vw - 36px)"}
        dataSource={walletDropList}
        defaultIndex={walletValue}
        // FIXME: to controlled component
        onSelect={(index:number) => {
          setWalletValue(index);
        }}
      />

      <Label>{t("Your mobile wallet account", { ns: i18nBankBindPageKey.CommonKey })}</Label>
      <Input
        className="mb"
        labelType={"left"}
        label={"+92"}
        placeholder={t("Wallet Account Number", { ns: i18nBankBindPageKey.CommonKey }) as string}
        value={mobileData.data}
        onChange={onMobileDataChange}
        onBlur={validateMobileWalletAccount}
        errorMessage={mobileData.errorMessage}
      />
      {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
      <Button onClick={() => !isFormPending && confirmMobileWalletCallback()}>{t("Submit", {ns: i18nBankBindPageKey.CommonKey})}</Button>
    </Form>
  );
}
