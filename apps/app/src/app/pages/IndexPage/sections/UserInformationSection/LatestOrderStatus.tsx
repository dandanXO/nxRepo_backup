import {useState} from "react";
import cx from "classnames";

export const LatestOrderStatus = () => {
  // NOTE: State1 - 到期前3天出現最近一期訂單提示用戶還款。
  // NOTE: State2 - 提醒您需要優先還清逾期款項才能再借款
  const [state, setState] = useState(2);
  return (
    <div className={"bg-white px-5 py-1.5 rounded-lg border border-orange-500 flex flex-col"}>

      <div className={"flex flex-row justify-between items-center"}>
        <div className={"left"}>
          <div className={"top flex flex-row"}>
            <div className={"font-light mr-2"}>Loan Order</div>
            <div className={"font-medium"}>₹ 4,800</div>
          </div>

          <div className={"bottom flex flex-col"}>
            <div className={"flex flex-row"}>
              {state === 2 && (
                <div className={"h-5 px-2 text-white text-sm bg-red-500 rounded-lg mr-1"}>Overdue</div>
              )}
              <div className={"flex flex-row"}>
                <div className={cx("font-light text-sm mr-2", {"text-gray-400": state === 1, "text-red-500": state === 2})}>Due Date</div>
                <div className={cx("font-normal text-sm", {"text-gray-500": state === 1, "text-red-500": state === 2})}>21-03-2023</div>
              </div>
            </div>
          </div>
        </div>
        <div className={"right"}>
          <div className={"text-blue-800"}>Repay</div>
        </div>
      </div>

      {state === 2 && (
        <>
          <div className={"w-full border-t-[1px] my-2 border-gray-400"}/>
          <div className={cx("font-light text-sm text-gray-400 leading-4 mr-2", ["text-red-500", state === 2])}>
            Remind you to prioritize paying off overdue payments before you can borrow again.
          </div>
        </>
      )}


    </div>
  )
}
