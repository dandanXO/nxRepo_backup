import cx from 'classnames';
import {ReactNode} from 'react';

import {ORDER_STATE} from '../../../../../domain/order/ORDER_STATE';
import {RISK_CONTROL_STATE} from '../../../../../domain/risk/RISK_CONTROL_STATE';
import {IndexPageProps} from '../../../../../reduxStore';
import {PageState, PageStateEnum} from '../../index';

type Props = {
  children?: ReactNode;
} & IndexPageProps &
  PageState;

export const StatusContainer = (props: Props) => {
  return (
    <div
      className={cx('loan-amount flex w-full flex-col rounded-t-lg p-2', {
        'bg-cstate-disable-main':
          props.pageState === PageStateEnum.UserAuthing ||
          props.pageState === PageStateEnum.UserRejected ||
          props.state.order.state === ORDER_STATE.hasOverdueOrder ||
          props.state.riskControl.state === RISK_CONTROL_STATE.order_reject ||
          props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota ||
          props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able||
          props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_over_3 ,
        'bg-primary-main':
          props.pageState !== PageStateEnum.UserAuthing &&
          props.pageState !== PageStateEnum.UserRejected &&
          props.state.order.state !== ORDER_STATE.hasOverdueOrder &&
          props.state.riskControl.state !== RISK_CONTROL_STATE.order_reject &&
          props.state.riskControl.state !== RISK_CONTROL_STATE.empty_quota &&
          props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able &&
          props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_over_3,
      })}
    >
      {props.children}
    </div>
  );
};
