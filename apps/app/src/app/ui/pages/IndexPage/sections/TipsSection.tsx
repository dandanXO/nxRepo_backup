import { ORDER_STATE } from '../../../../domain/order/ORDER_STATE';
import { RISK_CONTROL_STATE } from '../../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../../domain/user/USER_AUTH_STATE';
import { IndexPageProps } from '../../../../reduxStore';

type Props = IndexPageProps & {
  isLoading: boolean;
};

export const TipsSection = (props: Props) => {
  let messageComponent = null;

  //   if(
  //     props.state.user.state === USER_AUTH_STATE.success &&
  //     props.state.order.state === ORDER_STATE.hasInComingOverdueOrder
  //   ) {
  //     messageComponent = (
  //     //   <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
  //     //     To maintain a good credit record, we remind you to prioritize and make repayments on time in order to unlock higher loan amounts in the future.
  //     //   </div>
  //     <></>
  //     )
  //   } else

  if (
    // TODO: 檢查下
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.empty_quota &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able &&
    props.state.riskControl.state !==
      RISK_CONTROL_STATE.expired_refresh_one_time &&
    props.state.riskControl.state !==
      RISK_CONTROL_STATE.expired_refresh_over_3 &&
    props.state.indexAPI?.availableAmount === 0 &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.order_reject
  ) {
    messageComponent = (
      <div
        className={
          'bg-secondary-assistant text-secondary-variant rounded-b-xl px-4 py-3 text-center text-sm font-light leading-4'
        }
      >
        <div className={'mb-2'}>
          Your current preferential loan quota has been used up.
        </div>
        <div>
          Remind you to prioritize repayment to obtain a higher credit limit,
          and wait for the next round of preferential loan plans.
        </div>
      </div>
    );
  } else if (
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able
    //  &&
    // props.state.order.state !== ORDER_STATE.hasInComingOverdueOrder &&
    // props.state.order.state !== ORDER_STATE.hasOverdueOrder
  ) {
    if (props.isLoading) {
      return null;
    }

    if (
      props.state.order.state !== ORDER_STATE.empty &&
      props.state.order.state !== ORDER_STATE.normal
    ) {
      return messageComponent;
    }
    messageComponent = (
      <div
        className={
          'bg-secondary-assistant text-secondary-variant rounded-b-xl px-4 py-3 text-center text-sm font-light leading-4'
        }
      >
        {/*TODO: 有 & 沒有應還訂單時的文案*/}
        <div className={'mb-2'}>
          The available credit limit has expired, please reacquire credit
          amount.
        </div>
        {/*TODO: 有應還訂單時的文案*/}
        {props.state.order.state === ORDER_STATE.normal && (
          <div>
            Before reacquire credit amount, we strongly suggest that you
            prioritize repayment before you can reapply for a higher credit
            limit.
          </div>
        )}
      </div>
    );
  } else if (
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state === RISK_CONTROL_STATE.valid &&
    props.state.order.state !== ORDER_STATE.hasOverdueOrder &&
    props.state.order.state !== ORDER_STATE.reject &&
    props.state.indexAPI?.products !== undefined &&
    // NOTICE: 包含幾種情境
    // 1.可用餘額小於產品最低借款金額
    // 2.超過可借款筆數
    // 3.沒有產品可以借款
    props.state.indexAPI?.products?.length === 0
  ) {
    messageComponent = (
      <div
        className={
          'bg-secondary-assistant text-secondary-variant rounded-b-xl px-4 py-3 text-center text-sm font-light leading-4'
        }
      >
        There are currently no products available for borrowing. Please return
        after countdown ends.
      </div>
    );
  }
  if (!messageComponent) return null;

  return (
    <div className={'mb-3 '} data-testing-id={'tips'}>
      {messageComponent && (
        <div
          className={
            'bg-secondary-variant inline-block rounded-t-xl px-3 py-1 text-xs font-bold text-white'
          }
        >
          Tips
        </div>
      )}
      {messageComponent}
    </div>
  );
};
