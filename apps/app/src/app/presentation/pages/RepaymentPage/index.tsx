import { useEffect, useState } from "react";
import PaymentItem from "./PaymentItem";
import { useLazyGetLoanRecordListQuery } from "../../../api/rtk";
import Tag from "../../components/Tag";
import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router";
// @ts-ignore
import { default as data } from './data.json';
import {Page} from "../../components/layouts/Page";
import {GetLoanRecordListRequest} from "../../../api/loanService/GetLoanRecordListRequest";


const RepaymentPage = () => {
    // console.log('config', data)
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetLoanRecordListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const statusEnum = {
        'Overdue': 'OVERDUE',
        'Done': 'PAY_OFF',
        'Unpaid': 'UNPAID',
        'Processing': 'PROCESSING',
        'Rejected': 'REJECTED',
        'Expend': 'EXTEND',
    } as { [key: string]: string; }

    const [listStatus, setListStatus] = useState('Unpaid');
    useEffect(() => {
        triggerGetList({ pageNumber: 0, pageSize: 500, status: statusEnum[listStatus] as GetLoanRecordListRequest['status'] });
    }, [listStatus])

    useEffect(() => {
        // console.log('loanrecord', currentData)
    }, [currentData])

    return (
        <Page className="flex flex-col">
            <div className={`flex flex-row py-3 px-5 justify-between sticky top-[0px] bg-white`}>
                {['Unpaid', 'Overdue', 'Done'].map(i => <Tag
                    key={i} onClick={() => setListStatus(i)} text={i}
                    isActive={i === listStatus} style={` text-sm mx-1`} />)}
            </div>
            {/* {// @ts-ignore
                data?.content?.map((record, index) => {
                    return <PaymentItem key={record.orderNo}  {...record} />
                })
            } */}
            {
                currentData && currentData.content.length > 0 ?
                    currentData?.content?.map(record => {
                        return <PaymentItem {...record} />
                    })
                    : <div className="flex justify-center items-center p-3 grow">There are no orders currently</div>
            }
        </Page>
    )
}

export default RepaymentPage;
