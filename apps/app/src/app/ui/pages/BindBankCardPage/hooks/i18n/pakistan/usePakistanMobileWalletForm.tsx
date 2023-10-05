import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';
import { GetBindCardDropListResponse, WalletVendor } from '../../../../../../externel/backend/rtk/old/GetBindCardDropList';
import { i18nBankBindAccountPage } from '../../../translations';
import { processWalletDisplayName } from './customization/processWalletDisplayName';

interface IUsePakistanMobileWalletForm {
  isPostBankBindSaveToPKMutationLoading: boolean;
  triggerPostBankBindSaveToPKMutation: any;
  bindCardDropListData?: GetBindCardDropListResponse;
}

export const usePakistanMobileWalletForm = (props: IUsePakistanMobileWalletForm) => {
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);

  // NOTE: Wallet List
  // Wallet List - 電子錢包列表 Data
  const [walletDropList, setWalletDropList] = useState<(string | React.ReactNode)[]>([]);
  // const { iBanData, onIBanChange, onIbanBlur, validateIban } = usePakistanIBanValidate();

  // Wallet Selected - 選擇的電子錢包
  const [walletValue, setWalletValue] = useState<{
    value: number;
    label: string;
  }>({ value: 0, label: '' });

  useEffect(() => {
    if (!props.bindCardDropListData) return;
    const walletList =
      props.bindCardDropListData &&
      props.bindCardDropListData.availableWalletVendors &&
      props.bindCardDropListData.availableWalletVendors.map((wallet: WalletVendor) => {
        return processWalletDisplayName(wallet);
      });
    setWalletDropList(walletList);
    setWalletValue({ value: 0, label: walletList[0] });
  }, [props.bindCardDropListData]);

  // Wallet Account
  const [mobileData, setMobileData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const [confirmMobileData, setConfirmMobileData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  // NOTE: Wallet Account
  // Wallet Account - 只允許數字
  const onMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, '');
    setMobileData({
      ...mobileData,
      data,
    });
  };

  const onMobileDataBlur = () => {
    validateMobileWalletAccount();
    if (confirmMobileData.data.length > 0) {
      validateConfirmMobileData();
    }
  };

  const onConfirmMobileDataChange = (event: any) => {
    let data = event.target.value;
    data = data.replace(/[^0-9]/g, '');
    setConfirmMobileData({
      ...confirmMobileData,
      data,
    });
  };

  const onConfirmMobileDataBlur = () => {
    validateConfirmMobileData();
  };

  // Wallet Account  - 驗證
  const validateMobileWalletAccount = useCallback(() => {
    // NOTICE: refactor
    const message = t('Account number should be 10 or 10 digits starting with 0.');
    const scheme = z.string().regex(/^0/, message).length(11, message);
    const scheme2 = z.string().length(10, message);
    const result = z.union([scheme, scheme2]).safeParse(mobileData.data);
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
        errorMessage: '',
      });
    }
  }, [mobileData.data]);

  // Confirm Wallet Account  - 驗證
  const validateConfirmMobileData = useCallback(() => {
    const confirmMobile = confirmMobileData.data;
    const mobile = mobileData.data;
    const confirmMobileSchema = z.string().refine((confirmMobile) => confirmMobile === mobile, {
      message: t('Please make sure your mobile number match.') as string,
    });
    const result = confirmMobileSchema.safeParse(confirmMobile);
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setConfirmMobileData({
        ...confirmMobileData,
        isValidation: false,
        errorMessage,
      });
    } else {
      setConfirmMobileData({
        ...confirmMobileData,
        isValidation: true,
        errorMessage: '',
      });
    }
  }, [mobileData.data, confirmMobileData.data]);

  // NOTE: 點擊 Submit
  const confirm = useCallback(() => {
    validateMobileWalletAccount();
    validateConfirmMobileData();
    // validateIban();

    return mobileData.isValidation && confirmMobileData.isValidation

  }, [
    mobileData.isValidation,
    mobileData.data,
    confirmMobileData.isValidation,
    confirmMobileData.data,
    props.bindCardDropListData,
    props.triggerPostBankBindSaveToPKMutation,
    props.isPostBankBindSaveToPKMutationLoading,
    // iBanData.data,
  ]);

  return {
    // Wallet List
    walletDropList,
    walletValue,
    setWalletValue,
    // Wallet Account
    mobileData,
    onMobileDataChange,
    onMobileDataBlur,
    // Confrim Wallet Account
    confirmMobileData,
    onConfirmMobileDataChange,
    onConfirmMobileDataBlur,
    //IBAN
    // iBanData,
    // onIBanChange,
    // onIbanBlur,
    // Form
    confirm,
    validateMobileWalletAccount,
    validateConfirmMobileData
  };
};
