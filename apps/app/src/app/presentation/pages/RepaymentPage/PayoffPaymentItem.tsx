// import Button from "../../components/Button";
import Divider from '../../components/Divider';
import { useEffect, useState } from 'react';
import ListItem from '../../components/ListItem';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { getToken } from '../../../modules/querystring/getToken';
import { GetLoanRecord } from '../../../api/loanService/GetLoanRecord';
import { PagePathEnum } from '../PagePathEnum';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { Button } from '../../components/layouts/Button';
import { Status } from '../../../modules/statusEnum';
import Money from '../../components/Money.tsx';
import cx from 'classnames'

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

    const repaymentDate =
        repayRecords.length > 0
            ? repayRecords[repayRecords.length - 1].repayDate
            : '';

    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };

    const statusColor = Status('PAY_OFF').color;
    const statusBackground = Status('PAY_OFF').bg;

    return (
        <div
            className={`border-solid border-ctext-divider border pb-2 mx-4 mb-5 rounded-lg`}
            onClick={handleCollapse}
        >
            <div className={`flex flex-row justify-between items-center mb-2 px-3 py-2 rounded-t-lg ${statusBackground}`}>
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2 ">
                        <img src={iconUrl} alt="logo" />
                    </div>
                    <div className="text-sm font-bold text-ctext-primary">
                        {productName ?? ''}
                    </div>
                </div>
                <div className={`text-xs font-bold ${statusColor}`}>Pay off</div>
            </div>
            <div className="flex flex-row justify-between px-3 items-center">
                <div className={"flex flex-col"}>
                    <div className={'text-xs'}>Loan Amount</div>
                    {/*{NOTE: 合同金: orderAmount}*/}
                    <div className={"text-lg font-bold my-1 leading-none text-ctext-primary"}>
                        {<Money money={orderAmount ?? ''} />}
                    </div>
                    <div className={`text-ctext-primary text-xs`}>{`Due ${moment(dueDate).format('DD-MM-YYYY') ?? ''}`}</div>
                </div>
                <Button
                    text={'Details'}
                    className={'text-xs w-auto px-4'}
                    onClick={() =>
                        navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
                            state: { orderNo, approveRecords },
                        })
                    }
                />
            </div>
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
                        key={'RepaymentDate'}
                        title={'Repayment Date'}
                        text={repaymentDate ? moment(repaymentDate).format('DD-MM-YYYY') : ''}
                        titleColor="text-ctext-secondary"
                    />
                    <Divider />
                </div>
            )}

            <div className={'flex flex-row items-center justify-center '}>
                <div className={'text-xs text-ctext-secondary mr-2'}>
                    {collapse ? 'collapse' : 'expand'}
                </div>
                <div className={'w-2.5'}>
                    {collapse ? (
                        <RiArrowUpSLine className="fill-ctext-secondary" />
                    ) : (
                        <RiArrowDownSLine className="fill-ctext-secondary" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayoffPaymentItem;
