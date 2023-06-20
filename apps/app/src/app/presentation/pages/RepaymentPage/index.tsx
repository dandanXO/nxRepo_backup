import { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { loadingSlice } from '../../../reduxStore/loadingSlice';

const RepaymentPage = () => {
  // console.log('config', data)
  const dispatch = useDispatch();
  const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
    useLazyGetLoanRecordListQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });
  const statusEnum = {
    Overdue: 'OVERDUE',
    Done: 'DONE',
    Unpaid: 'UNPAID',
    Processing: 'PROCESSING',
    Rejected: 'REJECTED',
    Expend: 'EXTEND',
  } as { [key: string]: string };

  const [listStatus, setListStatus] = useState('Unpaid');
  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(true))
    triggerGetList({
      pageNumber: 0,
      pageSize: 500,
      status: statusEnum[listStatus] as GetLoanRecordListRequest['status'],
    });
  }, [listStatus]);

    useEffect(() => {
        dispatch(loadingSlice.actions.updatePageLoading(isFetching))
    }, [isFetching]);



  return (
    <Page className="flex flex-col">

      <div className="text-center">
        <Navigation title="Payment" />
      </div>

      <div className={`flex flex-row justify-between bg-white px-5 pb-3`}>
        {['Unpaid', 'Overdue', 'Done'].map((i) => (
          <Tag
            layoutType={environment.country === 'in' ? 1 : 2}
            key={i}
            onClick={() => setListStatus(i)}
            text={i}
            active={i === listStatus}
            style={` text-sm mx-1`}
          />
        ))}
      </div>

      {/*TODO: refactor me*/}
      <div className={"h-[calc(100vh_-_56px_-_38px_-_72px)] overflow-scroll flex flex-col"}>
        {currentData && currentData.content && currentData.content.length > 0 ? (
          currentData?.content?.map((record) => {
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
          <div className="flex grow items-center justify-center p-3">There are no orders currently</div>
        )}
      </div>

    </Page>
  );
};

export default RepaymentPage;
