// import Button from "../../components/Button";
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import cx from 'classnames';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { GetLoanRecord } from '../../../api/loanService/GetLoanRecord';
import { getToken } from '../../../modules/querystring/getToken';
import { Status } from '../../../modules/statusEnum';
import Divider from '../../components/Divider';
import ListItem from '../../components/ListItem';
import Money from '../../components/Money.tsx';
import { Button } from '../../components/layouts/Button';
import { PagePathEnum } from '../PagePathEnum';
import { CardCollapseSection } from './CardCollapseSection';
import { CardContentSection } from './CardContentSection';
import { CardHeaderSection } from './CardHeaderSection';
import {formatDate} from "../../../modules/format/formatDate";

const PayoffPaymentItem = (props: GetLoanRecord) => {
  const navigate = useNavigate();

  // NOTE: 印度的時間格式要轉成 日/月/年
  const {
    iconUrl = '',
    productName = '',
    status = '',
    dueDate = '',
    orderNo = '',
    orderAmount = '',
    loanDate = '',
    repayRecords = [],
    approveRecords = [],
  } = props;

  const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';

  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const statusColor = Status('PAY_OFF').color;
  const statusBackground = Status('PAY_OFF').bg;

  return (
    <div className={`border-ctext-divider mx-5 mb-5 rounded-lg border border-solid pb-2`} onClick={handleCollapse}>
      <CardHeaderSection
        statusBackground={statusBackground}
        iconUrl={iconUrl}
        productName={productName}
        statusColor={statusColor}
        statusName={'Pay off'}
      />

      <CardContentSection
        amountName={'Loan Amount'}
        orderAmount={orderAmount}
        onClick={() =>
          navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
            state: { orderNo, approveRecords },
          })
        }
        dueDate={dueDate}
        statusColor={'text-ctext-primary'}
      />

      <div className="px-3">
        {' '}
        <Divider />
      </div>
      {collapse && (
        <div className={cx('px-3')}>
          <ListItem key={'OrderNo.'} title={'Order No.'} text={orderNo ?? ''} titleColor={'text-ctext-secondary'} />
          <ListItem
            key={'LoanDate'}
            title={'Loan Date'}
            text={loanDate ? formatDate(moment(loanDate)): ''}
            titleColor="text-ctext-secondary"
          />
          <ListItem
            key={'DueDate'}
            title={'Due Date'}
            text={dueDate ? formatDate(moment(dueDate)) : ''}
            titleColor="text-ctext-secondary"
          />
          <ListItem
            key={'RepaymentDate'}
            title={'Repayment Date'}
            text={repaymentDate ? formatDate(moment(repaymentDate)) : ''}
            titleColor="text-ctext-secondary"
          />
          <Divider />
        </div>
      )}

      <CardCollapseSection collapse={collapse} />
    </div>
  );
};

export default PayoffPaymentItem;
