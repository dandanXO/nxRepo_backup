import { push } from '@lagunovsky/redux-react-router';
import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { put, race, take } from 'redux-saga/effects';

import { API } from '../../../../api/rtk';
import { catchSagaError } from '../../../../usecaseFlow/utils/catchSagaError';
import { InitialStateType, modalSlice } from 'apps/app/src/app/reduxStore/modalSlice';
import i18next from 'i18next';
import { Modal } from '@frontend/mobile/shared/ui';

export function* bindBankcardSaga(action: PayloadAction<InitialStateType['bindBankcardModal']>) {
    // console.log("action.payload", action.payload);
    try {
        if (action.payload.confirm) {
            let mobileDataValue = action.payload.mobileWalletAccount;
            if (action.payload.mobileWallet) {
                // NOTE: 用戶沒填0時，給後端自動補0
                if (String(action.payload.mobileWalletAccount).charAt(0) !== '0' || String(action.payload.mobileWalletAccount).length === 10) {
                    mobileDataValue = '0' + action.payload.mobileWalletAccount;
                }
            }

            yield put(
              API.endpoints.postBankBindSaveToPK.initiate({
                bankAccNr: action.payload.bankAccNr,
                mobileWallet: action.payload.mobileWallet,
                mobileWalletAccount: mobileDataValue,
                walletVendor: action.payload.walletVendor,
                bankCode: action.payload.bankCode,
                bankName: action.payload.bankName,
              }) as any
            );



            const { success, failure } = yield race({
                success: take(API.endpoints.postBankBindSaveToPK.matchFulfilled),
                failure: take(API.endpoints.postBankBindSaveToPK.matchRejected),
            })

            if (success) {
                yield put(modalSlice.actions.updatebindBankcardModal({
                    show: false,
                    confirm: false,
                    paymentMethod: 1,
                    cardholderName: '',
                    bankName: '',
                    bankAccNr: '',
                    mobileWallet: false,
                    mobileWalletAccount: '',
                    walletVendor: '',
                    bankCode: '',
                }))
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
                        console.log('innerh5://127.0.0.1')
                        window.location.href = 'innerh5://127.0.0.1';
                    },
                });

            }

        }

    } catch (error) {
        yield catchSagaError(error);
    }
}
