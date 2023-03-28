import { useEffect, useState } from "react";
import PaymentItem from "./PaymentItem";
import { useLazyGetLoanRecordListQuery } from "../../api";
import { GetLoanRecordListRequestQuery } from "../../api/types/getLoanRecordList";
import Tag from "../../components/Tag";
// @ts-ignore
import { default as data } from './data.json';


export const LoanRecordPage = () => {
    console.log('config', data)
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
        triggerGetList({ pageNumber: 0, pageSize: 500, status: statusEnum[listStatus] as GetLoanRecordListRequestQuery['status'] });
    }, [listStatus])

    useEffect(() => {
        console.log('loanrecord', currentData)
    }, [currentData])

    return (
        <div>
            <div className={`flex flex-row py-3 px-5 justify-between`}>
                {['Unpaid', 'Overdue', 'Done'].map(i => <Tag
                    key={i} onClick={() => setListStatus(i)} text={i}
                    isActive={i === listStatus} style={` text-sm mx-1`} />)}
            </div>
            {// @ts-ignore
                data?.content?.map((record, index) => {
                    return <PaymentItem key={record.orderNo}  {...record} />
                })
            }
            {/* {
                currentData!==undefined && currentData?.content?.map(record=>{
                    return  <PaymentItem {...record}/>
                })
            } */}
            {/* <PaymentItem /> */}
        </div>
    )
}
