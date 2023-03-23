import Button from "../../components/Button";
import UpArrow from './arrow_up_icon.svg';
import DownArrow from './arrow_drop_down.svg';
import Logo from './amount_paid_icon.svg';
import Divider from "../../components/Divider";
import { useEffect, useState } from "react";
import ListItem from "../../components/ListItem";
const PaymentItem = (props: any) => {


    const logoSrc = Logo;
    const loanName = 'CCC Loan';
    const { paymentStatus= 'Extend'} = props;
    // const paymentStatus = 'Extend';
    const loan = '10,000';
    const due = 'Due 10/03/2023';

    const orderNo = 'no-3632791101642108-1';
    const loanDate = '10-03-2023';
    const dueDate = '17-03-2023';
    const repaymentDate = '17-03-2023';
    const loanAmount = '₹ 4,800.00';
    const overdueDays = '0';
    const overdueFee = '₹ 0.00';
    const repaymentAmount = '₹ 4,800.00';


    const [collapse, setCollapse] = useState(true);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };


    return <div className={`border-solid border-slate-200 border px-3 pt-4 pb-3 mx-4 my-5 rounded-lg`}>
        <div className="flex flex-row justify-between mb-2">
            <div className="flex flex-row items-center">
                <div><img className="mr-2" src={logoSrc} alt="logo" /></div><div className="text-sm font-bold">{loanName}</div>
            </div>
            <div className="text-xs font-bold">{paymentStatus}</div>

        </div>
        <div className="flex flex-row justify-between">
            <div className="flex flex-col ">
                <div className="text-base font-bold mb-1">$ {loan}</div>
                <div className="text-xs">{due}</div>
            </div>
            <Button buttonText="Repay" width={'w-20'} fontSize="xs"/>
        </div>
        <Divider/>
        {collapse && <div className="px-3">
            <ListItem title={'No.'} text={orderNo} titleColor="text-slate-400" />
            <ListItem title={'Loan Date'} text={loanDate} titleColor="text-slate-400" />
            <ListItem title={'Due Date'} text={dueDate} titleColor="text-slate-400" />
            {paymentStatus === "Done" && <ListItem title={'Repayment Date'} text={repaymentDate} titleColor="text-slate-400" />}
            <ListItem title={'Loan Amount'} text={loanAmount} titleColor="text-slate-400" />
            <ListItem title={'Overdue Days'} text={overdueDays} titleColor="text-slate-400" />
            <ListItem title={'Overdue Fee'} text={overdueFee} titleColor="text-slate-400" />
            <Divider/>
            <ListItem title={'Repayment Amount'} text={repaymentAmount} titleColor="text-slate-400" fontWeight="font-bold"/>
            <Divider/>
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