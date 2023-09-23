import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';

import { BankVendor, GetBindCardDropListResponse } from '../../../../../api/rtk/old/GetBindCardDropList';
import { changeLocationHref } from '../../../../../modules/errorHandler';
import { SentryModule } from '../../../../../modules/sentry';
import { BindBankCardPageEvents } from '../../event';
import { i18nBankBindAccountPage } from '../../translations';
import { isSimpleWebView } from '../../../../../modules/appEnvironment/isSimpleWebView';
import { useNavigate } from 'react-router';
import { PagePathEnum } from '../../../PagePathEnum';
import { getToken } from 'apps/app/src/app/modules/querystring/getToken';
import { useDispatch } from 'react-redux';
import { loadingSlice } from 'apps/app/src/app/reduxStore/loadingSlice';
import {MonitorUsecaseFlow} from "../../../../../monitorUsecaseFlow";

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

export const useFinishedBindBankAccountForm = (props: IUseFinishedBindBankAccountPage) => {
    const { t } = useTranslation(i18nBankBindAccountPage.namespace);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const navigateToAPP = () => {
        MonitorUsecaseFlow.userBindBankAccount(props);
        changeLocationHref('innerh5://127.0.0.1');
    };

    let targetBankAccount: BankVendor;

    if (props.bindCardDropListData && props.bindCardDropListData.availableBanks) {
        // NOTICE: bankAccountValue 可能為 0
        if (typeof props.bankAccountValue?.data.value === 'number') {
            targetBankAccount = props.bindCardDropListData.availableBanks[props.bankAccountValue.data.value];
        }
    }

    const confirm = useCallback(() => {
      dispatch(loadingSlice.actions.updatePageLoading(true))

        // NOTICE: India
        const requestBody = {
            bankAccount: props.bankcardNoData.data,
            ifscCode: props.ifscData && props.ifscData.data,
            upiId: props.upiData && props.upiData.data,
        };

        props.postBankBindSave(requestBody)
            .unwrap()
            .then((data: any) => {
                // Notice: bind account successfully
                dispatch(loadingSlice.actions.updatePageLoading(false))

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
                        }
                        else {
                            navigate(`${PagePathEnum.BankcardListPage}?token=${getToken()}`);
                        }

                    },
                });
            })
            .catch(() => {
                MonitorUsecaseFlow.userBindBankAccountBadly(requestBody)
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
