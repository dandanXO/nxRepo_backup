import {MdOutlineAccountCircle, MdPayment, RiMoneyDollarCircleFill} from "react-icons/all";
import {useLocation, useNavigate} from "react-router-dom";
import cx from "classnames";

export const TabBar = () => {
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
      <div className={"flex-1 flex flex-col justify-center items-center"} onClick={() => {
        navigate("/loan-record")
      }}>
        <MdPayment color={location.pathname === "/loan-record" ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": location.pathname === "/loan-record",
          "text-gray-300": location.pathname !== "/loan-record",
        })}>Payment</div>
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
