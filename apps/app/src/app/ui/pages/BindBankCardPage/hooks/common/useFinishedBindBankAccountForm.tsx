import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';

import { changeLocationHref } from '../../../../../application/errorHandler';
import { getToken } from '../../../../../application/getToken';
import { isSimpleWebView } from '../../../../../device/isSimpleWebView';
import {
  BankVendor,
  GetBindCardDropListResponse,
} from '../../../../../externel/backend/rtk/old/GetBindCardDropList';
import { MonitorUsecaseFlow } from '../../../../../uiFlowUsecaseMoniter';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { i18nBankBindAccountPage } from '../../translations';

export type IUseFinishedBindBankAccountPage = {
  // NOTICE: Common
  bankcardNoData: InputValue<string>;

  // NOTICE: India
  isLoadingPostBankBindSave?: boolean;
  postBankBindSave?: any;
  ifscData?: InputValue<string>;
  upiData?: InputValue<string>;

  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
  // NOTE: 設定電子錢包列表
  bankAccountValue?: any;
};

export const useFinishedBindBankAccountForm = (
  props: IUseFinishedBindBankAccountPage
) => {
  const { t } = useTranslation(i18nBankBindAccountPage.namespace);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToAPP = () => {
    MonitorUsecaseFlow.userBindBankAccount(props);
    changeLocationHref('innerh5://127.0.0.1');
  };

  let targetBankAccount: BankVendor;

  if (props.bindCardDropListData && props.bindCardDropListData.availableBanks) {
    // NOTICE: bankAccountValue 可能為 0
    if (typeof props.bankAccountValue?.data.value === 'number') {
      targetBankAccount =
        props.bindCardDropListData.availableBanks[
          props.bankAccountValue.data.value
        ];
    }
  }

  const confirm = useCallback(() => {
    dispatch(loadingSlice.actions.updatePageLoading(true));

    // NOTICE: India
    const requestBody = {
      bankAccount: props.bankcardNoData.data,
      ifscCode: props.ifscData && props.ifscData.data,
      upiId: props.upiData && props.upiData.data,
    };

    props
      .postBankBindSave(requestBody)
      .unwrap()
      .then((data: any) => {
        // Notice: bind account successfully
        Modal.alert({
          show: true,
          mask: true,
          title: t('modal.Notice', { ns: 'common' }) as string,
          content: t('modal.Success', { ns: 'common' }) as string,
          confirmText: t('modal.Confirm', { ns: 'common' }) as string,
          maskClosable: true,
          enableClose: false,
          enableIcon: false,
          onConfirm: () => {
            if (isSimpleWebView()) {
              navigateToAPP();
            } else {
              navigate(
                `${PageOrModalPathEnum.BankcardListPage}?token=${getToken()}`
              );
            }
          },
        });
      })
      .catch(() => {
        MonitorUsecaseFlow.userBindBankAccountBadly(requestBody);
      })
      .finally(() => {
      dispatch(loadingSlice.actions.updatePageLoading(false));
    });

  }, [
    props.postBankBindSave,
    props.ifscData && props.ifscData.data,
    props.bankcardNoData.data,
    props.upiData && props.upiData.data,
    props.bindCardDropListData?.availableBanks,
    props.bankAccountValue,
    props.isLoadingPostBankBindSave,
  ]);

  return {
    isFormPending: props.isLoadingPostBankBindSave,
    confirm,
  };
};
