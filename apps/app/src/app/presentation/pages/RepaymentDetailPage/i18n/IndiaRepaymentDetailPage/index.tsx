import cx from 'classnames';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';

import { AmountPaidIcon } from '@frontend/mobile/shared/ui';

import { GetLoanDetailChargeFeeDetailItems } from '../../../../../api/rtk/old/getLoanDetail';
import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { Status } from '../../../../../modules/statusEnum';
import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
import { Button } from '../../../../components/layouts/Button';

const IndiaRepaymentDetailPage = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentData } = props || {};
  const {
    status = '',
    productName = '',
    orderNo = '',
    dueDate = '',
    overdueDays = '',
    paidAmount = '',
    repayRecords = [],
    totalRepayAmount = '',
    chargeFeeDetail = {},
    extendDate = '',
    extensionFee = '',
    totalDueAmount = '',
    extendable,
    reductionAmount,
    penaltyInterest,
    loanAmount,
    dailyFee,
    balance,
    orderAmount,
    applyDate = '',
  } = currentData ?? {};
  const { items = [] } = chargeFeeDetail ?? {};
  const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';
  const getItems = (field: string) => {
    return items.filter((i: GetLoanDetailChargeFeeDetailItems) => i.key === field)[0] || {};
  };

  // NOTE: 新版 h5 要過濾掉之前android需要的欄位, LOAN_AMOUNT 也不會給

  // NOTE: 前置利息
  const { value: serviceFee } = getItems('SERVICE_FEE');
  const { value: processingFee } = getItems('PROCESSING_FEE');

  // NOTICE: 動態欄位，但後端一定要給
  const { value: interest } = getItems('LOAN_INTEREST');

  // NOTE: 後置利息
  const { value: gatewayFee } = getItems('GATEWAY_FEE');
  const { value: creditApprovalFee } = getItems('CREDIT_APPROVAL_FEE');
  const { value: managementFee } = getItems('MANAGEMENT_FEE');

  // NOTE: 未知舊包參數
  // const { value: serviceFee } = getItems('SERVICE_FEE');
  // const { value: gst } = getItems('GST');

  const renderStatusTag = (status: string) => {
    return <div className={`${Status(status)?.color} ${Status(status)?.bg} px-1`}>{Status(status)?.text}</div>;
  };
  // console.log("status", status === "EXTEND")
  return (
    <div>
      <div className={`px-6 pt-3`}>
        <ListItem title={'Product'} text={productName ?? ''} titleColor="text-ctext-primary" />
        <ListItem title={'Order No.'} text={orderNo ?? ''} titleColor="text-ctext-primary" />
        <ListItem title={'Status'} text={status ? renderStatusTag(status) : ''} titleColor="text-ctext-primary" />
        <ListItem
          title={'Apply Date'}
          text={applyDate ? moment(applyDate).format('DD-MM-YYYY') : ''}
          titleColor="text-ctext-primary"
        />
        <ListItem
          title={'Due Date'}
          text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
          titleColor="text-ctext-primary"
        />

        {status === 'PAY_OFF' && (
          <ListItem
            title={'Repayment Date'}
            text={repaymentDate ? moment(repaymentDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-primary"
          />
        )}

        {status === 'EXTEND' && (
          <ListItem
            title={'Extension Date'}
            text={extendDate ? moment(extendDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-primary"
          />
        )}

        <Divider />

        {/*NOTICE: 合同金*/}
        {/*<ListItem title={'Loan Amount'} text={<Money money={orderAmount}/>} titleColor="text-black-400" />*/}

        {status !== 'EXTEND' && (
          <ListItem title={'Disbursal Amount'} text={<Money money={loanAmount} />} titleColor="text-ctext-primary" />
        )}

        {status !== 'EXTEND' &&
          items.map((item: any, index: number) => {
            if (!item) return null;
            return (
              <ListItem
                key={index}
                title={item.itemName}
                text={<Money money={item.value} />}
                titleColor="text-ctext-primary"
              />
            );
          })}

        {status !== 'EXTEND' && (
          <ListItem
            title={'Daily Fee'}
            text={
              <div className="flex">
                <Money money={dailyFee} />
              </div>
            }
            titleColor="text-ctext-primary"
          />
        )}
        {status === 'EXTEND' && (
          <ListItem title={'Extension Fee'} text={<Money money={extensionFee} />} titleColor="text-ctext-primary" />
        )}
        <ListItem
          title={'Overdue Days'}
          text={overdueDays ?? ''}
          titleColor="text-ctext-primary"
          textColor={status === 'OVERDUE' ? Status(status).color : ''}
        />
        <ListItem
          title={'Overdue Fee'}
          text={<Money money={penaltyInterest} />}
          titleColor="text-ctext-primary"
          textColor={status === 'OVERDUE' ? Status(status).color : ''}
        />

        <Divider />

        <ListItem
          title={'Reduction Amount'}
          text={<Money money={reductionAmount} isNagetive={true} />}
          titleColor="text-ctext-primary"
        />

        <ListItem
          titleColor="text-ctext-primary"
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
        />

        <Divider />

        {/*NOTE: 總應還金額*/}
        {status !== 'EXTEND' && (
          <ListItem
            title={'Repayment Amount'}
            text={<Money money={balance} />}
            titleColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            className="font-bold"
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
              className={`mr-1.5 grow`}
            >
              <Button type={'secondary'} text={'Extend'} />
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
              <Button text={'Repay'} />
            </div>
          )}
        </div>

        {(status === 'UNPAID' || status === 'OVERDUE') && (
          <>
            <div className={`text-ctext-secondary text-xs`}>
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
                  navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                    state: { orderNo },
                  });
                }}
              >
                <Button type={'ghost'} className={`w-full`} text={'Upload Receipt'} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndiaRepaymentDetailPage;
