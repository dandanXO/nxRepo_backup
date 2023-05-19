import Divider from '../../components/Divider';
import { useState } from 'react';
import ListItem from '../../components/ListItem';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { getToken } from '../../../modules/querystring/getToken';
import { GetLoanRecord } from '../../../api/loanService/GetLoanRecord';
import { PagePathEnum } from '../PagePathEnum';
import { Status } from '../../../modules/statusEnum';
import Money from '../../components/Money.tsx';
import cx from 'classnames'
import {CardHeaderSection} from "./CardHeaderSection";
import {CardCollapseSection} from "./CardCollapseSection";
import {CardContentSection} from "./CardContentSection";

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
        <div
            className={`border-solid border-ctext-divider border pb-2 mx-4 mb-5 rounded-lg`}
            onClick={handleCollapse}
        >
            <CardHeaderSection statusBackground={statusBackground} iconUrl={iconUrl} productName={productName} statusColor={statusColor} statusName={"Unpaid"}/>

            <CardContentSection
              amountName={"Loan Amount"}
              orderAmount={orderAmount}
              onClick={() =>
                navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
                  state: { orderNo, approveRecords },
                })}
              statusColor={extension ? 'text-[#076FEF]' : 'text-ctext-primary'}
              dueDate={dueDate}
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

          <CardCollapseSection collapse={collapse}/>
        </div>
    );
};

export default UnpaidPaymentItem;
