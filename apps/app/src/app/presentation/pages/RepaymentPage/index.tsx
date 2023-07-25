import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { environment } from '../../../../../src/environments/environment';
import { GetLoanRecordListRequest } from '../../../api/loanService/GetLoanRecordListRequest';
import { useLazyGetLoanRecordListQuery } from '../../../api/rtk';
import Tag from '../../components/Tag';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import ExtendPaymentItem from './ExtendPaymentItem';
import OverduePaymentItem from './OverduePaymentItem';
import PayoffPaymentItem from './PayoffPaymentItem';
import ProcessingPaymentItem from './ProcessingPaymentItem';
import RejectPaymentItem from './RejectPaymentItem';
import UnpaidPaymentItem from './UnpaidPaymentItem';
// @ts-ignore
import { default as data } from './data.json';
import { useDispatch, useSelector } from 'react-redux';
import { RepaymentPageSagaActions } from './userUsecaseSaga';
import { RepaymentPageActionPayload, repaymentPageSlice } from '../../../reduxStore/repaymentPageSlice';
import { RootState } from '../../../reduxStore';

const RepaymentPage = () => {

    const dispatch = useDispatch();

    const repaymentPageState = useSelector((state: RootState) => state.repaymentPage)
    const [listStatus, setListStatus] = useState(repaymentPageState.paymentType);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(RepaymentPageSagaActions.user.pageAction({
            paymentType: repaymentPageState?.paymentType,
            scrollPosition: repaymentPageState.scrollPosition
        }))
        //@ts-ignore
        divRef.current.scrollTop = repaymentPageState.scrollPosition
    }, [])

    const handleClickPaymentType = (type: string) => {
        setListStatus(type)
        dispatch(RepaymentPageSagaActions.user.pageAction({
            paymentType: type,
            scrollPosition: 0
        }))
        //@ts-ignore
        divRef.current.scrollTop = 0
    }

    const handleOnscroll = (event: any) => {
        dispatch(repaymentPageSlice.actions.updateRepaymentPage({
            paymentType: listStatus,
            scrollPosition: event.target.scrollTop,
        }))
    }

    return (
        <Page className="flex flex-col">
            <div className="text-center">
                <Navigation title="Payment" />
            </div>
            <div className={`flex flex-row justify-between bg-white px-5 pb-3 -mx-1`}>
                {['Unpaid', 'Overdue', 'Done'].map((i) => (
                    <Tag
                        layoutType={environment.country === 'in' ? 1 : 2}
                        key={i}
                        onClick={() => handleClickPaymentType(i)}
                        text={i}
                        active={i === listStatus}
                        style={` text-sm mx-1`}
                    />
                ))}
            </div>

            {/*TODO: refactor me*/}
            <div ref={divRef} className={"h-[calc(100vh_-_56px_-_38px_-_72px)] overflow-scroll flex flex-col"} onScroll={(e) => handleOnscroll(e)}>
                {repaymentPageState?.repaymentRecord &&
                    repaymentPageState?.repaymentRecord?.length > 0 ? (
                    repaymentPageState.repaymentRecord?.map((record) => {
                        return (
                            record?.status &&
                            {
                                PROCESSING: <ProcessingPaymentItem {...record} key={record.orderNo} />,
                                REJECTED: <RejectPaymentItem {...record} key={record.orderNo} />,
                                UNPAID: <UnpaidPaymentItem {...record} key={record.orderNo} />,
                                PAY_OFF: <PayoffPaymentItem {...record} key={record.orderNo} />,
                                EXTEND: <ExtendPaymentItem {...record} key={record.orderNo} />,
                                OVERDUE: <OverduePaymentItem {...record} key={record.orderNo} />,
                            }[record?.status]
                        );
                    })
                ) : (
                    <div className="flex grow items-center justify-center p-3">There are currently no orders</div>
                )}
            </div>

        </Page>
    );
};

export default RepaymentPage;
