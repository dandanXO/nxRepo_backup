import {MdOutlineAccountCircle, MdPayment, RiMoneyDollarCircleFill} from "react-icons/all";
import {useNavigate, useLocation} from "react-router";

import cx from "classnames";
import {PagePathEnum} from "../../pages";

type Props = {
  hasOrder: boolean;
}
export const TabBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location);
  return (
    <div className={"h-16 bg-white border-t sticky bottom-0 flex flex-row"}>
      <div className={"flex-1 flex flex-col justify-center items-center"} onClick={() => {
        navigate("/")
      }}>
        <RiMoneyDollarCircleFill color={location.pathname === "/" ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": location.pathname === "/",
          "text-gray-300": location.pathname !== "/",
        })}>Loan</div>
      </div>
      <div className={"flex-1 flex flex-col justify-center items-center relative"} onClick={() => {
        navigate(PagePathEnum.PaymentPage)
      }}>
        <MdPayment color={location.pathname === PagePathEnum.PaymentPage ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": location.pathname === PagePathEnum.PaymentPage,
          "text-gray-300": location.pathname !== PagePathEnum.PaymentPage,
        })}>Payment</div>
        {props.hasOrder && (
          <div className={"bg-[#F24822] w-2 h-2 rounded-full absolute right-1/3 top-2"}></div>
        )}
      </div>
      <div className={"flex-1 flex flex-col justify-center items-center"}  onClick={() => {
        navigate("/personal-info")
      }}>
        <MdOutlineAccountCircle color={location.pathname === "/personal-info" ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": location.pathname === "/personal-info",
          "text-gray-300": location.pathname !== "/personal-info",
        })}>Account</div>
      </div>
    </div>
  )
}
