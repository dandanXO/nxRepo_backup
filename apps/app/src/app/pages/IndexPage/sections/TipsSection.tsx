import {IndexPageProps} from "../../../store";
import {ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE} from "../../../flow";

type Props = IndexPageProps;

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
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota
  ) {
    messageComponent =  (
        <>
          <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
            Remind you to prioritize repayment to obtain a higher credit limit, and wait for the next round of preferential loan plans.
          </div>
          <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
            Remind you to prioritize repayment to obtain a higher credit limit, and wait for the next round of preferential loan plans.
          </div>
        </>
      )
  } else if(
    props.state.user.state === USER_AUTH_STATE.success &&
    props.state.riskControl.state === RISK_CONTROL_STATE.expired_refresh_able
  ){
    messageComponent =  (
      <>
        <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
          Your current preferential loan quota has been used up, please wait for the next round of preferential loan plans.
        </div>
        <div className={"text-orange-400 bg-orange-50 text-sm text-center leading-4 font-light px-4 py-2 rounded-b-xl"}>
          Remind you to prioritize repayment to obtain a higher credit limit.
        </div>
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
