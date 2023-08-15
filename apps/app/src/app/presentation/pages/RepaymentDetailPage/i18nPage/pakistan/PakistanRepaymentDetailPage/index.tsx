import cx from 'classnames';
import moment from 'moment';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { AmountPaidIcon } from '@frontend/mobile/shared/ui';

import { GetLoanDetailChargeFeeDetailItems } from '../../../../../../api/rtk/old/getLoanDetail';
import { getOrderNo } from '../../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../../modules/querystring/getToken';
import { Status } from '../../../../../../modules/statusEnum';
import Divider from '../../../../../components/Divider';
import ListItem from '../../../../../components/ListItem';
import Money from '../../../../../components/Money.tsx';
import { Button } from '../../../../../components/layouts/Button';

import { GetLoanDetailResponse } from '../../../../../../api/loanService/GetLoanDetailResponse';

import {useMemo} from "react";
import {useDynamicChargeFeeList} from "../../../hooks/useDynamicChargeFeeList";
import {formatDate} from "../../../../../../modules/format/formatDate";

type IRepaymentDetailPage = {
  currentData?: GetLoanDetailResponse;
  isFetching?:boolean;
}
const PakistanRepaymentDetailPage = (props: IRepaymentDetailPage) => {
  const navigate = useNavigate();
  const { currentData ,isFetching = true} = props || {};
  const {
    status = '',
    productName = '',
    orderNo = '',
    dueDate = '',
    overdueDays = '',
    paidAmount = '',
    repayRecords = [],
    totalRepayAmount = '',
    chargeFeeDetail,
    extendDate = '',
    extensionFee = '',
    totalDueAmount = '',
    extendable,
    reductionAmount = 0,
    penaltyInterest = 0,
    loanAmount = 0,
    dailyFee = 0,
    balance = 0,
    applyDate = '',
  } = currentData ?? {};

  const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';

  const finalItems = useDynamicChargeFeeList(props.currentData?.chargeFeeDetail?.items || undefined);

  const renderStatusTag = (status: string) => {
    return <div className={`${Status(status)?.color} ${Status(status)?.bg} px-1`}>{Status(status)?.text}</div>;
  };

  return (
    <div>
      {currentData && currentData?.status !== 'PAY_OFF' && currentData?.status !== 'EXTEND' && (
          <div className={`bg-cstate-info-variant text-cstate-info-main py-2 text-center text-sm`}>
              Get more amount after instant payment
          </div>
      )}
      <div className={`px-6 pt-3`}>
        <ListItem
          title={'Product'}
          text={productName ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={'Order No.'}
          text={orderNo ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={'Status'}
          text={status ? renderStatusTag(status) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={'Apply Date'}
          text={applyDate ? formatDate(moment(applyDate)) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={'Due Date'}
          text={dueDate ? formatDate(moment(dueDate)) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />

        {status === 'PAY_OFF' && (
          <ListItem
            title={'Repayment Date'}
            text={repaymentDate ? formatDate(moment(repaymentDate)) : ''}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        {status === 'EXTEND' && (
          <ListItem
            title={'Extension Date'}
            text={extendDate ? formatDate(moment(extendDate)) : ''}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        <Divider />

        {/*NOTICE: 合同金*/}
        {/*<ListItem title={'Loan Amount'} text={<Money money={orderAmount}/>} titleColor="text-ctext-secondary" />*/}

        {status !== 'EXTEND' && (
          <ListItem
            title={'Disbursal Amount'}
            text={<Money money={loanAmount} />}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        {status !== 'EXTEND' &&
          finalItems?.map((item: any) => {
            if (!item) return null;
            return (
              <ListItem
                title={item.itemName}
                text={<Money money={item.value} />}
                titleColor="text-ctext-secondary"
                textColor="text-ctext-primary"
                isFetching={isFetching}
              />
            );
          })}

        {/* {status !== 'EXTEND' && (
          <ListItem
            title={'Daily Fee'}
            text={<Money money={dailyFee} />}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
          />
        )} */}

        {status === 'EXTEND' && (
          <ListItem
            title={'Extension Fee'}
            text={<Money money={extensionFee} />}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        <ListItem
          title={'Overdue Days'}
          text={overdueDays ?? ''}
          titleColor="text-ctext-secondary"
          textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
          isFetching={isFetching}
        />
        <ListItem
          title={'Overdue Fee'}
          text={<Money money={penaltyInterest} />}
          titleColor="text-ctext-secondary"
          textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
          isFetching={isFetching}
        />

        <Divider />

        <ListItem
          title={'Reduction Amount'}
          text={<Money money={reductionAmount} isNagetive={true} />}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />

        <ListItem
          titleColor="text-ctext-secondary"
          title={
            <div className={`item-center flex flex-row items-center`}>
              <div className={` mr-1`}>Amount Repaid</div>
              <div
                onClick={() => {
                  navigate(`amount-repaid-record-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                    state: { repayRecords },
                  });
                }}
              >
                <img src={AmountPaidIcon} />
              </div>
            </div>
          }
          text={<Money money={paidAmount} isNagetive={true} />}
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />

        <Divider />
        {/*NOTE: 總應還金額*/}
        {status !== 'EXTEND' && (
          <ListItem
            title={'Repayment Amount'}
            text={<Money money={balance} />}
            className="font-bold"
            titleColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            isFetching={isFetching}
          />
        )}

        {/*NOTE: 總展期金額 (Extension Fee + Overdue Fee) 欄位後端有提供 狀態為EXTEND -> totalRepayAmount */}
        {status === 'EXTEND' && (
          <ListItem
            title={'Total Extension Fee'}
            text={<Money money={totalRepayAmount} />}
            titleColor="text-ctext-primary"
            textColor="text-ctext-primary"
            className="font-bold"
            isFetching={isFetching}
          />
        )}

        <div className={`my-3 flex flex-row text-white`}>
          {extendable !== undefined && extendable && (
            <div
              onClick={() => {
                navigate(`extend-confirm-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                  state: currentData,
                });
              }}
              className={`mr-1.5 grow `}
            >
              <Button type={'ghost'} text={'Extend'} />
            </div>
          )}
          {status !== 'PAY_OFF' && status !== 'EXTEND' && (
            <div
              onClick={() => {
                if (currentData === undefined) return;
                navigate(`repayment-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                  state: currentData,
                });
              }}
              className={cx(`grow`, {
                'ml-1.5': extendable,
              })}
            >
              <Button text={'Repay'} primaryTypeGradient={true} />
            </div>
          )}
        </div>

        {(status === 'UNPAID' || status === 'OVERDUE') && (
          <>
            <div className={`text-ctext-secondary mb-4 text-xs leading-none`}>
              <div>Attention：</div>
              <ul className="list-outside list-decimal pl-3 pt-1">
                <li>Before repayment, please make sure that you have enough balance on your bank account.</li>
                <li>
                  Overdue for more than <span className={`text-primary-main`}>N days</span> will not be able to extend
                  or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our
                  services.
                </li>
                <li>
                  Email us if you have any questions about your responsibilities or for more information.{' '}
                  <span className={`text-primary-main`}>mail@mail.com</span>
                </li>
              </ul>
            </div>
            <div className={`my-3 flex flex-col`}>
              <div className="bg-cstate-disable-assistant mx-[-24px] h-2.5 "></div>
              <div className={`text-ctext-primary my-3 text-xs leading-none`}>
                After completing the repayment, take a screenshot and upload your repayment receipt here ▼
              </div>
              {/*TODO: 先兼容 querystring*/}
              <div
                className={`mb-2 grow`}
                onClick={() => {
                  // console.log('Upload Receipt---------', orderNo);
                  navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                    state: { orderNo },
                  });
                }}
              >
                <Button type={'ghost'} className={`w-full`} ghostTheme={'secondary'} text={'Upload Receipt'} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PakistanRepaymentDetailPage;