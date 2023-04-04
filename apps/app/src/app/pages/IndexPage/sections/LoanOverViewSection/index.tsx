import {IndexPageProps} from "../../../../usecaseFlow/reduxStore";
import {formatPrice} from "../../../../modules/formatPrice";

type Props = IndexPageProps;

export const LoanOverViewSection = (props: Props) => {
  return (
    <div>
      <div className={"font-medium mb-2"}>Loan Over View</div>

      <div className={"w-full flex flex-row justify-center"}>
        <div className={"left mr-4 relative"}>
          <div className={"w-36 h-36 bg-gray-500 rounded-full flex flex-col justify-center items-center"}>
            <div className={"w-32 h-32 bg-white rounded-full"}>
              <div className={"w-32 h-32 quota-info flex flex-col justify-center items-center"}>
                <div className={"price font-medium"}>₹ {formatPrice(props.state.indexAPI?.availableAmount || 0)}</div>
                <div className={"text1 font-light"}>Available</div>
                <div className={"text2 font-light"}>Balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className={"right flex flex-col justify-center items-end"}>
          <div className={"used-amount flex flex-col justify-end items-end"}>
            <div className={"label flex flex-row justify-between items-center"}>
              <div className={"label-color w-4 h-1.5 bg-gray-400 rounded mr-2"}></div>
              <div className={"label-price font-light"}>Used Amount</div>
            </div>
            <div className={"price font-medium"}>₹ {formatPrice(props.state.indexAPI?.usedAmount || 0)}</div>
          </div>
          <div className={"total-amount flex flex-col justify-end"}>
            <div className={"label font-light"}>Total Amount</div>
            <div className={"price font-medium text-right"}>₹ {formatPrice(props.state.indexAPI?.totalAmount || 0)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
