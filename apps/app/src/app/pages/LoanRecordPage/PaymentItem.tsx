import Button from "../../components/Button";
import UpArrow from './arrow_up_icon.svg';
import DownArrow from './arrow_drop_down.svg';
import Logo from './amount_paid_icon.svg';
import Divider from "../../components/Divider";
import { useEffect, useState } from "react";
import ListItem from "../../components/ListItem";
import { GetLoanRecord } from "../../api/types/getLoanRecordList";
import { environment } from "../../../environments/environment";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/base/getToken";
const PaymentItem = (props: GetLoanRecord) => {
    
    const navigate = useNavigate();

    const { iconUrl = '', productName = '', status = '', loanAmount = '', dueDate = '', orderNo = '', loanDate = '', repayRecords = [], overdueDays = '', penaltyInterest = '',totalRepayAmount='' } = props;


    const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';

    const statusEnum = {
        'OVERDUE': { text: 'Overdue', color: 'text-red-500' },
        'PAY_OFF': { text: 'Pay off', color: 'text-sky-400' },
        'UNPAID': { text: 'Unpaid', color: '' },
        'PROCESSING': { text: 'Processing', color: '' },
        'REJECTED': { text: 'Rejected', color: '' },
        'EXTEND': { text: 'Expend', color: 'text-sky-600' },
    } as { [key: string]: { text: string; color: string } }


    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };

    return <div className={`border-solid border-slate-200 border px-2 pt-4 pb-3 mx-4 mb-5 rounded-lg`}>
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
            {status !== "PAY_OFF" && <Button onClick={()=>navigate(`/loan-record-detail?token=${getToken()}`,{ state: {orderNo} })} buttonText="Repay" width={'w-20'} height={'h-8'} fontSize="xs" />}
        </div>
        <Divider />
        {collapse && <div className="px-3">
            <ListItem title={'No.'} text={orderNo ?? ''} titleColor="text-slate-400" />
            <ListItem title={'Loan Date'} text={loanDate ?? ''} titleColor="text-slate-400" />
            <ListItem title={'Due Date'} text={dueDate ?? ''} titleColor="text-slate-400" />
            {status === "PAY_OFF" && <ListItem title={'Repayment Date'} text={repaymentDate ?? ''} titleColor="text-slate-400" />}
            <ListItem title={'Loan Amount'} text={`${environment.currency} ${loanAmount ?? ''}`} titleColor="text-slate-400" />
            <ListItem title={'Overdue Days'} text={overdueDays ?? ''} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
            <ListItem title={'Overdue Fee'} text={`${environment.currency} ${penaltyInterest ?? ''}`} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
            <Divider />
            <ListItem title={'Repayment Amount'} text={`${environment.currency} ${totalRepayAmount ?? ''}`} titleColor="text-slate-400" fontWeight="font-bold" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
            <Divider />
        </div>}

        <div className={'flex flex-row items-center justify-center mt-3'} onClick={handleCollapse}>
            <div className={'text-xs text-slate-400 mr-2'}>{'view details'}</div>
            <div className={'w-2.5'}>
                {collapse ? (
                    <img src={DownArrow} alt="v" />
                ) : (
                    <img src={UpArrow} alt="^" />

                )}
            </div>
        </div>
    </div>
}

export default PaymentItem;