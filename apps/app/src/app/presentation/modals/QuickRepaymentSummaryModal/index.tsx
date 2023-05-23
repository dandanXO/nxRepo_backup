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
  console.log('IndicatorSeparator.props', props);
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
  label: number | undefined;
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
    console.log('bankcard', bankcard);
    if (bankcard) {
      setOptionValue({
        label: bankcard.bankId,
        value: bankcard.bankId,
      });
    }
  }, [props.selectedBankcardId, props.bankcardList]);

  return (
    <div className={cx('quick-repayment-modal fixed top-0 bottom-0 flex h-screen w-screen flex-col bg-white p-4')}>
      <div onClick={props.onClose}>
        <CloseButton />
      </div>
      <div className={'header'}>
        <div className={'text-xl font-medium'}>My Loan Orders</div>
      </div>
      <div className={'summary flex-1'}>
        <div className={'flex flex-col'}>
          <div className={'text-md font-medium'}>Summary Details</div>
          <div className={'item-list'}>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Loan Amount</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.loanAmount)}</div>
            </div>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Interest</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.interest)}</div>
            </div>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Processing Fee</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.processingFee)}</div>
            </div>
            <div className={'item flex flex-row justify-between font-light'}>
              <div className={'key'}>Service Charge</div>
              <div className={'value'}>₹ {formatPrice(props.calculatingSummary.serviceCharge)}</div>
            </div>
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

      <div className={'products '}>
        <div className={'text-md mb-2 font-medium'}>Your Products</div>
        <div className={'flex h-[200px] flex-col overflow-auto'}>
          {props.calculatingProducts.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </div>
      </div>

      <Horizontal />

      <div className={'footer flex-1'}>
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
                console.log(item);
                setOptionValue(item);
                props.onChangeBankcardID(item.value);
              }}
              options={props.bankcardList.map((bankcard, index) => {
                return {
                  value: bankcard.bankId,
                  label: bankcard.bankId,
                };
              })}
              isSearchable={false}
            />
          </div>
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

        <Button text={'Confirm'} onClick={props.onConfirmApply} />
      </div>
    </div>
  );
};
