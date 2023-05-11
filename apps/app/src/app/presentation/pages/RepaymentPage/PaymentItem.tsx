// import Button from "../../components/Button";
import Divider from '../../components/Divider';
import { useEffect, useState } from 'react';
import ListItem from '../../components/ListItem';
import { environment } from '../../../../environments/environment';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { getToken } from '../../../modules/location/getToken';
import { GetLoanRecord } from '../../../api/loanService/GetLoanRecord';
import { PagePathEnum } from '../PagePathEnum';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { getOrderNo } from '../../../modules/location/getOrderNo';
import { Button } from '../../components/layouts/Button';
import { Status } from '../../../modules/statusEnum';

const PaymentItem = (props: GetLoanRecord) => {
  const navigate = useNavigate();

  // NOTE: 印度的時間格式要轉成 日/月/年
  const {
    iconUrl = '',
    productName = '',
    status = '',
    loanAmount = '',
    dueDate = '',
    orderNo = '',
    orderAmount = '',
    loanDate = '',
    repayRecords = [],
    overdueDays = '',
    penaltyInterest = '',
    totalRepayAmount = '',
    approveRecords = [],
    balance,
  } = props;

  const repaymentDate =
    repayRecords.length > 0
      ? repayRecords[repayRecords.length - 1].repayDate
      : '';

  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const navigateRoute =
    status === 'REJECTED' || status === 'PROCESSING'
      ? PagePathEnum.OrderStatusPage
      : PagePathEnum.RepaymentDetailPage;

  return (
    <div
      className={`border-solid border-slate-200 border px-2 pt-4 pb-3 mx-4 mb-5 rounded-lg`}
      onClick={handleCollapse}
    >
      <div className="flex flex-row justify-between mb-2 px-2">
        <div className="flex flex-row items-center">
          <div className="w-6 h-6 mr-2 ">
            <img src={iconUrl} alt="logo" />
          </div>
          <div className="text-sm font-bold">{productName ?? ''}</div>
        </div>
        <div className={`text-xs font-bold ${Status(status).color}`}>
          {status ? Status(status).text : ''}
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 items-center">
        <div className="flex flex-col ">
          {/*{NOTE: 合同金: orderAmount}*/}
          <div className="text-base font-bold mb-1">{`${environment.currency} ${
            orderAmount ?? ''
          }`}</div>
          <div className="text-xs">{`Due ${
            moment(dueDate).format('L') ?? ''
          }`}</div>
        </div>
        <Button
          text={'Details'}
          className={'text-xs w-auto'}
          onClick={() =>
            navigate(`${navigateRoute}?token=${getToken()}`, {
              state: { orderNo, approveRecords },
            })
          }
        />
      </div>
      <Divider />
      {collapse && (
        <div className="px-3">
          <ListItem
            title={'No.'}
            text={orderNo ?? ''}
            titleColor="text-slate-400"
          />
          <ListItem
            title={'Loan Date'}
            text={loanDate ? moment(loanDate).format('DD-MM-YYYY') : ''}
            titleColor="text-slate-400"
          />
          <ListItem
            title={'Due Date'}
            text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
            titleColor="text-slate-400"
          />
          {status === 'PAY_OFF' && (
            <ListItem
              title={'Repayment Date'}
              text={
                repaymentDate ? moment(repaymentDate).format('DD-MM-YYYY') : ''
              }
              titleColor="text-slate-400"
            />
          )}
          {/* <ListItem title={'Loan Amount'} text={`${environment.currency} ${loanAmount ?? ''}`} titleColor="text-slate-400" /> */}
          <ListItem
            title={'Overdue Days'}
            text={overdueDays ?? ''}
            titleColor="text-slate-400"
            textColor={status === 'OVERDUE' ? 'text-red-500' : ''}
          />
          {/* <ListItem title={'Overdue Fee'} text={`${environment.currency} ${penaltyInterest ?? ''}`} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} /> */}
          <Divider />
          {status !== 'REJECTED' && (
            <ListItem
              title={'Repayment Amount'}
              text={`${environment.currency} ${balance ?? ''}`}
              titleColor={status === 'OVERDUE' ? Status(status).color : ''}
              fontWeight="font-bold"
            />
          )}
          <Divider />
        </div>
      )}

      <div className={'flex flex-row items-center justify-center mt-3'}>
        <div className={'text-xs text-slate-400 mr-2'}>
          {collapse ? 'collapse' : 'expand'}
        </div>
        <div className={'w-2.5'}>
          {collapse ? (
            <RiArrowUpSLine className="fill-gray-400" />
          ) : (
            <RiArrowDownSLine className="fill-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
