import cx from 'classnames';
import { IndexPageProps } from '../../../../../reduxStore';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import moment from 'moment';
import { ORDER_STATE } from '../../../../../domain/order/ORDER_STATE';
import { useNavigate } from 'react-router';
import { getToken } from '../../../../../modules/querystring/getToken';
import { PagePathEnum } from '../../../PagePathEnum';

type Props = IndexPageProps;

export const LatestOrderStatus = (props: Props) => {
  // NOTE: State1 - 到期前3天出現最近一期訂單提示用戶還款。
  // NOTE: State2 - 提醒您需要優先還清逾期款項才能再借款

  const navigate = useNavigate();

  // NOTE: User Event
  const onUserClickToRepay = () => {
    navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
      state: {
        orderNo: props.state.order.overdueOrComingOverdueOrder?.orderNo,
      },
    });
  };

  // TODO: refactor
  const hasOverdueOrder = props.state.order.state === ORDER_STATE.hasOverdueOrder;
  const hasInComingOverdueOrder = props.state.order.state === ORDER_STATE.hasInComingOverdueOrder;

  return (
    <div className={'flex flex-col rounded-lg border border-orange-500 bg-white px-5 py-1.5'}>
      <div className={'flex flex-row items-center justify-between'}>
        <div className={'left'}>
          <div className={'top flex flex-row'}>
            <div className={'mr-2 font-light'}>Loan Order</div>
            <div className={'font-medium'}>
              ₹ {formatPrice(props.state.order.overdueOrComingOverdueOrder?.payableAmount || 0)}
            </div>
          </div>

          <div className={'bottom flex flex-col'}>
            <div className={'flex flex-row'}>
              {/*NOTE: 顯示逾期文字*/}
              {hasOverdueOrder && (
                <div className={'mr-1 h-5 rounded-lg bg-red-500 px-2 text-sm text-white'}>Overdue</div>
              )}
              <div className={'flex flex-row'}>
                {/*NOTE: 顯示逾期時間文字*/}
                <div
                  className={cx('mr-2 text-sm font-light', {
                    'text-gray-400': hasInComingOverdueOrder,
                    'text-red-500': hasOverdueOrder,
                  })}
                >
                  Due Date
                </div>
                {/*NOTE: 顯示逾期時間*/}
                <div
                  className={cx('text-sm font-normal', {
                    'text-gray-500': hasInComingOverdueOrder,
                    'text-red-500': hasOverdueOrder,
                  })}
                >
                  {moment(props.state.order.overdueOrComingOverdueOrder?.dueDate).format('DD-MM-YYYY')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={'right'}>
          <div data-testing-id={'repay'} className={'text-blue-800'} onClick={onUserClickToRepay}>
            Repay
          </div>
        </div>
      </div>

      {/*NOTE: 逾期*/}
      {hasOverdueOrder && (
        <>
          <div className={'my-2 w-full border-t-[1px] border-gray-400'} />
          <div className={cx('mr-2 text-sm font-light leading-4 text-gray-400 text-red-500')}>
            Remind you to prioritize paying off overdue payments before you can borrow again.
          </div>
        </>
      )}
    </div>
  );
};
