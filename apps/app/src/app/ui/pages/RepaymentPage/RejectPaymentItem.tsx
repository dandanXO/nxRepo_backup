// import Button from "../../components/Button";
import cx from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { GetLoanRecord } from '../../../externel/backend/loanService/GetLoanRecord';
import { formatDate } from '../../../modules/format/formatDate';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import Divider from '../../core-components/Divider';
import ListItem from '../../core-components/ListItem';
import { Status } from '../../statusEnum';
import { CardCollapseSection } from './CardCollapseSection';
import { CardContentSection } from './CardContentSection';
import { CardHeaderSection } from './CardHeaderSection';

const RejectPaymentItem = (props: GetLoanRecord) => {
  const navigate = useNavigate();

  // NOTE: 印度的時間格式要轉成 日/月/年
  const {
    iconUrl = '',
    productName = '',
    // status = '',
    orderNo = '',
    orderAmount = '',
    approveRecords = [],
    applyDate = '',
  } = props;

  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const statusColor = Status('REJECTED').color;
  const statusBackground = Status('REJECTED').bg;

  return (
    <div
      className={`border-ctext-divider mx-5 mb-5 rounded-lg border border-solid pb-2`}
      onClick={handleCollapse}
    >
      <CardHeaderSection
        statusBackground={statusBackground}
        iconUrl={iconUrl}
        productName={productName}
        statusColor={statusColor}
        statusName={'Reject'}
      />
      <CardContentSection
        amountName={'Loan Amount'}
        amountNameStyleClass={'text-ctext-secondary'}
        orderAmount={orderAmount}
        orderAmountStyleClass={'text-ctext-secondary'}
        onClick={() =>
          navigate(
            `${PageOrModalPathEnum.OrderStatusPage}?token=${getToken()}`,
            {
              state: { orderNo, approveRecords },
            }
          )
        }
      />

      <div className="px-3">
        {' '}
        <Divider />
      </div>

      {collapse && (
        <div className={cx('px-3')}>
          <ListItem
            key={'OrderNo.'}
            title={'Order No.'}
            text={orderNo ?? ''}
            titleColor={'text-cstate-disable-main'}
          />
          <ListItem
            key={'ApplyDate'}
            title={'Apply Date'}
            text={applyDate ? formatDate(moment(applyDate)) : ''}
            titleColor={'text-cstate-disable-main'}
          />
          <Divider />
        </div>
      )}

      <CardCollapseSection collapse={collapse} />
    </div>
  );
};

export default RejectPaymentItem;