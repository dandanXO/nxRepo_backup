
import Divider from "../../components/Divider";
import ListItem from "../../components/ListItem";
import Button from "../../components/Button";
import { AmountPaidIcon, } from "@frontend/mobile/shared/ui";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetLoanDetailQuery } from "../../api";
import { useEffect, useState } from "react";
import { getToken } from "../../api/base/getToken";
import { environment } from "../../../environments/environment";

export const LoanRecordDetailPage = (props: any) => {
    const location = useLocation();
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetLoanDetailQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        triggerGetList({ orderNo: location.state.orderNo });
    }, [])

    useEffect(() => {

        console.log('loanDetail', currentData)
    }, [currentData])

    const { status = '', productName = '', orderNo = '', dueDate = '', loanAmount = '', overdueDays = '', penaltyInterest = '', paidAmount = '', repayRecords = [], totalRepayAmount = '' } = currentData ?? {};
    return (
        <div>
            <div className={`text-sm text-center text-blue-500 bg-blue-200 py-2`}>Get more amount after instant payment</div>
            <div className={`px-6 pt-3`}>
                <ListItem title={'Product'} text={productName ?? ''} titleColor="text-slate-400" />
                <ListItem title={'No.'} text={orderNo ?? ''} titleColor="text-slate-400" />
                <ListItem title={'Due Date'} text={dueDate ?? ''} titleColor="text-slate-400" />
                <ListItem title={'Loan Amount'} text={`${environment.currency} ${loanAmount ?? ''}`} titleColor="text-slate-400" />
                <ListItem title={'Overdue Days'} text={overdueDays ?? ''} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
                <ListItem title={'Overdue Fee'} text={`${environment.currency} ${penaltyInterest ?? ''}`} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
                <ListItem title={
                    <div className={`flex flex-row item-center items-center`}>
                        <div className={` mr-1`}>Amount Repaid</div>
                        <Link to={{pathname: 'amount-repaid-record-modal'}} state={{repayRecords}}><img src={AmountPaidIcon} /></Link>
                    </div>
                } text={`- ${environment.currency} ${paidAmount ?? ''}`} titleColor="text-slate-400" />
                <Divider />
                <ListItem title={'Repayment Amount'} text={`${environment.currency} ${totalRepayAmount ?? ''}`} titleColor="text-slate-400" fontWeight="font-bold" />
                <div className={`flex flex-row my-3`}>
                    <Link to={{pathname: `extend-confirm-modal`}} state={{currentData}} className={`grow mr-1.5`}><Button buttonText={'Extend'} backgroundColor={'bg-orange-300'} width={`w-full`} /></Link>
                    <Link to={{pathname: `repayment-modal`}} state={{currentData}} className={`grow ml-1.5`}><Button buttonText={'Repay'} width={`w-full`} /></Link>
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


