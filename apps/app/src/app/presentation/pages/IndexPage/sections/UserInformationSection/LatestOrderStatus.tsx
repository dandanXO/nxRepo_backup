import cx from 'classnames';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { ORDER_STATE } from '../../../../../domain/order/ORDER_STATE';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import { getToken } from '../../../../../modules/querystring/getToken';
import { IndexPageProps } from '../../../../../reduxStore';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import Divider from "../../../../core-components/Divider";
import {formatDate} from "../../../../../modules/format/formatDate";
import Money from '../../../../components/Money';

type Props = IndexPageProps;

export const LatestOrderStatus = (props: Props) => {
  // NOTE: State1 - 到期前3天出現最近一期訂單提示用戶還款。
  // NOTE: State2 - 提醒您需要優先還清逾期款項才能再借款

  const navigate = useNavigate();

  // NOTE: User Event
  const onUserClickToRepay = () => {
    const orderNo = props.state.order.overdueOrComingOverdueOrder?.orderNo;
    navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${orderNo}`, {
      state: {
        orderNo: orderNo,
      },
    });
  };

  // TODO: refactor
  const hasOverdueOrder = props.state.order.state === ORDER_STATE.hasOverdueOrder;
  const hasInComingOverdueOrder = props.state.order.state === ORDER_STATE.hasInComingOverdueOrder;

  return (
    <div className={'flex flex-col rounded-lg border border-primary-main bg-white px-5 py-1.5'} data-testing-id="orderNotice" data-order-status={props.state.order.state}>
      <div className={'flex flex-row items-center justify-between'}>
        <div className={'left'}>
          <div className={'top flex flex-row text-sm'}>
            <div className={'mr-2 text-sm text-ctext-primary'}>Loan Order</div>
            <div className={'font-bold text-ctext-primary'}>
                <Money money={props.state.order.overdueOrComingOverdueOrder?.payableAmount || 0}/>
            </div>
          </div>

          <div className={'bottom flex flex-col text-xs'}>
            <div className={'flex flex-row items-end'}>
              {/*NOTE: 顯示逾期文字*/}
              {hasOverdueOrder && (
                <div className={'mr-1 rounded-lg bg-cstate-error-main px-2 py-0.5 text-xs text-white'}>Overdue</div>
              )}
              <div className={'flex flex-row'}>
                {/*NOTE: 顯示逾期時間文字*/}
                <div
                  className={cx('mr-1 text-xs', {
                    'text-ctext-tertiary': hasInComingOverdueOrder,
                    'text-cstate-error-main': hasOverdueOrder,
                  })}
                >
                  Due Date
                </div>
                {/*NOTE: 顯示逾期時間*/}
                <div
                  className={cx('text-xs font-bold', {
                    'text-ctext-tertiary': hasInComingOverdueOrder,
                    'text-cstate-error-main': hasOverdueOrder,
                  })}
                >
                  {formatDate(moment(props.state.order.overdueOrComingOverdueOrder?.dueDate))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={'right'}>
          <div data-testing-id={'repay'} className={'text-cstate-info-main font-bold text-sm'} onClick={onUserClickToRepay}>
            Repay
          </div>
        </div>
      </div>

      {/*NOTE: 逾期*/}
      {hasOverdueOrder && (
        <>
          {/*TODO: refactor me*/}
          <div className={'my-2 w-full border-t-[1px] border-ctext-divider'} />
          <div className={cx('mr-2 text-xs leading-4 text-cstate-error-main text-cstate-error-main')}>
            Remind you to prioritize paying off overdue payments before you can borrow again.
          </div>
        </>
      )}
    </div>
  );
};
