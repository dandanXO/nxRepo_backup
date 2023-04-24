
import Divider from "../../../../components/Divider";
import ListItem from "../../../../components/ListItem";
import { AmountPaidIcon, } from "@frontend/mobile/shared/ui";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useLazyGetLoanDetailQuery } from "../../../../../api/rtk";
import { useEffect, useState } from "react";
import { getToken } from "../../../../../modules/location/getToken";
import moment from "moment";
import {getOrderNo} from "../../../../../modules/location/getOrderNo";
import Money from "../../../../components/Money.tsx";
import {Button} from "../../../../components/layouts/Button";
import { GetLoanDetailChargeFeeDetailItems } from "../../../../../api/rtk/old/getLoanDetail";
import cx from "classnames";
import { Status } from "../../../../../modules/statusEnum";
const PakistanRepaymentDetailPage = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation();
    const { currentData } = props || {};
    const { status='', productName = '', orderNo = '', dueDate = '',  overdueDays = '', paidAmount = '', repayRecords = [], totalRepayAmount = '', chargeFeeDetail = {} } = currentData ?? {};
    const { items = [] } = chargeFeeDetail ?? {};

    const getItems = (field: string) => {
        return items.filter((i: GetLoanDetailChargeFeeDetailItems) => i.key === field)[0] || {}
    }

    // NOTE: 動態欄位
    const { value: loanAmount } = getItems('LOAN_AMOUNT');
    const { value: dailyFee } = getItems('DAILY_FEE');
    const { value: serviceFee } = getItems('SERVICE_FEE');
    const { value: gst } = getItems('GST');
    const { value: loanInterest } = getItems('LOAN_INTEREST');
    const { value: reductionAmount } = getItems('REDUCTION_AMOUNT');
    const { value: penaltyInterest } = getItems('PENALTY_INTEREST'); 

    console.log("RepaymentDetailPage.repayRecords PPPPPPPPKKKKKK", loanAmount);

    
    const renderStatusTag = (status: string) => {
        return (
            <div className={`${Status(status)?.style} px-1`}>
                {Status(status)?.text}
            </div>
        )
    }
    return (
        <div>
            <div className={`px-6 pt-3`}>
                <ListItem title={'Product'} text={productName ?? ''} titleColor="text-slate-400" />
                <ListItem title={'Order No.'} text={orderNo ?? ''} titleColor="text-slate-400" />
                <ListItem title={'Status'} text={status ? renderStatusTag(status) : ''} titleColor="text-slate-400" />
                <ListItem title={'Due Date'} text={dueDate ? moment(dueDate).format("MM-DD-YYYY") :''} titleColor="text-slate-400" />
                {loanAmount &&  <ListItem title={'Loan Amount'} text={<Money money={loanAmount}/>} titleColor="text-slate-400" />}
                <Divider />
                {dailyFee && <ListItem title={'Daily Fee'} text={<Money money={dailyFee}/>} titleColor="text-slate-400" />}
                {serviceFee && <ListItem title={'Service Fee'} text={<Money money={serviceFee}/>} titleColor="text-slate-400" />}
                {gst && <ListItem title={'GST'} text={<Money money={gst}/>} titleColor="text-slate-400" />}
                {loanInterest && <ListItem title={'Loan Interest'} text={<Money money={loanInterest}/>} titleColor="text-slate-400" />}
                <ListItem title={'Overdue Days'} text={overdueDays ?? ''} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
                <ListItem title={'Overdue Fee'} text={<Money money={penaltyInterest}/>} titleColor="text-slate-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
                <Divider />
                {reductionAmount && <ListItem title={'Reduction Amount'} text={<div className="flex"> - <Money money={reductionAmount}/></div>} titleColor="text-slate-400" />}
                <ListItem
                    titleColor="text-slate-400"
                    title={
                        <div className={`flex flex-row item-center items-center`}>
                            <div className={` mr-1`}>Amount Repaid</div>
                            <div onClick={() => {
                                navigate(`amount-repaid-record-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                                    state: { repayRecords }
                                })
                            }}><img src={AmountPaidIcon} />
                            </div>
                        </div>
                    }
                    text={<div className="flex"> - <Money money={paidAmount} /></div>} 
                />
                <Divider />
                <ListItem title={'Repayment Amount'} text={<Money money={totalRepayAmount} />}
                    titleColor={status === "OVERDUE" ? "text-red-500" : "text-slate-400"}
                    fontWeight="font-bold"
                />
                <div className={`flex flex-row my-3`}>

                    <div onClick={() => {
                      navigate(`extend-confirm-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                        state: currentData
                      })}
                    } className={`grow mr-1.5`}>
                      <Button text={"Extend"} className={`bg-primary-variant`}/>
                    </div>

                    <div onClick={() => {
                      navigate(`repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                        state: currentData
                      })}
                    }  className={`grow ml-1.5`}>
                      <Button text={"Repay"} className={`bg-primary-main`}/>
                    </div>

                </div>
               
                {(status === "UNPAID" || status === "OVERDUE") &&
                    <>
                        <div className={`text-xs text-gray-300`}>
                            <div>Attention：</div>
                            <ul className="list-decimal list-outside pl-3 pt-1">
                                <li>Before repayment, please make sure that you have enough balance on your bank account.</li>
                                <li>Overdue for more than <span className={`text-primary-main`}>N days</span> will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.</li>
                                <li>Email us if you have any questions about your responsibilities or for more information. <span className={`text-primary-main`}>mail@mail.com</span></li>
                            </ul>
                        </div>
                        <div className={`flex flex-col my-3`}>
                            <div className="h-2.5 bg-slate-200 mx-[-24px] my-2"></div>
                            <div className={`text-xs text-gray-300 `}>
                                After completing the repayment, take a screenshot and upload your repayment receipt here.
                            </div>
                            {/*TODO: 先兼容 querystring*/}
                            <div className={`grow mt-2`} onClick={() => {
                                navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${getOrderNo()}`, {
                                    state: orderNo,
                                })
                            }}>
                                <Button text={"Upload Receipt"} className={`border-primary-main border-[1.5px] border-solid text-primary-main w-full bg-none`} />
                            </div>
                        </div>
                    </>
                }

            </div>
            <Outlet />
        </div>
    )
}

export default PakistanRepaymentDetailPage;
