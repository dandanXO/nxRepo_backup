import { PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { put, race, select, take } from 'redux-saga/effects';

import { Modal } from '@frontend/mobile/shared/ui';

import { APIV3 } from '../../../../../../externel/backend/rtk';
import {
  InitialStateType,
  modalInitialState,
  modalSlice,
} from '../../../../../../reduxStore/modalSlice';
import { catchSagaError } from '../../../../../../uiFlowUsecase/utils/catchSagaError';
import { RootState } from 'apps/app/src/app/reduxStore';

export function* bindBankcardSaga(
  action: PayloadAction<InitialStateType['bindBankcardModal']>
) {
  try {
    if (action.payload.confirm) {
      const bindBankcardModalState: InitialStateType['bindBankcardModal'] = yield select((state: RootState) => state.model.bindBankcardModal);
      yield put(
        modalSlice.actions.updatebindBankcardModal({
          ...bindBankcardModalState,
          isProcessing: true
        })
      );
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
      }else{
        yield put(
          modalSlice.actions.updatebindBankcardModal({
            ...bindBankcardModalState,
            isProcessing: false
          })
        );
      }
    }
  } catch (error) {
    yield catchSagaError(error);
  }
}
