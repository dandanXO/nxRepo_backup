import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { environment } from '../../../../environments/environmentModule/environment';
import { RootState } from '../../../reduxStore';
import { repaymentPageSlice } from '../../../reduxStore/repaymentPageSlice';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import Tag from '../../core-components/Tag';
import ExtendPaymentItem from './ExtendPaymentItem';
import OverduePaymentItem from './OverduePaymentItem';
import PayoffPaymentItem from './PayoffPaymentItem';
import ProcessingPaymentItem from './ProcessingPaymentItem';
import RejectPaymentItem from './RejectPaymentItem';
import UnpaidPaymentItem from './UnpaidPaymentItem';
// @ts-ignore
import { default as data } from './data.json';
import { RepaymentPageSagaActions } from './userUsecaseSaga';

const RepaymentPage = () => {
  const dispatch = useDispatch();

  const repaymentPageState = useSelector(
    (state: RootState) => state.repaymentPage
  );
  const [listStatus, setListStatus] = useState(repaymentPageState.paymentType);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(
      RepaymentPageSagaActions.user.pageAction({
        paymentType: repaymentPageState?.paymentType,
        scrollPosition: repaymentPageState.scrollPosition,
      })
    );
    //@ts-ignore
    divRef.current.scrollTop = repaymentPageState.scrollPosition;
  }, []);

  const handleClickPaymentType = (type: string) => {
    setListStatus(type);
    dispatch(
      RepaymentPageSagaActions.user.pageAction({
        paymentType: type,
        scrollPosition: 0,
      })
    );
    //@ts-ignore
    divRef.current.scrollTop = 0;
  };

  const handleOnscroll = (event: any) => {
    dispatch(
      repaymentPageSlice.actions.updateRepaymentPage({
        paymentType: listStatus,
        scrollPosition: event.target.scrollTop,
      })
    );
  };

  return (
    <Page className="flex flex-col">
      <Navigation title="Payment" className={'text-center'} />
      <div
        className={`top-0 mx-1 flex flex-row justify-between bg-white px-5 pb-3`}
      >
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
      <div
        ref={divRef}
        className={
          'flex h-[calc(100%_-_56px_-_38px_-_64px)] flex-col overflow-scroll'
        }
        onScroll={(e) => handleOnscroll(e)}
      >
        {repaymentPageState?.repaymentRecord &&
        repaymentPageState?.repaymentRecord?.length > 0 ? (
          repaymentPageState.repaymentRecord?.map((record, index) => {
            return (
              record?.status && (
                <div key={listStatus + record.orderNo + index}>
                  {
                    {
                      PROCESSING: <ProcessingPaymentItem {...record} />,
                      REJECTED: <RejectPaymentItem {...record} />,
                      UNPAID: <UnpaidPaymentItem {...record} />,
                      PAY_OFF: <PayoffPaymentItem {...record} />,
                      EXTEND: <ExtendPaymentItem {...record} />,
                      OVERDUE: <OverduePaymentItem {...record} />,
                    }[record?.status]
                  }
                </div>
              )
            );
          })
        ) : (
          <div className="flex grow items-center justify-center p-3">
            There are currently no orders
          </div>
        )}
      </div>
    </Page>
  );
};

export default RepaymentPage;
