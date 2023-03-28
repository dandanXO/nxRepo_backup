import {ReactNode} from "react";
import cx from "classnames";
import {IndexPageProps} from "../../../../store";
import {PageState, PageStateEnum} from "../../index";
import {ORDER_STATE, USER_AUTH_STATE} from "../../../../flow";

type Props = {
  children?: ReactNode;
} & IndexPageProps & PageState;

export const StatusContainer = (props: Props) => {
  return (
    <div className={cx("loan-amount flex flex-col p-2 w-full rounded-t-lg", {
      "bg-[#D9D9D9]":
        props.pageState === PageStateEnum.UserAuthing ||
        props.pageState === PageStateEnum.UserRejected ||
        props.state.order.state === ORDER_STATE.hasInComingOverdueOrder ||
        props.state.order.state === ORDER_STATE.hasOverdueOrder ||
        props.state.order.state === ORDER_STATE.reject,
      "bg-orange-400":
        props.pageState !== PageStateEnum.UserAuthing &&
        props.pageState !== PageStateEnum.UserRejected &&
        props.state.order.state !== ORDER_STATE.hasInComingOverdueOrder &&
        props.state.order.state !== ORDER_STATE.hasOverdueOrder &&
        props.state.order.state !== ORDER_STATE.reject
    })}>
      {props.children}
    </div>
  )
}
