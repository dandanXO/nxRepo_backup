import { PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { put, race, take } from 'redux-saga/effects';

import { Modal } from '@frontend/mobile/shared/ui';

import { APIV3 } from '../../../../../../api/rtk';
import {
  InitialStateType,
  modalInitialState,
  modalSlice,
} from '../../../../../../reduxStore/modalSlice';
import { catchSagaError } from '../../../../../../usecaseFlow/utils/catchSagaError';

export function* bindBankcardSaga(
  action: PayloadAction<InitialStateType['bindBankcardModal']>
) {
  try {
    if (action.payload.confirm) {
      yield put(
        APIV3.endpoints.postBankBindSaveToPH.initiate({
          holderName: action.payload.cardholderName,
          mobileWalletAccount: action.payload.mobileWalletAccount,
          walletVendor: action.payload.walletVendor,
        }) as any
      );

      const { success } = yield race({
        success: take(APIV3.endpoints.postBankBindSaveToPH.matchFulfilled),
      });

      if (success) {
        yield put(
          modalSlice.actions.updatebindBankcardModal({
            ...modalInitialState.bindBankcardModal,
          })
        );
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
            console.log('innerh5://127.0.0.1');
            window.location.href = 'innerh5://127.0.0.1';
          },
        });
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
