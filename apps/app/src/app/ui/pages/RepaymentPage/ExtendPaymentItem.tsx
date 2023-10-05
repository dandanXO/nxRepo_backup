// import Button from "../../components/Button";
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import cx from 'classnames';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { environment } from '../../../../environments/environmentModule/environment';
import { GetLoanRecord } from '../../../externel/loanService/GetLoanRecord';
import { getToken } from '../../../persistant/getToken';
import { Status } from '../../../modules/statusEnum';
import Divider from '../../core-components/Divider';
import ListItem from '../../core-components/ListItem';
import Money from '../../components/Money';
import { Button } from '../../core-components/Button';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { CardCollapseSection } from './CardCollapseSection';
import { CardContentSection } from './CardContentSection';
import { CardHeaderSection } from './CardHeaderSection';
import {formatDate} from "../../../modules/format/formatDate";

const ExtendPaymentItem = (props: GetLoanRecord) => {
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
    extendDate = '',
  } = props;

  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const statusColor = Status('EXTEND').color;
  const statusBackground = Status('EXTEND').bg;

  return (
    <div className={`border-ctext-divider mx-4 mb-5 rounded-lg border border-solid pb-2`} onClick={handleCollapse}>
      <CardHeaderSection
        statusBackground={statusBackground}
        iconUrl={iconUrl}
        productName={productName}
        statusColor={statusColor}
        statusName={'Extend'}
      />

      <CardContentSection
        amountName={'Extension Fee'}
        orderAmount={orderAmount}
        onClick={() => {
          navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${orderNo}`, {
            state: { orderNo, approveRecords },
          });
        }}
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
            key={'ExtensionDate'}
            title={'Extension Date'}
            text={extendDate ? formatDate(moment(extendDate)) : ''}
            titleColor="text-ctext-secondary"
          />
          <Divider />
        </div>
      )}

      <CardCollapseSection collapse={collapse} />
    </div>
  );
};

export default ExtendPaymentItem;
