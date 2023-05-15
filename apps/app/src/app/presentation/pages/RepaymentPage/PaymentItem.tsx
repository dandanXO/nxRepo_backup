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
        balance = '',
        extendDate = '',
        applyDate = '',
        extension = '',
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

    const collapseList = [
        <ListItem
            key={'OrderNo.'}
            title={'Order No.'}
            text={orderNo ?? ''}
            titleColor={status === 'REJECTED' ? 'text-cstate-disable-main' : 'text-ctext-secondary'}
        />,
        <ListItem
            key={'LoanDate'}
            title={'Loan Date'}
            text={loanDate ? moment(loanDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-secondary"
        />,
        <ListItem
            key={'DueDate'}
            title={'Due Date'}
            text={dueDate ? moment(dueDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-secondary"
        />,
        <ListItem
            key={'OverdueDays'}
            title={'Overdue Days'}
            text={overdueDays ?? ''}
            titleColor="text-ctext-secondary"
            textColor={status === 'OVERDUE' ? Status(status).color : ''}
        />,
        <ListItem
            key={'RepaymentDate'}
            title={'Repayment Date'}
            text={repaymentDate ? moment(repaymentDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-secondary"
        />,
        <ListItem
            key={'ExtensionDate'}
            title={'Extension Date'}
            text={extendDate ? moment(extendDate).format('DD-MM-YYYY') : ''}
            titleColor="text-ctext-secondary"
        />,
        <ListItem
            key={'ApplyDate'}
            title={'Apply Date'}
            text={applyDate ? moment(applyDate).format('DD-MM-YYYY') : ''}
            titleColor={status === 'REJECTED' ? 'text-cstate-disable-main' : 'text-ctext-secondary'}
        />,

    ]


    return (
        <div
            className={`border-solid border-ctext-divider border pb-2 mx-4 mb-5 rounded-lg`}
            onClick={handleCollapse}
        >
            <div className={`flex flex-row justify-between items-center mb-2 px-3 py-2 rounded-t-lg ${Status(status).bg}`}>
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2 ">
                        <img src={iconUrl} alt="logo" />
                    </div>
                    <div className="text-sm font-bold text-ctext-primary">
                        {productName ?? ''}
                    </div>
                </div>
                <div className={`text-xs font-bold ${Status(status).color}`}>
                    {status ? Status(status).text : ''}
                </div>
            </div>
            <div className="flex flex-row justify-between px-3 items-center">
                <div className={"flex flex-col"}>
                    <div className={cx('text-xs', { 'text-cstate-disable-main': status === 'REJECTED' })}>
                        {status === 'EXTEND' ? 'Extension Fee' : 'Loan Amount'}
                    </div>
                    {/*{NOTE: 合同金: orderAmount}*/}
                    <div className={cx("text-lg font-bold my-1 leading-none",
                        {
                            'text-cstate-disable-main': status === 'REJECTED',
                            'text-ctext-primary': status !== 'REJECTED'
                        })}
                    >
                        {<Money money={orderAmount ?? ''} />}
                    </div>
                    {(status !== 'REJECTED' && status !== 'PROCESSING') &&
                        (<div className={cx(`text-xs ${status === 'OVERDUE' ? Status(status).color : ''}`, {
                            'text-[#076FEF]': extension && status === 'UNPAID',
                        })}>{`Due ${moment(dueDate).format('DD-MM-YYYY') ?? ''}`}
                        </div>
                    )}
                </div>
                <Button
                    text={'Details'}
                    className={'text-xs w-auto px-4'}
                    onClick={() =>
                        navigate(`${navigateRoute}?token=${getToken()}`, {
                            state: { orderNo, approveRecords },
                        })
                    }
                />
            </div>
            <div className="px-3"> <Divider /></div>
            {collapse && (
                <>
                <div className={cx('px-3')}>
                    { Status(status).paymentItemList.map(i => collapseList.filter(list => list.key===i ))}         
                    {(status === 'UNPAID' || status === 'OVERDUE')  && (
                        <>
                            <Divider />
                            <ListItem
                                title={'Repayment Amount'}
                                text={<Money money={balance ?? ''} />}
                                titleColor={status === 'OVERDUE' ? Status(status).color : ''}
                                className="font-bold"
                            />
                        </>
                    )}
                  
                </div>
                <div className="px-3"> <Divider /></div>
                </>
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

export default PaymentItem;
