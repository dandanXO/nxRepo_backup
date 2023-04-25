import {MdPayment} from "@react-icons/all-files/md/MdPayment";
import {MdAccountBox} from "@react-icons/all-files/md/MdAccountBox";
import {RiMoneyDollarCircleFill} from "@react-icons/all-files/ri/RiMoneyDollarCircleFill";
import {useLocation, useNavigate} from "react-router";

import cx from "classnames";
import {PagePathEnum} from "../../pages/PagePathEnum";
import {getToken} from "../../../modules/location/getToken";
import {useEffect, useState} from "react";
import {DEFAULT_THEME} from "../../../../environments/theme";
import {applyTheme} from "../../../modules/theme/utils";

type Props = {
  hasOrder: boolean;
}
export const TabBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location);
  const isInPage = (pageName: PagePathEnum, exact?: boolean) => {
    if(pageName === PagePathEnum.IndexPage) {
      return location.pathname === pageName
    }
    return location.pathname.indexOf(pageName) > -1
  }

  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    applyTheme("india", "v57");
  }, [theme]);


  return (
    <div className={"h-16 bg-white border-t sticky bottom-0 flex flex-row"}>
      <div className={"flex-1 flex flex-col justify-center items-center"} onClick={() => {
        navigate(`${PagePathEnum.IndexPage}?token=${getToken()}`)
      }}>
        <RiMoneyDollarCircleFill color={isInPage(PagePathEnum.IndexPage) ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": isInPage(PagePathEnum.IndexPage),
          "text-gray-300": !isInPage(PagePathEnum.IndexPage),
        })}>Loan</div>
      </div>

      <div className={"flex-1 flex flex-col justify-center items-center relative"} onClick={() => {
        navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`)
      }}>
        <MdPayment color={isInPage(PagePathEnum.RepaymentPage) ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": isInPage(PagePathEnum.RepaymentPage),
          "text-gray-300": !isInPage(PagePathEnum.RepaymentPage),
        })}>Payment</div>
        {props.hasOrder && (
          <div className={"bg-[#F24822] w-2 h-2 rounded-full absolute right-1/3 top-2"}></div>
        )}
      </div>

      <div className={"flex-1 flex flex-col justify-center items-center"}  onClick={() => {
        navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`)
      }}>
        <MdAccountBox color={isInPage(PagePathEnum.PersonalInfoPage) ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": isInPage(PagePathEnum.PersonalInfoPage),
          "text-gray-300": !isInPage(PagePathEnum.PersonalInfoPage),
        })}>Account</div>
      </div>


      <div className={"flex-1 flex flex-col justify-center items-center"}  onClick={() => {
        if(theme === "base") {
          setTheme("dark")
        } else {
          setTheme("base")
        }
      }}>
        <MdAccountBox color={isInPage(PagePathEnum.PersonalInfoPage) ? "#F58B10" : "#D7D7D7"} size={20}/>
        <div className={cx({
          "text-orange-300": isInPage(PagePathEnum.PersonalInfoPage),
          "text-gray-300": !isInPage(PagePathEnum.PersonalInfoPage),
        })}>Change Theme</div>
      </div>

    </div>
  )
}
