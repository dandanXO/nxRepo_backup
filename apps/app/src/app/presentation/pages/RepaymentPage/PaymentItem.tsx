import Button from "../../components/Button";
import Divider from "../../components/Divider";
import { useEffect, useState } from "react";
import ListItem from "../../components/ListItem";
import { environment } from "../../../../environments/environment";
import moment from "moment";
import { useNavigate } from "react-router";
import { getToken } from "../../../modules/location/getToken";
import {GetLoanRecord} from "../../../api/loanService/GetLoanRecord";
import {PagePathEnum} from "../PagePathEnum";
import {RiArrowUpSLine} from "@react-icons/all-files/ri/RiArrowUpSLine";
import {RiArrowDownSLine} from "@react-icons/all-files/ri/RiArrowDownSLine";
import {getOrderNo} from "../../../modules/location/getOrderNo";

const PaymentItem = (props: GetLoanRecord) => {

    const navigate = useNavigate();

    // NOTE: 印度的時間格式要轉成 月/日/年
    const { iconUrl = '', productName = '', status = '', loanAmount = '', dueDate = '', orderNo = '',
        loanDate = '', repayRecords = [], overdueDays = '', penaltyInterest = '', totalRepayAmount = '',
        approveRecords = [] } = props;


    const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';

    const statusEnum = {
        'OVERDUE': { text: 'Overdue', color: 'text-red-500', buttonText: 'Repay Details' },
        'PAY_OFF': { text: 'Pay off', color: 'text-sky-400', buttonText: '' },
        'UNPAID': { text: 'Unpaid', color: '', buttonText: 'Repay Details' },
        'PROCESSING': { text: 'Processing', color: '', buttonText: 'Details' },
        'REJECTED': { text: 'Reject', color: 'text-red-500', buttonText: 'Details' },
        'EXTEND': { text: 'Extend', color: 'text-sky-600', buttonText: 'Repay Details' },
    } as { [key: string]: { text: string; color: string, buttonText: string } }


    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };

    const navigateRoute = (status === 'REJECTED' || status === 'PROCESSING') ? PagePathEnum.OrderStatusPage : PagePathEnum.RepaymentDetailPage

    return <div className={`border-solid border-slate-200 border px-2 pt-4 pb-3 mx-4 mb-5 rounded-lg`}  onClick={handleCollapse}>
        <div className="flex flex-row justify-between mb-2 px-2">
            <div className="flex flex-row items-center">
                <div className="w-6 h-6 mr-2 "><img src={iconUrl} alt="logo" /></div><div className="text-sm font-bold">{productName ?? ''}</div>
            </div>
            <div className={`text-xs font-bold ${statusEnum[status].color}`}>{status ? statusEnum[status].text : ''}</div>
        </div>
        <div className="flex flex-row justify-between px-2 items-center">
            <div className="flex flex-col ">
                <div className="text-base font-bold mb-1">{`${environment.currency} ${loanAmount ?? ''}`}</div>
                <div className="text-xs">{`Due ${moment(dueDate).format('L') ?? ''}`}</div>
            </div>
            {status !== "PAY_OFF" &&
                <Button
                    onClick={() => navigate(`${navigateRoute}?token=${getToken()}`, { state: { orderNo, approveRecords } })}
                    buttonText={status ? statusEnum[status].buttonText : ''}
                    width={'w-20'}
                    height={'h-8'}
                    fontSize="xs"
                />
            }
        </div>
        <Divider />
        {collapse && <div className="px-3">
            <ListItem title={'No.'} text={orderNo ?? ''} titleColor="text-slate-400" />
            <ListItem title={'Loan Date'} text={loanDate ? moment(loanDate).format("DD-MM-YYYY") :''} titleColor="text-slate-400" />
            <ListItem title={'Due Date'} text={dueDate ? moment(dueDate).format("DD-MM-YYYY") :''} titleColor="text-slate-400" />
            {status === "PAY_OFF" && <ListItem title={'Repayment Date'} text={repaymentDate ? moment(repaymentDate).format("DD-MM-YYYY") :''} titleColor="text-slate-400" />}
            {/* <ListItem title={'Loan Amount'} text={`${environment.currency} ${loanAmount ?? ''}`} titleColor="text-slate-400" /> */}
            <ListItem title={'Overdue Days'} text={overdueDays ?? ''} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
            {/* <ListItem title={'Overdue Fee'} text={`${environment.currency} ${penaltyInterest ?? ''}`} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} /> */}
            <Divider />
            <ListItem title={'Repayment Amount'} text={`${environment.currency} ${totalRepayAmount ?? ''}`} titleColor="text-slate-400" fontWeight="font-bold" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
            <Divider />
        </div>}

        <div className={'flex flex-row items-center justify-center mt-3'}>
            <div className={'text-xs text-slate-400 mr-2'}>{collapse ?'collapse':'expand'}</div>
            <div className={'w-2.5'}>
                {collapse ? (
                    <RiArrowUpSLine className="fill-gray-400"/>
                ) : (
                    <RiArrowDownSLine className="fill-gray-400"/>
                )}
            </div>
        </div>
    </div>
}

export default PaymentItem;
