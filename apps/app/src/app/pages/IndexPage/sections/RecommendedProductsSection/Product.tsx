import {MdExpandLess, MdExpandMore} from "react-icons/all";
import {useCallback, useState} from "react";
import {PlatformProduct} from "../../../../api/models/PlatformProduct";
import {environment} from "../../../../../environments/environment";
import {formatPrice} from "../../../../modules/formatPrice";
import moment from "moment-timezone";


type Props = {
  product: PlatformProduct;
  loanInterestRate: number;
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
    <div className={"product flex flex-col mb-2"} onClick={toggleExpand}>
      <div className={"brand pt-1 pb-3 px-2 flex flex-row justify-between"}>
        <div className={"left flex flex-row items-center"}>
          <div className={"w-10 h-10 rounded-md mr-2"}>
            <img src={props.product.logoUrl}/>
          </div>
          <div className={""}>{props.product.productName}</div>
        </div>
        <div className={"right flex flex-row items-center"}>
          <div className={"font-medium"}>₹ 3,200</div>
          {expand ? (
            <MdExpandMore size={30} color={"#AAAAAA"}/>
          ) : (
            <MdExpandLess size={30} color={"#AAAAAA"}/>
          )}
        </div>
      </div>
      {expand && (
        <div className={"expandable-brand bg-[#F3F3F3] text-[#707070] p-3 flex flex-col"}>
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
