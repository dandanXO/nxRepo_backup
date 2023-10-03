import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import cx from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import Select from "../../../../core-components/Select";

import { Horizontal, Input, Overlay, Radio } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { getToken } from '../../../../../modules/querystring/getToken';
import ListItem from '../../../../core-components/ListItem';
import Money from '../../../../components/Money';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../core-components/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { IRepaymentModalProps } from '../../index';
import AdSVG from '../../repayment_banner.svg';
import { i18nRepaymentModal } from '../translations';
import { formatDate } from "../../../../../modules/format/formatDate";
import { RadioOption } from '../../../../core-components/RadioOption';
import { t } from 'i18next';
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import ValidateInput from '../../../../core-components/ValidateInput';
import { validateBalance } from '../validation';
import { repaymentDetailPageInitialState, repaymentDetailPageSlice } from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/app/src/app/reduxStore';
import { getOrderNo } from 'apps/app/src/app/modules/querystring/getOrderNo';

type paymentMethodValueType = {
    type: string;
    label: string;
};

const MexicoRepaymentModal = (props: IRepaymentModalProps & any) => {
    const {
        setRadioValue,
        balanceValue,
        setBalanceValue,
        handleRepayData,
        handleConfirm,
        isPostRepayCreateLoading
    } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(i18nRepaymentModal.namespace);

    const payOptions = [
        { value: 'balance', label: t('Repay Full Amount') },
        { value: 'custom', label: t('Partial Repayment') },
    ];
    const repaymentData = useSelector((state: RootState) => state.repaymentDetailPage.repaymentData);
    const { balance, repayAmount, radio, payType, coupon, orderNo, repayTypeList } = repaymentData;
    const handleRadioChange = (e: any) => {
        if (e === 'balance') {
            setBalanceValue({ ...balanceValue, data: `${environment.currency} ${balance}` });
        }
        setRadioValue(e)
    };
    const paymentLabel = (color = window.theme?.text?.primary) => {
        return {
            ':before': {
                content: `"${t('Payment Method')}"`,
                display: 'block',
                color: color,
                top: 0,
                fontSize: '14px'
            }
        }
    };

    return (
        <div className="px-4 text-left text-ctext-primary">
            <div className="mt-1 mb-2 text-sm">
                <RadioOption options={payOptions} onChange={handleRadioChange} />
            </div>

            <div className='mb-2'>
                <ValidateInput
                    name={'amount'}
                    label={t('Payment Amount') as string}
                    labelType={'topFix'}
                    outlineType={'outlined'}
                    placeholder='8,500'
                    value={`${balanceValue.data}`}
                    disabled={radio === 'balance'}
                    inputData={balanceValue}
                    setInputData={setBalanceValue}
                    validateData={() => balance!==undefined && validateBalance(balanceValue.data,balance)}
                    inputLength={radio !== 'balance' ? 1 : balance?.length}
                    errorMessage={t(balanceValue.errorMessage)}
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
                        indicatorsContainer: (provided) => ({ ...provided, alignItems: 'end' }),
                        indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
                        input: (styles) => ({ ...styles, bottom: 0 }),
                        placeholder: (styles) => ({ ...styles, color: window.theme?.input?.placeholder, ...paymentLabel() }),
                        singleValue: (styles, { data }) => ({ ...styles, ...paymentLabel() }),
                    }}
                    // data-content={t('Payment Method')}
                    options={repayTypeList || []}
                    value={repayTypeList === undefined ? undefined : repayTypeList.find((option: any) => option.value === payType)}
                    onChange={(item: any) => {
                        handleRepayData({ ...repaymentData, payType: item.value });
                    }}
                />
            </div>

            {radio !== 'custom' && (
                <div className='border  border-solid border-cTextFields-outline-main rounded-lg'>
                    <div className="text-sm ml-5 pt-0.5">{t('Coupon (MXN)')}</div>
                    <div
                        className="flex items-center justify-center pl-5 pr-2 pb-0.5"
                        onClick={() => {
                            if (repayTypeList === undefined) return;
                            navigate(`${PagePathEnum.RepaymentDetailPage}/repayment-coupon-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                                state: {
                                    ...location.state,
                                    paymentAmount: balance,
                                },
                            });
                        }}
                    >
                        <div
                            className={cx('flex grow flex-nowrap justify-between text-base', {
                                'text-primary-main': coupon !== undefined && coupon !== null,
                            })}
                        >
                            {coupon ? (
                                <div className="flex grow justify-between">
                                    <div className="self-center">- {coupon.discountAmount}</div>
                                    <div className="flex flex-col text-xs text-ctext-secondary">
                                        <div>{t('expiration date')}</div>
                                        <div className="">{coupon.expireTime ? formatDate(moment(coupon.expireTime)) : ''}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-cTextFields-placeholder-main'>{t('Select')}</div>
                            )}
                            <RiArrowDownSLine className="fill-[#CCCCCC] text-2xl" />
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-3 font-bold">
                <ListItem
                    title={t('Repayment Amount')}
                    text={<Money money={repayAmount || 0} />}
                />
            </div>

            <div className={`my-3 flex flex-row`}>
                <div className={`mr-1.5 w-full `}>
                    <Button
                        type={'ghost'}
                        ghostTheme={'tertiary'}
                        className={`w-full`}
                        outlineTheme={'round'}
                        text={t('Cancel')}
                        onClick={() => {
                            handleRepayData({
                                ...repaymentDetailPageInitialState.repaymentData
                            })
                            navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${getOrderNo()}`, { state: { orderNo } });
                        }}
                    />
                </div>
                <div className={` ml-1.5 w-full`}>
                    <Button
                        className={`w-full`}
                        text={t('Repay')}
                        disable={isPostRepayCreateLoading}
                        outlineTheme={'round'}
                        onClick={() => {
                            if (repayTypeList === undefined) return;
                            if (balanceValue.errorMessage === '') handleConfirm();
                        }}
                    />
                </div>
            </div>
            <div className={`text-left text-xs text-ctext-secondary font-bold leading-none`}>
                <div>{t('Attention')}:</div>
                <ul className="list-outside list-decimal pl-3 pt-1">
                    <li>{t('Before repayment, please make sure that you have enough balance on your bank account.')}</li>
                    <li>{t('To protect your rights, we strongly recommend that you take a screenshot of the repayment details after completing the repayment, and upload your screenshot to the app.')}</li>
                </ul>
            </div>
            <div className={`my-4`}>
                <img className={`w-full`} src={AdSVG} />
            </div>
        </div>
    );
};

export default MexicoRepaymentModal;
