import cx from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { GetLoanRecord } from '../../../externel/loanService/GetLoanRecord';
import { getToken } from '../../../persistant/getToken';
import { Status } from '../../../modules/statusEnum';
import Divider from '../../core-components/Divider';
import ListItem from '../../core-components/ListItem';
import Money from '../../components/Money';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { CardCollapseSection } from './CardCollapseSection';
import { CardContentSection } from './CardContentSection';
import { CardHeaderSection } from './CardHeaderSection';
import {formatDate} from "../../../modules/format/formatDate";

const UnpaidPaymentItem = (props: GetLoanRecord) => {
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
    approveRecords = [],
    balance = '',
    extension = '',
  } = props;

  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const statusColor = Status('UNPAID').color;
  const statusBackground = Status('UNPAID').bg;

  return (
    <div className={`border-ctext-divider mx-5 mb-5 rounded-lg border border-solid pb-2`} onClick={handleCollapse}>
      <CardHeaderSection
        statusBackground={statusBackground}
        iconUrl={iconUrl}
        productName={productName}
        statusColor={statusColor}
        statusName={'Unpaid'}
      />

      <CardContentSection
        amountName={'Loan Amount'}
        orderAmount={orderAmount}
        onClick={() =>
          navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${orderNo}`, {
            state: { orderNo, approveRecords },
          })
        }
        statusColor={extension ? 'text-[#076FEF]' : 'text-ctext-primary'}
        dueDate={dueDate}
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
            text={loanDate ? formatDate(moment(loanDate)) : ''}
            titleColor="text-ctext-secondary"
          />
          <ListItem
            key={'DueDate'}
            title={'Due Date'}
            text={dueDate ? formatDate(moment(dueDate)) : ''}
            titleColor="text-ctext-secondary"
          />
          <Divider />
          <ListItem
            title={'Repayment Amount'}
            text={<Money money={balance ?? ''} />}
            titleColor="text-ctext-secondary"
            className="font-bold"
          />
          <Divider />
        </div>
      )}

      <CardCollapseSection collapse={collapse} />
    </div>
  );
};

export default UnpaidPaymentItem;
