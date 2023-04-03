import {IndexPageProps} from "../../../usecaseFlow/store";
import {USER_AUTH_STATE} from "../../../usecaseFlow/domain/USER_AUTH_STATE";
import {ORDER_STATE} from "../../../usecaseFlow/domain/ORDER_STATE";
import {RISK_CONTROL_STATE} from "../../../usecaseFlow/domain/RISK_CONTROL_STATE";

type Props = IndexPageProps & {
  isLoading: boolean;
}

export const TipsSection = (props: Props) => {
  let messageComponent = null;

  if(
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.order.state === ORDER_STATE.hasInComingOverdueOrder
  ) {
    messageComponent = (
      <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
        To maintain a good credit record, we remind you to prioritize and make repayments on time in order to unlock higher loan amounts in the future.
      </div>
    )
  } else if(
    // TODO: 檢查下
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.empty_quota &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_able &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_one_time &&
    props.state.riskControl.state !== RISK_CONTROL_STATE.expired_refresh_over_3 &&
    props.state.indexAPI?.availableAmount === 0
  ) {
    // NOTE: 沒有應還訂單時的文案
    if(props.state.order.state === ORDER_STATE.empty) {
      messageComponent =  (
        <>
          <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
            <div className={"mb-2"}>Your current preferential loan quota has been used up.</div>
          </div>
        </>
      )
      // NOTE: 有應還訂單時的文案
    } else if(props.state.order.state === ORDER_STATE.normal){
      messageComponent =  (
        <>
          <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
            <div className={"mb-2"}>Your current preferential loan quota has been used up.</div>
            <div>Remind you to prioritize repayment to obtain a higher credit limit, and wait for the next round of preferential loan plans.</div>
          </div>
        </>
      )
    }

  } else if(
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able
  ){
    if(props.isLoading) {
      return null;
    }
    messageComponent =  (
      <>
        <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
          <div className={"mb-2"}>The available credit limit has expired, please reacquire credit amount.</div>
          <div>Before reacquire credit amount, we strongly suggest that you prioritize repayment before you can reapply for a higher credit limit.</div>
        </div>
        {/*TODO: 沒有應還訂單時的文案*/}
        {/*The available credit limit has expired, please reacquire credit amount.*/}
        {/*TODO: 有應還訂單時的文案*/}
        {/*The available credit limit has expired, please reacquire credit amount.*/}
        {/*Before reacquire credit amount, we strongly suggest that you prioritize repayment before you can reapply for a higher credit limit.*/}
      </>
    )
  }

  return (
    <div className={""}>
      {messageComponent && <div className={"inline-block text-white text-sm px-2 py-1 bg-yellow-400 rounded-t-xl"}>Tips</div>}
      {messageComponent}
    </div>
  )
}
