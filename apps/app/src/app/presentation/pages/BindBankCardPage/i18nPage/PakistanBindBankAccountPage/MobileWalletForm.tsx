import { Input } from '@frontend/mobile/shared/ui';
import { InputValue } from '../../../../../modules/form/InputValue';
import React, { ClipboardEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { Button } from '../../../../core-components/Button';
import { selectStyles } from '../../../../core-components/selectStyles';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { modalInitialState, modalSlice } from '../../../../../reduxStore/modalSlice';
import ValidateInput from '../../../../core-components/ValidateInput';
import { validateMobile } from './validation';
import { useTranslation } from 'react-i18next';
import { i18nBankBindAccountPage } from '../../translations';

type IMobileWalletForm = {
    // Wallet List
    walletDropList: any;
    // walletValue: any;
    // setWalletValue: any;
    // Wallet Account
    // mobileData: InputValue<string>;
    // onMobileDataChange: (event: any) => void;
    // onMobileDataBlur: (event: any) => void;
    // // Confirm Wallet Account
    // confirmMobileData: InputValue<string>;
    // onConfirmMobileDataChange: (event: any) => void;
    // onConfirmMobileDataBlur: (event: any) => void;
    // Form
    isFormPending: boolean;
    // confirm: (mobileData:string) => void;
    // iBanData: InputValue<string>;
    // onIBanChange: (event: any) => void;
    // onIbanBlur: (event: any) => void;
    cardholderName: string;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation(i18nBankBindAccountPage.namespace);

    const [walletValue, setWalletValue] = useState(props.walletDropList[0])
    const [mobileData, setMobileData] = useState<InputValue<string>>({
        data: '',
        isValidation: false,
        errorMessage: '',
        isEdit:false
    });

    const [confirmMobileData, setConfirmMobileData] = useState<InputValue<string>>({
        data: '',
        isValidation: false,
        errorMessage: '',
        isEdit: false
    });

    useEffect(()=>{
        if(props.walletDropList.length>0){
            setWalletValue(props.walletDropList[0])
        }

    },[props.walletDropList])

    useEffect(() => {
        if (confirmMobileData.isEdit || confirmMobileData.data.length >= 10) {
            const isConfirmMobileDataError = mobileData.data === confirmMobileData.data;
            setConfirmMobileData({
                ...confirmMobileData,
                isValidation: isConfirmMobileDataError,
                errorMessage: isConfirmMobileDataError ? '' : 'Please make sure your mobile number match.' as string
            })
        }
    }, [mobileData.data, confirmMobileData.data])


    const confirmBindCard = () => {
        if (!mobileData.isValidation || !confirmMobileData.isValidation) {
            if (mobileData.data === '') {
                setMobileData(validateMobile(mobileData.data));
            }
            if (confirmMobileData.data === '') {
                setConfirmMobileData(validateMobile(confirmMobileData.data));
            }
        } else {
            dispatch(
                modalSlice.actions.updatebindBankcardModal({
                    ...modalInitialState.bindBankcardModal,
                    show: true,
                    confirm: false,
                    paymentMethod: 0,
                    cardholderName: props.cardholderName,
                    bankName: '',
                    bankAccNr: '',
                    mobileWallet: true,
                    mobileWalletAccount: mobileData.data,
                    walletVendor: walletValue?.value ?? '',
                    bankCode: '',
                    walletName: walletValue.label
                })
            );
        }
    }

    return (
        <div className="flex grow flex-col">
            <div>
                <div className={'text-sm'}>{t('Mobile Wallet')}</div>
                <Select
                    styles={selectStyles}
                    className="react-select-container mb-2"
                    options={props.walletDropList}
                    value={walletValue}
                    onChange={(item: any) => {
                        setWalletValue(item);
                    }}
                    isSearchable={false}
                    placeholder={t('Mobile Wallet')}
                />
            </div>
            <div>
                <div className={'text-sm'}>{t('Mobile Wallet Holder Name')}</div>
                <Input
                    className="mb-2"
                    labelType={'none'}
                    outlineType={'standard'}
                    placeholder={t('Cardholder Name') as string}
                    value={props.cardholderName}
                    disabled
                />
                <div className={'mb-0 text-sm'}>{t('Mobile Wallet Account')}</div>
                <ValidateInput
                    name={'account'}
                    className="mb-1"
                    textAlign={'left'}
                    outlineType={'standard'}
                    placeholder={t('Mobile Wallet Account') as string}
                    value={mobileData.data}
                    errorMessage={t(mobileData.errorMessage as string)}
                    inputData={mobileData}
                    setInputData={setMobileData}
                    validateData={() => validateMobile(mobileData.data)}
                    inputLength={10}
                />
            </div>
            <div>
                <div className={'text-sm'}>{t('Confirm Mobile Wallet Account')}</div>
                <ValidateInput
                    name={'account_confirm'}
                    className="mb"
                    textAlign={'left'}
                    outlineType={'standard'}
                    placeholder={t('Confirm Mobile Wallet Account') as string}
                    value={confirmMobileData.data}
                    errorMessage={t(confirmMobileData.errorMessage as string)}
                    inputData={confirmMobileData}
                    setInputData={setConfirmMobileData}
                    validateData={() => validateMobile(confirmMobileData.data)}
                    inputLength={10}
                />
            </div>

            {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
            <div className="py-2">
                <Button
                    primaryTypeGradient={true}
                    text={t('Confirm')}
                    onClick={confirmBindCard}
                />
            </div>
        </div>
    );
};


    {/*<div className={'text-sm'}>{'Your IBAN Number (24 characters)'}</div>*/}
            {/*<Input*/}
            {/*  name={'iban'}*/}
            {/*  labelType={'none'}*/}
            {/*  outlineType={'standard'}*/}
            {/*  placeholder={'Ex. PK36FTBK0000111123456702'}*/}
            {/*  value={props.iBanData.data}*/}
            {/*  onChange={props.onIBanChange}*/}
            {/*  onBlur={props.onIbanBlur}*/}
            {/*  errorMessage={props.iBanData.errorMessage}*/}
            {/*  onCopy={(e) => preventCopyPaste(e)}*/}
            {/*  onCut={(e) => preventCopyPaste(e)}*/}
            {/*/>*/}
            {/*<div*/}
            {/*  className="text-cstate-info-main mb-2 whitespace-nowrap text-xs leading-none underline"*/}
            {/*  onClick={() => navigate('iban-finder-modal', { state: 'Wallet' })}*/}
            {/*>*/}
            {/*  {'Click me to learn where can I find my IBAN number?'}*/}
            {/*</div>*/}
