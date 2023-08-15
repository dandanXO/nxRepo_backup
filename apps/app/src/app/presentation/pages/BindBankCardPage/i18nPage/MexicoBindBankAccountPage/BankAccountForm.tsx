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
import ValidateInput from '../../components/ValidateInput';
import { modalSlice } from '../../../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';
import { RiRadioButtonFill } from '@react-icons/all-files/ri/RiRadioButtonFill';
import { RiCheckboxBlankCircleLine } from '@react-icons/all-files/ri/RiCheckboxBlankCircleLine';
import { RadioOption } from '../../../../components/RadioOption';


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

    const payOptions = [
        { value: 'Tarjeta de bito', label: 'Tarjeta de bito' },
        { value: 'CLABE', label: 'CLABE' },
    ];

    const handleRadioChange = (e: any) => {
        console.log('handleRadioChange', e)
        //   setSelectedOption(e.target.value);
    };

    const bankListLabel = (color = '#000') => ({
        ':before': {
            borderRadius: 10,
            content: '"Name of the bank"',
            display: 'block',
            color: color,
            top: 0
        },
    });

    return (
        <div className="flex grow flex-col">
            <div className='grow'>
                <div className='flex mb-2'>
                    <div className='text-ctext-primary font-bold grow'>Método de pago</div>
                    <RadioOption options={payOptions} onChange={handleRadioChange} />
                </div>
                <div className='mb-2'>
                    <Input
                        labelType={'topFix'}
                        label={t('Cardholder Name') as string}
                        outlineType={'outlined'}
                        placeholder={t('Cardholder Name') as string}
                        value={props.cardholderName}
                        disabled
                    />
                </div>
                <div className='mb-2'>
                    <Select
                        styles={{
                            control: (baseStyles: any, state: any) => ({
                                ...baseStyles,
                                paddingLeft: '12px',
                                borderRadius: '9px',
                                border: `1px solid ${window.theme?.input?.outline ?? '#aaaaaa'}`,
                            }),
                            valueContainer: (style: any, state: any) => ({
                                ...style,
                                alignItems: 'end',
                            }),
                            //@ts-ignore
                            indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
                            input: (styles) => ({ ...styles, bottom: 0 }),
                            placeholder: (styles) => ({ ...styles, ...bankListLabel() }),
                            singleValue: (styles, { data }) => ({ ...styles, ...bankListLabel() }),
                        }}
                        value={bankValue.value === '' ? undefined : bankValue}
                        onChange={(item: any) => {
                            setBankValue(item);
                        }}
                        options={props.bankDropList}
                        isSearchable={true}
                        placeholder={'Select'}
                    />
                    <div className='my-1 text-cstate-error-main'>{!isBankSelected && t('Please select an option')}</div>
                </div>
                <div className='mb-2'>
                    <ValidateInput
                        name={'Bank account number'}
                        labelType={'topFix'}
                        label={t('Bank account number') as string}
                        outlineType={'outlined'}
                        placeholder={'1234 5678 1112 2222'}
                        value={bankAccountData.data}
                        errorMessage={bankAccountData.errorMessage}
                        inputData={bankAccountData}
                        setInputData={setBankAccountData}
                        validateData={() => validateBankcardNo(bankAccountData.data)}
                        inputLength={9}
                    />
                </div>

                <div className='mb-2'>
                    <ValidateInput
                        name={'account_confirm'}
                        labelType={'topFix'}
                        label={t('Confirm Bank account number') as string}
                        outlineType={'outlined'}
                        placeholder={'1234 5678 1112 2222'}
                        value={confirmBankAccountData.data}
                        errorMessage={confirmBankAccountData.errorMessage}
                        inputData={confirmBankAccountData}
                        setInputData={setconfirmBankAccountData}
                        validateData={() => validateBankcardNo(confirmBankAccountData.data)}
                        inputLength={9}
                    />
                </div>
            </div>
            <div>
                <Button
                    text={'Confirm'}
                    primaryTypeGradient={true}
                    onClick={confirmBindCard}
                />
            </div>
        </div>
    );
};

