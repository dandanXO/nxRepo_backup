import {ReactNode} from "react";
import cx from "classnames";
import {IndexPageProps} from "../../../../usecaseFlow/store";
import {PageState, PageStateEnum} from "../../index";
import {USER_AUTH_STATE} from "../../../../usecaseFlow/domain/USER_AUTH_STATE";
import {ORDER_STATE} from "../../../../usecaseFlow/domain/ORDER_STATE";
import {RISK_CONTROL_STATE} from "../../../../usecaseFlow/domain/RISK_CONTROL_STATE";

type Props = {
  children?: ReactNode;
} & IndexPageProps & PageState;

export const StatusContainer = (props: Props) => {
  return (
    <div className={cx("loan-amount flex flex-col p-2 w-full rounded-t-lg", {
      "bg-[#D9D9D9]":
        props.pageState === PageStateEnum.UserAuthing ||
        props.pageState === PageStateEnum.UserRejected ||
        props.state.order.state === ORDER_STATE.hasOverdueOrder ||
        props.state.order.state === ORDER_STATE.reject ||
        props.state.riskControl.state === RISK_CONTROL_STATE.empty_quota,
      "bg-orange-400":
        props.pageState !== PageStateEnum.UserAuthing &&
        props.pageState !== PageStateEnum.UserRejected &&
        props.state.order.state !== ORDER_STATE.hasOverdueOrder &&
        props.state.order.state !== ORDER_STATE.reject &&
        props.state.riskControl.state !== RISK_CONTROL_STATE.empty_quota,
    })}>
      {props.children}
    </div>
  )
}
