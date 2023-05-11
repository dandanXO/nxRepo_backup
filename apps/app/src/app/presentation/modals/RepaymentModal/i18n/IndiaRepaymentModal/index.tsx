import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdSVG from '../../repayment_banner.svg';
import { useLocation, useNavigate } from 'react-router';
import {
  Horizontal,
  Input,
  InputValue,
  ListItem,
  Overlay,
  Radio,
} from '@frontend/mobile/shared/ui';
import Select from 'react-select';
import { withTranslation } from 'react-i18next';
import { i18nRepaymentModal } from '../translations';
import { environment } from '../../../../../../environments/environment';
// import useRepayCreate from "../../hooks/useRepayCreate";
// import useRepayTypes from "../../hooks/useRepayTypes";
import { Button } from '../../../../components/layouts/Button';
import { IRepaymentModalProps } from '../../index';
import { formatPrice } from '../../../../../modules/formatPrice';
import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { getToken } from '../../../../../modules/location/getToken';

export const RepaymentModalContainer = styled.div`
  color: #101010;
  padding: 0 8px;
`;
const SectionBalance = styled.div`
  padding: 0 4px;
`;

const MethodContainer = styled.div`
  margin-bottom: 18px;
`;

const IndiaRepaymentModal = (props: IRepaymentModalProps & any) => {
  const {
    radioValue,
    setRadioValue,
    balance,
    balanceValue,
    setBalanceValue,
    repayTypesList,
    isRepayTypesFetching,
    repayType,
    setRepayType,
    handleConfirm,
    orderNo,
  } = props;
  const navigate = useNavigate();

  // const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
  //   data: "",
  //   isValidation: false,
  //   errorMessage: "",
  // });
  const [balanceValueErrorMessage, setBalanceValueErrorMessage] = useState('');
  return (
    <RepaymentModalContainer>
      <SectionBalance>
        {/*<ListItem*/}
        {/*    title={props.t("Balance") as any}*/}
        {/*    text={```}*/}
        {/*/>*/}
        <div className="flex justify-between">
          <div className="font-medium">Balance</div>
          <div className="font-medium">{`${environment.currency} ${formatPrice(
            balance
          )}`}</div>
        </div>
      </SectionBalance>

      <MethodContainer>
        <Radio.Group
          value={radioValue}
          onCheck={(value: any) => {
            setRadioValue(value);
            // console.log("balance");
            // console.log(balance);
            if (value === 'balance') {
              setBalanceValue(`${environment.currency} ${balance}`);
              setBalanceValueErrorMessage('');
            }
          }}
        >
          <Radio value="balance">{props.t('Pay Full')}</Radio>
          <Radio value="custom">{props.t('Pay Partial')}</Radio>
        </Radio.Group>
      </MethodContainer>

      <Input
        disabled={radioValue === 'balance'}
        label={props.t('Amount') as string}
        labelType="left"
        value={`${balanceValue}`}
        onChange={(event: any) => {
          let value = event.target.value;
          value = value.replace(`${environment.currency} `, '').trim();

          if (value === '' || Number(value) === 0) {
            setBalanceValueErrorMessage('This field cannot be left blank or 0.');
          } else if (!new RegExp('^[0-9]*$').test(value)) {
            setBalanceValueErrorMessage('Numbers only. Please try again.');
          } else if (Number(value) > Number(balance)) {
            // NOTE: 限制數字最大值
            setBalanceValueErrorMessage(
              'Amount cannot be greater than the repayment balance.'
            );
          } else {
            setBalanceValueErrorMessage('');
          }

          if (value.trim() === '₹') {
              //
          } else {
            setBalanceValue(`${environment.currency} ${value}`);
          }
        }}
        onBlur={() => {}}
        errorMessage={
          balanceValueErrorMessage === '' ? '' : balanceValueErrorMessage
        }
      />

      <div className={`flex flex-row my-3`}>
        <div className={`mr-1.5 w-full`}>
          <Button
            onClick={() => {
              if (isRepayTypesFetching) return;
              navigate(
                `${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`,
                { state: { orderNo } }
              );
            }}
            text={props.t('Cancel')}
            type={'ghost'}
          />
        </div>
        <div className={` ml-1.5 w-full`}>
          <Button
            onClick={() => {
              if (isRepayTypesFetching) return;
              if (balanceValueErrorMessage === '') handleConfirm();
            }}
            text={props.t('Repay')}
            className={`border-[1.5px] border-solid border-primary-main bg-primary-main text-white`}
          />
        </div>
      </div>

      <div className={`text-xs text-gray-400 text-left`}>
        <div>Attention：</div>
        <ul className="list-decimal list-outside pl-3 pt-1">
          <li>
            Before repayment, please make sure that you have enough balance on
            your bank account.
          </li>
          <li>
            In order to protect your rights, we strongly recommend you take a
            screenshot and upload your UTR number after completing the repayment
            and return to the APP to upload your repayment receipt.
          </li>
        </ul>
      </div>

      <div className={`my-4`}>
        <img className={`w-full`} src={AdSVG} />
      </div>
    </RepaymentModalContainer>
  );
};

export default withTranslation(i18nRepaymentModal.namespace)(
  IndiaRepaymentModal
);
