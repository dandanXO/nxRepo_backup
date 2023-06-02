import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import Select, {
  ControlProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  components,
} from 'react-select';

import { BankAccount } from '../../../api/userService/BankAccount';
import { formatPrice } from '../../../modules/format/formatPrice';
import { IndexPageProps } from '../../../reduxStore';
import { Button } from '../../components/layouts/Button';
import { CloseButton } from '../../components/layouts/CloseButton';
import { Horizontal } from '../../components/layouts/Horizontal';
import { FinalProductType, FinalProductsSummary } from '../../pages/IndexPage';
import { Product } from '../../pages/IndexPage/sections/RecommendedProductsSection/Product';
import {FeeRateKeyEnum} from "../../../api/indexService/FeeRateKeyEnum";

type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
  calculatingSummary: FinalProductsSummary;
  onClose: () => void;
  onConfirmApply: () => void;
  onClickLoanAgreement: () => void;
  bankcardList: BankAccount[];
  selectedBankcardId?: number;
  onChangeBankcardID: (id: number) => void;
};

const IndicatorSeparator = (props: IndicatorSeparatorProps<any, true>) => {
  // console.log('IndicatorSeparator.props', props);
  return (
    <span {...props.innerProps} className={'font-light text-gray-400'}>
      change
    </span>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  // console.log("DropdownIndicator.props", props);
  // console.log("selectProps", props.selectProps.menuIsOpen);
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <MdExpandLess size={30} color={'#AAAAAA'} />
      ) : (
        <MdExpandMore size={30} color={'#AAAAAA'} />
      )}
    </components.DropdownIndicator>
  );
};

type OptionType = {
  label: string | undefined;
  value: number | undefined;
};

export const QuickRepaymentSummaryModal = (props: Props) => {
  // const [expandBankcard, setExpandBankcard] = useState(false);
  // const onClickExpandBankcard = useCallback(() => {
  //   setExpandBankcard(!expandBankcard)
  // }, [expandBankcard]);

  const [optionValue, setOptionValue] = useState<OptionType>();

  useEffect(() => {
    const bankcard = props.bankcardList.find((bankcard) => {
      return bankcard.bankId === props.selectedBankcardId;
    });
    // console.log('bankcard', bankcard);
    if (bankcard) {
      setOptionValue({
        label: bankcard.bankAccount,
        value: bankcard.bankId,
      });
    }
  }, [props.selectedBankcardId, props.bankcardList]);

  return (
    <div className={cx('quick-repayment-modal fixed top-0 bottom-0 h-screen w-screen  bg-white p-4')}>
      <div onClick={props.onClose}>
        <CloseButton />
      </div>
      <div className={'header'}>
        <div className={'text-xl font-medium'}>My Loan Orders</div>
      </div>
      <div className={'summary'}>
        <div className={'flex flex-col'}>
          <div className={'text-md font-medium'}>Summary Details</div>
          <div className={'item-list'}>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Loan Amount</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.loanAmount)}</div>
            </div>

            {/*TODO: refactor me*/}
            {props.state.indexAPI?.chargeFeeDetails.map((key) => {
              if(
                key.key === FeeRateKeyEnum.LOAN_INTEREST ||
                key.key === FeeRateKeyEnum.PROCESSING_FEE ||
                key.key === FeeRateKeyEnum.SERVICE_FEE) {
                return null;
              }
              const keyMapValue: Record<FeeRateKeyEnum, any> = {
                [FeeRateKeyEnum.LOAN_INTEREST]: formatPrice(props.calculatingSummary.interest),
                [FeeRateKeyEnum.PROCESSING_FEE]: formatPrice(props.calculatingSummary.processingFee),
                [FeeRateKeyEnum.SERVICE_FEE]: formatPrice(props.calculatingSummary.serviceCharge),
                [FeeRateKeyEnum.DAILY_FEE]: 0,
                [FeeRateKeyEnum.GST]: 0,
                [FeeRateKeyEnum.LOAN_AMOUNT]: 0,
                [FeeRateKeyEnum.PENALTY_INTEREST]: 0,
                [FeeRateKeyEnum.REDUCTION_AMOUNT]: 0,
              }
              // console.log("keyMapValue", keyMapValue);
              const value = keyMapValue[key.key] || 0;
              // console.log("value", value);
              return (
                <div className={'item flex flex-row justify-between font-light'}>
                  <div className={'key'}>{key.title}</div>
                  <div className={'value'}>₹ {value}</div>
                </div>
              )
            })}

            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Disbursal Amount</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.disbursalAmount)}</div>
            </div>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Repayment Date</div>
              <div className={'value'}>{props.calculatingSummary.repaymentDate?.format('DD-MM-YYYY')}</div>
            </div>
          </div>
        </div>
      </div>

      <Horizontal />

      <div className={'products'}>
        <div className={'text-md mb-2 font-medium '}>Your Products</div>
        <div className={'min-h-[260px] h-[260px] overflow-scroll flex flex-col'}>
          {props.calculatingProducts.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </div>
      </div>

      <div className={'absolute bottom-[10px] bg-white flex-1 flex flex-col justify-between'}>
        <Horizontal />

        <div className={'bankcard'}>
          <div className={'text-md font-medium'}>Bank Card</div>
          <div className={'relative flex flex-row items-center justify-between'}>
            {/*<div className={"card-number text-sm"}>**** **** **** 0000</div>*/}
            {/*<div className={"card-number text-sm"}>{props.bankcardList[0].bankId}</div>*/}
            {/*<div className={"change text-gray-400 flex flex-row justify-between"} onClick={onClickExpandBankcard}>*/}
            {/*  <div className={"flex flex-row"}>*/}
            {/*    <span className={"font-light"}>change</span>*/}
            {/*    {expandBankcard ? (*/}
            {/*      <MdExpandLess size={30} color={"#AAAAAA"}/>*/}
            {/*    ) : (*/}
            {/*      <MdExpandMore size={30} color={"#AAAAAA"}/>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*</div>*/}

            <Select
              menuPlacement={'top'}
              styles={{
                // container: (baseStyles, state) => {
                //   return {
                //     ...baseStyles,
                //   }
                // },
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                    },
                    boxShadow: 'none',
                  };
                },
                // indicatorsContainer: (baseStyles, state) => {
                //   return {
                //     ...baseStyles,
                //   }
                // },
              }}
              components={{
                // Control: ControlComponent,
                // IndicatorsContainer,
                IndicatorSeparator,
                DropdownIndicator,
              }}
              className="w-full"
              value={optionValue}
              onChange={(item: any) => {
                // console.log(item);
                setOptionValue(item);
                props.onChangeBankcardID(item.value);
              }}
              options={props.bankcardList.map((bankcard, index) => {
                return {
                  value: bankcard.bankId,
                  label: bankcard.bankAccount,
                };
              })}
              isSearchable={false}
            />
          </div>

          <Horizontal />

          <div className={'mb-2 text-xs font-light text-gray-400'}>
            <span>By continuing, I have read and agree</span>
            <span className={'text-blue-500 underline'} onClick={props.onClickLoanAgreement}>
            {' '}
              Loan Agreement{' '}
          </span>
            <span>carefully.</span>
          </div>
        </div>

        <div>
          <Button text={'Confirm'} onClick={props.onConfirmApply} />
        </div>

      </div>


    </div>
  );
};
