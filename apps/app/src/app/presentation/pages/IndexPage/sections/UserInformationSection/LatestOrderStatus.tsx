import cx from 'classnames';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { ORDER_STATE } from '../../../../../domain/order/ORDER_STATE';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import { getToken } from '../../../../../modules/querystring/getToken';
import { IndexPageProps } from '../../../../../reduxStore';
import { PagePathEnum } from '../../../PagePathEnum';
import Divider from "../../../../components/Divider";

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
    <div className={'flex flex-col rounded-lg border border-primary-main bg-white px-5 py-1.5'}>
      <div className={'flex flex-row items-center justify-between'}>
        <div className={'left'}>
          <div className={'top flex flex-row'}>
            <div className={'mr-2 font-light text-ctext-primary'}>Loan Order</div>
            <div className={'font-light text-ctext-primary'}>
              ₹ {formatPrice(props.state.order.overdueOrComingOverdueOrder?.payableAmount || 0)}
            </div>
          </div>

          <div className={'bottom flex flex-col'}>
            <div className={'flex flex-row'}>
              {/*NOTE: 顯示逾期文字*/}
              {hasOverdueOrder && (
                <div className={'mr-1 h-5 rounded-lg bg-cstate-error-main px-2 text-sm text-white'}>Overdue</div>
              )}
              <div className={'flex flex-row'}>
                {/*NOTE: 顯示逾期時間文字*/}
                <div
                  className={cx('mr-2 text-sm font-light', {
                    'text-ctext-tertiary': hasInComingOverdueOrder,
                    'text-cstate-error-main': hasOverdueOrder,
                  })}
                >
                  Due Date
                </div>
                {/*NOTE: 顯示逾期時間*/}
                <div
                  className={cx('text-sm font-bold', {
                    'text-ctext-tertiary': hasInComingOverdueOrder,
                    'text-cstate-error-main': hasOverdueOrder,
                  })}
                >
                  {moment(props.state.order.overdueOrComingOverdueOrder?.dueDate).format('DD-MM-YYYY')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={'right'}>
          <div data-testing-id={'repay'} className={'text-cstate-info-main font-light'} onClick={onUserClickToRepay}>
            Repay
          </div>
        </div>
      </div>

      {/*NOTE: 逾期*/}
      {hasOverdueOrder && (
        <>
          {/*TODO: refactor me*/}
          <div className={'my-2 w-full border-t-[1px] border-ctext-divider'} />
          <div className={cx('mr-2 text-sm font-light leading-4 text-gray-400 text-cstate-error-main')}>
            Remind you to prioritize paying off overdue payments before you can borrow again.
          </div>
        </>
      )}
    </div>
  );
};
