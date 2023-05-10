import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import { AmountPaidIcon } from '@frontend/mobile/shared/ui';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { getToken } from '../../../../../modules/location/getToken';
import moment from 'moment';
import { getOrderNo } from '../../../../../modules/location/getOrderNo';
import Money from '../../../../components/Money.tsx';
import { Button } from '../../../../components/layouts/Button';
import { GetLoanDetailChargeFeeDetailItems } from '../../../../../api/rtk/old/getLoanDetail';
import { Status } from '../../../../../modules/statusEnum';
import { alertModal } from '../../../../../api/base/alertModal';
import cx from 'classnames';

const PakistanRepaymentDetailPage = (props: any) => {
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
  } = currentData ?? {};
  const { items = [] } = chargeFeeDetail ?? {};

  const getItems = (field: string) => {
    return (
      items.filter(
        (i: GetLoanDetailChargeFeeDetailItems) => i.key === field
      )[0] || {}
    );
  };
  console.log('getItems', items);

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
    return (
      <div className={`${Status(status)?.color} ${Status(status)?.bg} px-1`}>
        {Status(status)?.text}
      </div>
    );
  };
  // console.log("status", status === "EXTEND")
  return (
    <div>
      <div className={`px-6 pt-3`}>
        <ListItem
          title={'Product'}
          text={productName ?? ''}
          titleColor="text-ctext-secondary"
        />
        <ListItem
          title={'Order No.'}
          text={orderNo ?? ''}
          titleColor="text-ctext-secondary"
        />
        <ListItem
          title={'Status'}
          text={status ? renderStatusTag(status) : ''}
          titleColor="text-ctext-secondary"
        />
        <ListItem
          title={'Due Date'}
          text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
          titleColor="text-ctext-secondary"
        />

        {status === 'EXTEND' && (
          <ListItem
            title={'Extension Date'}
            text={extendDate ? moment(extendDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-secondary"
          />
        )}

        <Divider />

        {/*NOTICE: 合同金*/}
        {/*<ListItem title={'Loan Amount'} text={<Money money={orderAmount}/>} titleColor="text-black-400" />*/}

        <ListItem
          title={'Disbursal Amount'}
          text={<Money money={loanAmount} />}
          titleColor="text-ctext-secondary"
        />

        {status !== 'EXTEND' &&
          items.map((item: any, index: number) => {
            if (!item) return null;
            return (
              <ListItem
                key={index}
                title={item.itemName}
                text={<Money money={item.value} />}
                titleColor="text-ctext-secondary"
              />
            );
          })}

        <Divider />

        {status !== 'EXTEND' && (
          <ListItem
            title={'Daily Fee'}
            text={
              <div className="flex">
                <Money money={dailyFee} />
              </div>
            }
            titleColor="text-ctext-secondary"
          />
        )}

        <ListItem
          title={'Overdue Days'}
          text={overdueDays ?? ''}
          titleColor="text-ctext-secondary"
          textColor={status === 'OVERDUE' ? 'text-red-500' : ''}
        />
        <ListItem
          title={'Overdue Fee'}
          text={<Money money={penaltyInterest} />}
          titleColor="text-ctext-secondary"
          textColor={status === 'OVERDUE' ? 'text-red-500' : ''}
        />

        {status === 'EXTEND' && (
          <ListItem
            title={'Extension Fee'}
            text={<Money money={extensionFee} />}
            titleColor="text-ctext-secondary"
          />
        )}

        <Divider />

        <ListItem
          title={'Reduction Amount'}
          text={<Money money={reductionAmount} isNagetive={true} />}
          titleColor="text-ctext-secondary"
        />

        <ListItem
          titleColor="text-ctext-secondary"
          title={
            <div className={`flex flex-row item-center items-center`}>
              <div className={` mr-1`}>Amount Repaid</div>
              <div
                onClick={() => {
                  navigate(
                    `amount-repaid-record-modal?token=${getToken()}&orderNo=${
                      orderNo ?? getOrderNo()
                    }`,
                    {
                      state: { repayRecords },
                    }
                  );
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
            titleColor={status === 'OVERDUE' ? 'text-red-500' : 'text-black'}
            textColor={status === 'OVERDUE' ? 'text-red-500' : 'text-black'}
            fontWeight="font-bold"
          />
        )}

        {/*NOTE: 總展期金額 (Extension Fee + Overdue Fee) 欄位後端有提供 狀態為EXTEND -> totalRepayAmount */}
        {status === 'EXTEND' && (
          <ListItem
            title={'Total Extension Fee'}
            text={<Money money={totalRepayAmount} />}
            titleColor="text-ctext-primary"
            textColor="text-ctext-primary"
            fontWeight="font-bold"
          />
        )}

        <div className={`flex flex-row my-3 text-white`}>
          {extendable !== undefined && extendable && (
            <div
              onClick={() => {
                navigate(
                  `extend-confirm-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: currentData,
                  }
                );
              }}
              className={`grow mr-1.5`}
            >
              <Button type={'ghost'} text={'Extend'} />
            </div>
          )}

          {status !== 'PAY_OFF' && status !== 'EXTEND' && (
            <div
              onClick={() => {
                if (currentData === undefined) return;
                navigate(
                  `repayment-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: currentData,
                  }
                );
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
            <div className={`text-xs text-gray-400`}>
              <div>Attention：</div>
              <ul className="list-decimal list-outside pl-3 pt-1">
                <li>
                  Before repayment, please make sure that you have enough
                  balance on your bank account.
                </li>
                <li>
                  Overdue for more than{' '}
                  <span className={`text-primary-main`}>N days</span> will not
                  be able to extend or re-loan，please ensure you make
                  repayments on time to maintain uninterrupted access to our
                  services.
                </li>
                <li>
                  Email us if you have any questions about your responsibilities
                  or for more information.{' '}
                  <span className={`text-primary-main`}>mail@mail.com</span>
                </li>
              </ul>
            </div>

            {/*TODO: 先兼容 querystring*/}
            <div
              className={`grow mt-2`}
              onClick={() => {
                navigate(
                  `/v2/upload-payment-receipt?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: { orderNo },
                  }
                );
              }}
            >
              <Button
                type={'ghost'}
                className={`w-full`}
                text={'Upload Receipt'}
              />
            </div>

            <div className={`flex flex-col my-3`}>
              <div className={`text-xs text-gray-400 `}>
                After completing the repayment, take a screenshot and upload
                your repayment receipt here.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PakistanRepaymentDetailPage;
