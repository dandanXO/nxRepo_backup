import {PayloadAction} from '@reduxjs/toolkit';
import {put, race, take} from 'redux-saga/effects';

import {APIV3} from '../../../../../../externel/backend/rtk';
import {catchSagaError} from '../../../../../../uiFlowUsecase/utils/catchSagaError';
import {InitialStateType, modalInitialState, modalSlice} from '../../../../../../reduxStore/modalSlice';
import i18next from 'i18next';
import {Modal} from '@frontend/mobile/shared/ui';

export function* bindBankcardSaga(action: PayloadAction<InitialStateType['bindBankcardModal']>) {
    // console.log("action.payload-mexico", action.payload);
    try {
        if (action.payload.confirm) {

            yield put(
                APIV3.endpoints.postBankBindSaveToMX.initiate({
                    bankAccount: action.payload.bankAccNr,
                    bankCode: action.payload.bankCode,
                    bankName: action.payload.bankName,
                    cardType: action.payload.cardType,
                }) as any
            );

            const { success, failure } = yield race({
                success: take(APIV3.endpoints.postBankBindSaveToMX.matchFulfilled),
                failure: take(APIV3.endpoints.postBankBindSaveToMX.matchRejected),
            })

            if (success) {

                yield put(modalSlice.actions.updatebindBankcardModal({
                    ...modalInitialState.bindBankcardModal
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
