import React, { ClipboardEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import { Input } from '@frontend/mobile/shared/ui';
import { Button } from '../../../../components/layouts/Button';
import { selectStyles } from '../../../../components/layouts/selectStyles';
import { IPakistanBankAccountForm } from '../types/IBankAccountForm';
import { z } from 'zod';
import { InputValue } from '../../../../../modules/form/InputValue';
import i18next, { t } from 'i18next';
import { validateBankcardNo } from './validation';
import ValidateInput from '../../../../components/ValidateInput';
import { modalSlice } from '../../../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';

export const BankAccountForm = (props: IPakistanBankAccountForm) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bankValue, setBankValue] = useState({ value: '', label: '' });
    const [isBankSelected, setIsBankSelected] = useState(true);

    const [bankAccountData, setBankAccountData] = useState<InputValue<string>>({
        data: '',
        isValidation: false,
        errorMessage: '',
        isEdit: false
    });

    const [confirmBankAccountData, setconfirmBankAccountData] = useState<InputValue<string>>({
        data: '',
        isValidation: false,
        errorMessage: '',
        isEdit: false
    });

    useEffect(() => {
        if (confirmBankAccountData.isEdit || confirmBankAccountData.data.length >= 9) {
            const isConfirmMobileDataError = bankAccountData.data === confirmBankAccountData.data;
            setconfirmBankAccountData({
                ...confirmBankAccountData,
                isValidation: isConfirmMobileDataError,
                errorMessage: isConfirmMobileDataError ? '' : t('Please make sure your account number match.') as string
            })
        }
    }, [bankAccountData.data, confirmBankAccountData.data]);


    const confirmBindCard = () => {
        if (bankValue.value === '' || !bankAccountData.isValidation || !confirmBankAccountData.isValidation) {
            setIsBankSelected(bankValue.value === '' ? false : true);
            if (bankAccountData.data === '') {
                setBankAccountData(validateBankcardNo(bankAccountData.data));
            }
            if (confirmBankAccountData.data === '') {
                setconfirmBankAccountData(validateBankcardNo(confirmBankAccountData.data));
            }
        } else {
            dispatch(
                modalSlice.actions.updatebindBankcardModal({
                    show: true,
                    confirm: false,
                    paymentMethod: 1,
                    cardholderName: props.cardholderName,
                    bankCode: bankValue?.value !== "" && bankValue?.value,
                    bankName: bankValue?.label,
                    bankAccNr: bankAccountData.data,
                    mobileWallet: false,
                    mobileWalletAccount: '',
                    walletVendor: '',
                    walletName: ''
                } as any)
            );
        }
    }

    return (
        <div className="flex grow flex-col">
            <div>
                <div className={'text-sm'}>{'Cardholder Name'}</div>
                <Input
                    className="mb-2"
                    labelType={'none'}
                    outlineType={'standard'}
                    placeholder={'Cardholder Name'}
                    value={props.cardholderName}
                    disabled
                />
            </div>
            <div>
                <div className={'text-sm'}>{'Bank Name'}</div>
                <Select
                    styles={selectStyles}
                    className="mb-2"
                    value={bankValue.value === '' ? undefined : bankValue}
                    onChange={(item: any) => {
                        setBankValue(item);
                    }}
                    options={props.bankDropList}
                    isSearchable={true}
                    placeholder={'Select'}
                />
                {!isBankSelected &&
                    <div className='ml-5 text-cstate-error-main'>{t('Please select an option')}</div>
                }
            </div>
            <div>
                <div className={'text-sm'}>{'Account Number'}</div>
                <ValidateInput
                    name={'account'}
                    className="mb-2"
                    labelType={'none'}
                    outlineType={'standard'}
                    placeholder={'Account Number'}
                    value={bankAccountData.data}
                    errorMessage={bankAccountData.errorMessage}
                    inputData={bankAccountData}
                    setInputData={setBankAccountData}
                    validateData={() => validateBankcardNo(bankAccountData.data)}
                    inputLength={9}
                />
            </div>

            <div>
                <div className={'text-sm'}>{'Confirm Account Number'}</div>
                <ValidateInput
                    name={'account_confirm'}
                    className="mb-2"
                    labelType={'none'}
                    outlineType={'standard'}
                    placeholder={'Confirm Account Number'}
                    value={confirmBankAccountData.data}
                    errorMessage={confirmBankAccountData.errorMessage}
                    inputData={confirmBankAccountData}
                    setInputData={setconfirmBankAccountData}
                    validateData={() => validateBankcardNo(confirmBankAccountData.data)}
                    inputLength={9}
                />
            </div>
            <div className="pb-4">
                <Button
                    text={'Confirm'}
                    primaryTypeGradient={true}
                    onClick={confirmBindCard}
                />
            </div>
        </div>
    );
};



{/*<div>*/ }
{/*  <div className={'text-sm'}>{'Your IBAN Number (24 characters)'}</div>*/ }
{/*  <Input*/ }
{/*    name={'iban'}*/ }
{/*    labelType={'none'}*/ }
{/*    outlineType={'standard'}*/ }
{/*    placeholder={'Ex. PK36FTBK0000111123456702'}*/ }
{/*    value={props.iBanData.data}*/ }
{/*    onChange={props.onIBanChange}*/ }
{/*    onBlur={props.onIbanBlur}*/ }
{/*    errorMessage={props.iBanData.errorMessage}*/ }
{/*    onCopy={(e) => preventCopyPaste(e)}*/ }
{/*    onCut={(e) => preventCopyPaste(e)}*/ }
{/*  />*/ }
{/*  <div*/ }
{/*    className="text-cstate-info-main mb-2 whitespace-nowrap text-xs leading-none underline"*/ }
{/*    onClick={() => navigate('iban-finder-modal', { state: 'Bank' })}*/ }
{/*  >*/ }
{/*    {'Click me to learn where can I find my IBAN number?'}*/ }
{/*  </div>*/ }
{/*</div>*/ }
