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
import Money from '../../components/Money.tsx';
import cx from 'classnames'
import {CardCollapseSection} from "./CardCollapseSection";
import {CardContentSection} from "./CardContentSection";
import {CardHeaderSection} from "./CardHeaderSection";

const OverduePaymentItem = (props: GetLoanRecord) => {
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
        overdueDays = '',
        approveRecords = [],
        balance = '',
    } = props;


    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };

    const statusColor = Status('OVERDUE').color;
    const statusBackground = Status('OVERDUE').bg;

    return (
        <div
            className={`border-solid border-ctext-divider border pb-2 mx-4 mb-5 rounded-lg`}
            onClick={handleCollapse}
        >

          <CardHeaderSection
            statusBackground={statusBackground}
            iconUrl={iconUrl}
            productName={productName}
            statusColor={statusColor}
            statusName={"Overdue"}
          />

          <CardContentSection
            amountName={"Loan Amount"}
            orderAmount={orderAmount}
            onClick={() =>
              navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
                state: { orderNo, approveRecords },
            })}
            statusColor={statusColor}
          />


            <div className="px-3"> <Divider /></div>
            {collapse && (
                <div className={cx('px-3')}>
                    <ListItem
                        key={'OrderNo.'}
                        title={'Order No.'}
                        text={orderNo ?? ''}
                        titleColor={'text-ctext-secondary'}
                    />
                    <ListItem
                        key={'LoanDate'}
                        title={'Loan Date'}
                        text={loanDate ? moment(loanDate).format('DD-MM-YYYY') : ''}
                        titleColor="text-ctext-secondary"
                    />
                    <ListItem
                        key={'DueDate'}
                        title={'Due Date'}
                        text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
                        titleColor="text-ctext-secondary"
                    />
                    <ListItem
                        key={'OverdueDays'}
                        title={'Overdue Days'}
                        text={overdueDays ?? ''}
                        titleColor="text-ctext-secondary"
                        textColor={`${statusColor}`}
                    />
                    <Divider />
                    <ListItem
                        title={'Repayment Amount'}
                        text={<Money money={balance ?? ''} />}
                        titleColor={`${statusColor}`}
                        className="font-bold"
                    />
                    <Divider />
                </div>
            )}

          <CardCollapseSection collapse={collapse}/>
        </div>
    );
};

export default OverduePaymentItem;
