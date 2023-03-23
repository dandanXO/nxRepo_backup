import {MdOutlineAccountCircle, MdPayment, RiMoneyDollarCircleFill} from "react-icons/all";

export const Navigation = () => {
  return (
    <div className={"h-16 flex flex-row border-t"}>
      <div className={"flex-1 flex flex-col justify-center items-center"}>
        <RiMoneyDollarCircleFill color={"#F58B10"} size={20}/>
        <div className={"text-orange-300"}>Loan</div>
      </div>
      <div className={"flex-1 flex flex-col justify-center items-center"}>
        <MdPayment color={"#D7D7D7"} size={20}/>
        <div className={"text-gray-300"}>Payment</div>
      </div>
      <div className={"flex-1 flex flex-col justify-center items-center"}>
        <MdOutlineAccountCircle color={"#D7D7D7"} size={20}/>
        <div className={"text-gray-300"}>Account</div>
      </div>
    </div>
  )
}
