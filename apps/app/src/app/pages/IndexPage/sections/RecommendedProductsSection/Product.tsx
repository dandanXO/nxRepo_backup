import {MdExpandLess, MdExpandMore} from "react-icons/all";
import {useCallback, useState} from "react";
import {PlatformProduct} from "../../../../api/models/PlatformProduct";
import {environment} from "../../../../../environments/environment";
import {formatPrice} from "../../../../modules/formatPrice";
import moment from "moment-timezone";
import cx from "classnames";


type Props = {
  product: PlatformProduct;
  loanInterestRate: number;
  className?: string;
};

export const Product = (props: Props) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const interestPrice = props.product.max * props.product.platformChargeFeeRate * props.loanInterestRate;
  const disbursalPrice = props.product.max * (1 - props.loanInterestRate)
  const dueDate = moment().add(props.product.terms - 1, "days").format("MM-DD-YYYY")

  return (
    <div className={cx("product flex flex-col mb-1")} onClick={toggleExpand}>
      <div className={"brand pb-1 flex flex-row justify-between"}>
        <div className={"left flex flex-row items-center"}>
          <div className={"w-10 h-10 rounded-md mr-3"}>
            <img src={props.product.logoUrl}/>
          </div>
          <div className={"font-light"}>{props.product.productName}</div>
        </div>
        <div className={"right flex flex-row items-center"}>
          <div className={"font-light"}>₹ 3,200</div>
          {expand ? (
            <MdExpandMore size={30} color={"#AAAAAA"}/>
          ) : (
            <MdExpandLess size={30} color={"#AAAAAA"}/>
          )}
        </div>
      </div>
      {expand && (
        <div className={"expandable-brand bg-[#F3F3F3] text-[#707070] p-2 flex flex-col"}>
          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Interest</div>
            <div className={"value"}>{environment.currency} {formatPrice(interestPrice)}</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Terms</div>
            <div className={"value"}>{props.product.terms}days</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Disbursal Amount </div>
            <div className={"value"}>{environment.currency} {formatPrice(disbursalPrice)}</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Due Date</div>
            <div className={"value"}>{dueDate}</div>
          </div>
        </div>
      )}
    </div>
  )
}
