import cx from "classnames";
import {IndexPageProps} from "../../../../usecaseFlow/reduxStore";
import {formatPrice} from "../../../../modules/formatPrice";
import moment from "moment";
import {ORDER_STATE} from "../../../../domain/ORDER_STATE";
import {useNavigate} from "react-router-dom";
import { getToken } from "../../../../api/base/getToken"

type Props = IndexPageProps;

export const LatestOrderStatus = (props: Props) => {
  // NOTE: State1 - 到期前3天出現最近一期訂單提示用戶還款。
  // NOTE: State2 - 提醒您需要優先還清逾期款項才能再借款
  const navigate = useNavigate();
  return (
    <div className={"bg-white px-5 py-1.5 rounded-lg border border-orange-500 flex flex-col"}>

      <div className={"flex flex-row justify-between items-center"}>
        <div className={"left"}>
          <div className={"top flex flex-row"}>
            <div className={"font-light mr-2"}>Loan Order</div>
            <div className={"font-medium"}>₹ {formatPrice(props.state.order.overdueOrComingOverdueOrder?.payableAmount || 0)}</div>
          </div>

          <div className={"bottom flex flex-col"}>
            <div className={"flex flex-row"}>
              {props.state.order.state === ORDER_STATE.hasOverdueOrder && (
                <div className={"h-5 px-2 text-white text-sm bg-red-500 rounded-lg mr-1"}>Overdue</div>
              )}
              <div className={"flex flex-row"}>
                <div className={cx("font-light text-sm mr-2", {
                  "text-gray-400": props.state.order.state === ORDER_STATE.hasInComingOverdueOrder,
                  "text-red-500": props.state.order.state === ORDER_STATE.hasOverdueOrder
                })}>Due Date</div>
                <div className={cx("font-normal text-sm", {
                  "text-gray-500": props.state.order.state === ORDER_STATE.hasInComingOverdueOrder,
                  "text-red-500": props.state.order.state === ORDER_STATE.hasOverdueOrder
                })}>{moment(props.state.order.overdueOrComingOverdueOrder?.dueDate).format("DD-MM-YYYY")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={"right"}>
          <div className={"text-blue-800"} onClick={() => {
            navigate(`/loan-record-detail?token=${getToken()}`, { state: { orderNo: props.state.order.overdueOrComingOverdueOrder?.orderNo } })
          }}>Repay</div>
        </div>
      </div>
      {(props.state.order.state === ORDER_STATE.hasOverdueOrder) && (
        <>
          <div className={"w-full border-t-[1px] my-2 border-gray-400"}/>
          <div className={cx("font-light text-sm text-gray-400 leading-4 mr-2", ["text-red-500", props.state.order.state === ORDER_STATE.hasOverdueOrder])}>
            Remind you to prioritize paying off overdue payments before you can borrow again.
          </div>
        </>
      )}


    </div>
  )
}
