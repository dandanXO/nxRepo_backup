
import Divider from "../../components/Divider";
import ListItem from "../../components/ListItem";
import Button from "../../components/Button";
import { AmountPaidIcon, } from "@frontend/mobile/shared/ui";
import { Link,Outlet  } from "react-router-dom";
export const LoanRecordDetailPage = (props: any) => {

    const productName = 'CCC Loan';
    const orderNo = 'no-3632791101642108-1';
    const dueDate = '17-03-2023';
    const loanAmount = '₹ 4,800.00';
    const overdueDays = '0';
    const overdueFee = '₹ 0.00';
    const repaymentAmount = '₹ 4,800.00';
    const amountReapid = '- ₹ 0.00';


    return (
        <div>
            <div className={`text-sm text-center text-blue-500 bg-blue-200 py-2`}>Get more amount after instant payment</div>
            <div className={`px-6 pt-3`}>
                <ListItem title={'Product'} text={productName} titleColor="text-slate-400" />
                <ListItem title={'No.'} text={orderNo} titleColor="text-slate-400" />
                <ListItem title={'Due Date'} text={dueDate} titleColor="text-slate-400" />
                <ListItem title={'Loan Amount'} text={loanAmount} titleColor="text-slate-400" />
                <ListItem title={'Overdue Days'} text={overdueDays} titleColor="text-slate-400" />
                <ListItem title={'Overdue Fee'} text={overdueFee} titleColor="text-slate-400" />
                <ListItem title={
                    <div className={`flex flex-row item-center items-center`}>
                        <div className={` mr-1`}>Amount Repaid</div>
                        <Link to="amount-repaid-record-modal"><img src={AmountPaidIcon} /></Link>
                    </div>
                } text={amountReapid} titleColor="text-slate-400" />
                <Divider />
                <ListItem title={'Repayment Amount'} text={repaymentAmount} titleColor="text-slate-400" fontWeight="font-bold" />
                <div className={`flex flex-row my-3`}>
                    <Link to="extend-confirm-modal" className={`grow mr-1.5`}><Button buttonText={'Extend'} backgroundColor={'bg-orange-300'} width={`w-full`} /></Link>
                    <Link to="repayment-modal" className={`grow ml-1.5`}><Button buttonText={'Repay'} width={`w-full`} /></Link>
                </div>
                <div className={`text-xs text-gray-300`}>
                    <div>Attention：</div>
                    <ul className="list-decimal list-outside pl-3 pt-1">

                        <li>Before repayment, please make sure that you have enough balance on your bank account.</li>
                        <li>Overdue for more than <span className={`text-rose-600`}>N days</span> will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.</li>
                        <li>Email us if you have any questions about your responsibilities or for more information. <span className={`text-rose-600`}>mail@mail.com</span></li>
                    </ul>
                </div>
                <div className={`flex my-3`}>
                    <Link to="/upload-payment-receipt" className={`grow`}><Button buttonText={'Upload Receipt'} border={`border border-orange-600 border-solid`} color={`text-amber-500`} backgroundColor={'bg-none'} width={`w-full`} /></Link>
                </div>
                <div className={`text-xs text-gray-300`}>
                    After completing the repayment, take a screenshot and upload your repayment receipt here.
                </div>
            </div>
            <Outlet />
        </div>
    )
}


