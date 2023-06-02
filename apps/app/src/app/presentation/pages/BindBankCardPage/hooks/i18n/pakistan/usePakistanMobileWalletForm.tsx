import * as Sentry from '@sentry/react';
import i18next from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';

import { usePakistanIBanValidate } from '../../../../../../../../../../libs/shared/component/src/hooks/usePakistanIBanValidate';
import { CustomAxiosError } from '../../../../../../api/rtk/axiosBaseQuery';
import { GetBindCardDropListResponse, WalletVendor } from '../../../../../../api/rtk/old/GetBindCardDropList';
import { SentryModule } from '../../../../../../modules/sentry';
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
  const { iBanData, onIBanChange, onIbanBlur, validateIban } = usePakistanIBanValidate();

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
    const message = t('Account number should be 11 digits starting with 0.');
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
    validateIban();

    if (!mobileData.isValidation || !confirmMobileData.isValidation) return;

    const mobileWalletAccount =
      props.bindCardDropListData && props.bindCardDropListData.availableWalletVendors[walletValue.value];

    if (props.isPostBankBindSaveToPKMutationLoading) return;

    let mobileDataValue = mobileData.data;
    // NOTE: 用戶沒填0時，給後端自動補0
    if (String(mobileData.data).charAt(0) !== '0' || String(mobileData.data).length === 10) {
      mobileDataValue = '0' + mobileData.data;
    }

    props
      .triggerPostBankBindSaveToPKMutation({
        bankAccNr: '',
        mobileWallet: true,
        mobileWalletAccount: mobileDataValue,
        walletVendor: (mobileWalletAccount && mobileWalletAccount.code) || '',
        iban: iBanData.data,
      })
      .then((data: any) => {
        console.log('data:', data);
        // TODO: refactor me
        if (data && data.error) {
          SentryModule.captureException(data.error);
        } else {
          // Notice: bind account successfully
          Modal.alert({
            show: true,
            mask: true,
            title: i18next.t('modal.Notice', { ns: 'common' }) as string,
            content: i18next.t('modal.Success', { ns: 'common' }) as string,
            confirmText: i18next.t('modal.Confirm', { ns: 'common' }) as string,
            maskClosable: true,
            enableClose: false,
            enableIcon: false,
            onConfirm: () => {
              window.location.href = 'innerh5://127.0.0.1';
            },
          });
        }
      })
      .catch((error: CustomAxiosError) => {
        console.log('error:', error);
        // const error = new Error();
        // error.name = "triggerPostBankBindSaveToPKMutation"
        // if(err) error.message = JSON.stringify(err)
        // console.log("error", error);
        //   SentryModule.captureException(error);
        SentryModule.captureException(error);
      });
  }, [
    mobileData.isValidation,
    mobileData.data,
    confirmMobileData.isValidation,
    confirmMobileData.data,
    props.bindCardDropListData,
    props.triggerPostBankBindSaveToPKMutation,
    props.isPostBankBindSaveToPKMutationLoading,
    iBanData.data,
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
    iBanData,
    onIBanChange,
    onIbanBlur,
    // Form
    confirm,
  };
};
