import { Input } from '@frontend/mobile/shared/ui';
import { InputValue } from 'apps/app/src/app/modules/form/InputValue';
import React, { ClipboardEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { Button } from '../../../../../components/layouts/Button';
import { selectStyles } from '../../../../../components/layouts/selectStyles';
import MobileInput from '../../MobileInput';
import { t } from 'i18next';

type IMobileWalletForm = {
    // Wallet List
    walletDropList: any;
    walletValue: any;
    setWalletValue: any;
    // Wallet Account
    mobileData: InputValue<string>;
    onMobileDataChange: (event: any) => void;
    onMobileDataBlur: (event: any) => void;
    // Confirm Wallet Account
    confirmMobileData: InputValue<string>;
    onConfirmMobileDataChange: (event: any) => void;
    onConfirmMobileDataBlur: (event: any) => void;
    // Form
    isFormPending: boolean;
    confirm: (mobileData:string) => void;
    // iBanData: InputValue<string>;
    // onIBanChange: (event: any) => void;
    // onIbanBlur: (event: any) => void;
    cardholderName: string;
};

export const MobileWalletForm = (props: IMobileWalletForm) => {
    const navigate = useNavigate();
    const options = props.walletDropList?.map((item: string, index: number) => {
        return { value: index, label: item };
    });

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

    useEffect(() => {
        if (confirmMobileData.isEdit || confirmMobileData.data.length >= 10) {
            const isConfirmMobileDataError = mobileData.data === confirmMobileData.data;
            setConfirmMobileData({
                ...confirmMobileData,
                isValidation: isConfirmMobileDataError,
                errorMessage: isConfirmMobileDataError ? '' : t('Please make sure your mobile number match.') as string
            })
        }
    }, [mobileData.data, confirmMobileData.data])


    return (
        <div className="flex grow flex-col">
            <div>
                <div className={'text-sm'}>{'Mobile Wallet'}</div>
                <Select
                    styles={selectStyles}
                    className="react-select-container mb-2"
                    options={options}
                    // defaultValue={props.bankDropList[0].value}
                    value={props.walletValue}
                    onChange={(item: any) => {
                        // console.log(item);
                        props.setWalletValue(item);
                    }}
                    isSearchable={false}
                    placeholder={'Mobile Wallet'}
                />
            </div>

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

            <div>
                <div className={'text-sm'}>{'Mobile Wallet Holder Name'}</div>
                <Input
                    className="mb-2"
                    labelType={'none'}
                    outlineType={'standard'}
                    placeholder={'Cardholder Name'}
                    value={props.cardholderName}
                    disabled
                />
                <div className={'mb-0 text-sm'}>{'Mobile Wallet Account'}</div>
                <MobileInput
                    name={'account'}
                    className="mb-1"
                    textAlign={'left'}
                    outlineType={'standard'}
                    placeholder={'Mobile Wallet Account'}
                    value={mobileData.data}
                    errorMessage={mobileData.errorMessage}
                    inputData={mobileData}
                    setInputData={setMobileData}
                />
            </div>
            <div>
                <div className={'text-sm'}>{'Confirm Mobile Wallet Account'}</div>
                <MobileInput
                    name={'account_confirm'}
                    className="mb"
                    textAlign={'left'}
                    outlineType={'standard'}
                    placeholder={'Confirm Mobile Wallet Account'}
                    value={confirmMobileData.data}
                    errorMessage={confirmMobileData.errorMessage}
                    inputData={confirmMobileData}
                    setInputData={setConfirmMobileData}
                />
            </div>

            {/*<Button onClick={() => !props.isFormPending && props.confirm()}>Submit</Button>*/}
            <div className="py-2">
                <Button primaryTypeGradient={true} text={'Confirm'} onClick={() => {
                    if (!mobileData.isValidation || !confirmMobileData.isValidation) return;
                    props.confirm(mobileData.data)
                }}
                />
            </div>
        </div>
    );
};
